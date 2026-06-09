import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  getByBarcode: (barcode) => api.get(`/products/barcode/${barcode}`),
  search: (query) => api.get('/products/search', { params: { q: query } }),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

export const categoryService = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

export const materialService = {
  getAll: () => api.get('/materials'),
  getByCode: (code) => api.get(`/materials/${code}`),
  create: (data) => api.post('/materials', data),
  update: (id, data) => api.put(`/materials/${id}`, data),
  delete: (id) => api.delete(`/materials/${id}`),
};

export const scanService = {
  create: (productId) => api.post('/scans', { productId }),
  getHistory: (productId = null, limit = 50, offset = 0) => {
    return api.get('/scans', {
      params: { productId, limit, offset }
    });
  },
  getStats: () => api.get('/scans/stats'),
};

export default api;
