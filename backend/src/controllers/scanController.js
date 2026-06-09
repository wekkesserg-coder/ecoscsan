const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Registrar un escaneo
exports.createScan = async (req, res) => {
  try {
    const { productId } = req.body;
    const userAgent = req.get('User-Agent');

    if (!productId) {
      return res.status(400).json({ error: 'productId es requerido' });
    }

    // Verificar que el producto existe
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const scan = await prisma.scan.create({
      data: {
        productId: parseInt(productId),
        userAgent
      }
    });

    res.status(201).json(scan);
  } catch (error) {
    res.status(500).json({ error: 'Error creating scan', details: error.message });
  }
};

// Obtener historial de escaneos
exports.getScans = async (req, res) => {
  try {
    const { productId, limit = 50, offset = 0 } = req.query;

    let where = {};
    if (productId) {
      where.productId = parseInt(productId);
    }

    const scans = await prisma.scan.findMany({
      where,
      include: {
        product: true
      },
      orderBy: {
        scannedAt: 'desc'
      },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    const total = await prisma.scan.count({ where });

    res.json({
      data: scans,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching scans', details: error.message });
  }
};

// Obtener estadísticas de escaneos
exports.getStats = async (req, res) => {
  try {
    const totalScans = await prisma.scan.count();
    const totalProducts = await prisma.product.count();
    const recyclableProducts = await prisma.product.count({
      where: { recyclable: true }
    });

    const mostScanned = await prisma.scan.groupBy({
      by: ['productId'],
      _count: true,
      orderBy: {
        _count: 'desc'
      },
      take: 5
    });

    res.json({
      totalScans,
      totalProducts,
      recyclableProducts,
      recycleRate: totalProducts > 0 ? ((recyclableProducts / totalProducts) * 100).toFixed(2) + '%' : '0%',
      mostScanned
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stats', details: error.message });
  }
};
