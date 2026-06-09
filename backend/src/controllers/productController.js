const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        _count: {
          select: { scans: true }
        }
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products', details: error.message });
  }
};

// Obtener producto por barcode (escaneo)
exports.getProductByBarcode = async (req, res) => {
  try {
    const { barcode } = req.params;
    const product = await prisma.product.findUnique({
      where: { barcode },
      include: {
        _count: {
          select: { scans: true }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ 
        error: 'Producto no encontrado',
        barcode 
      });
    }

    // Si hay material, obtener información del material reciclado
    let materialInfo = null;
    if (product.material) {
      materialInfo = await prisma.recycledMaterial.findUnique({
        where: { material: product.material.toUpperCase() }
      });
    }

    res.json({
      ...product,
      materialInfo
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product', details: error.message });
  }
};

// Obtener producto por ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: { scans: true }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Si hay material, obtener información del material reciclado
    let materialInfo = null;
    if (product.material) {
      materialInfo = await prisma.recycledMaterial.findUnique({
        where: { material: product.material.toUpperCase() }
      });
    }

    res.json({
      ...product,
      materialInfo
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product', details: error.message });
  }
};

// Crear nuevo producto (Admin)
exports.createProduct = async (req, res) => {
  try {
    const { barcode, name, description, category, recyclable, recyclingInstructions, material, recycledInto, imageUrl } = req.body;

    // Validación básica
    if (!barcode || !name) {
      return res.status(400).json({ error: 'Barcode y name son requeridos' });
    }

    const product = await prisma.product.create({
      data: {
        barcode,
        name,
        description,
        category,
        recyclable,
        recyclingInstructions,
        material,
        recycledInto,
        imageUrl
      }
    });

    res.status(201).json(product);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Este barcode ya existe' });
    }
    res.status(500).json({ error: 'Error creating product', details: error.message });
  }
};

// Actualizar producto (Admin)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { barcode, name, description, category, recyclable, recyclingInstructions, material, recycledInto, imageUrl } = req.body;

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        barcode,
        name,
        description,
        category,
        recyclable,
        recyclingInstructions,
        material,
        recycledInto,
        imageUrl
      }
    });

    res.json(product);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(500).json({ error: 'Error updating product', details: error.message });
  }
};

// Eliminar producto (Admin)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(500).json({ error: 'Error deleting product', details: error.message });
  }
};

// Buscar productos
exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" es requerido' });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { barcode: { contains: q, mode: 'insensitive' } }
        ]
      },
      include: {
        _count: {
          select: { scans: true }
        }
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error searching products', details: error.message });
  }
};
