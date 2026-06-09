const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

// Obtener todos los materiales
router.get('/', materialController.getAllMaterials);

// Obtener material por código
router.get('/:code', materialController.getMaterialByCode);

// Crear material
router.post('/', materialController.createMaterial);

// Actualizar material
router.put('/:id', materialController.updateMaterial);

// Eliminar material
router.delete('/:id', materialController.deleteMaterial);

module.exports = router;
