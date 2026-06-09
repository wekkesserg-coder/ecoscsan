const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Buscar productos
router.get('/search', productController.searchProducts);

// Obtener por ID
router.get('/:id', productController.getProductById);

// Obtener por barcode (escaneo)
router.get('/barcode/:barcode', productController.getProductByBarcode);

// Crear producto (Admin)
router.post('/', productController.createProduct);

// Actualizar producto (Admin)
router.put('/:id', productController.updateProduct);

// Eliminar producto (Admin)
router.delete('/:id', productController.deleteProduct);

module.exports = router;
