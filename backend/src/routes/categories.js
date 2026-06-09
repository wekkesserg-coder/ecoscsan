const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Obtener todas las categorías
router.get('/', categoryController.getAllCategories);

// Crear categoría
router.post('/', categoryController.createCategory);

// Actualizar categoría
router.put('/:id', categoryController.updateCategory);

// Eliminar categoría
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
