const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scanController');

// Registrar escaneo
router.post('/', scanController.createScan);

// Obtener historial de escaneos
router.get('/', scanController.getScans);

// Obtener estadísticas
router.get('/stats', scanController.getStats);

module.exports = router;
