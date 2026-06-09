import React, { createContext, useState, useCallback } from 'react';
import { productService } from '../services/api';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByBarcode = useCallback(async (barcode) => {
    try {
      setLoading(true);
      const response = await productService.getByBarcode(barcode);
      setCurrentProduct(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(`Producto no encontrado: ${barcode}`);
      setCurrentProduct(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (productData) => {
    try {
      setLoading(true);
      const response = await productService.create(productData);
      setProducts([...products, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [products]);

  const updateProduct = useCallback(async (id, productData) => {
    try {
      setLoading(true);
      const response = await productService.update(id, productData);
      setProducts(products.map(p => p.id === id ? response.data : p));
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [products]);

  const deleteProduct = useCallback(async (id) => {
    try {
      setLoading(true);
      await productService.delete(id);
      setProducts(products.filter(p => p.id !== id));
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        currentProduct,
        fetchProducts,
        searchByBarcode,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
