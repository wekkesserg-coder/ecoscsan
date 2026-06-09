const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories', details: error.message });
  }
};

// Crear categoría (Admin)
exports.createCategory = async (req, res) => {
  try {
    const { name, description, color, recyclable, recyclingTips, commonProducts } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name es requerido' });
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
        color,
        recyclable,
        recyclingTips,
        commonProducts
      }
    });

    res.status(201).json(category);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Esta categoría ya existe' });
    }
    res.status(500).json({ error: 'Error creating category', details: error.message });
  }
};

// Actualizar categoría (Admin)
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, color, recyclable, recyclingTips, commonProducts } = req.body;

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        color,
        recyclable,
        recyclingTips,
        commonProducts
      }
    });

    res.json(category);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(500).json({ error: 'Error updating category', details: error.message });
  }
};

// Eliminar categoría (Admin)
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(500).json({ error: 'Error deleting category', details: error.message });
  }
};
