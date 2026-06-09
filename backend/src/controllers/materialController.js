const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los materiales reciclables
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await prisma.recycledMaterial.findMany();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching materials', details: error.message });
  }
};

// Obtener material por código (ej: PET, HDPE)
exports.getMaterialByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const material = await prisma.recycledMaterial.findUnique({
      where: { material: code.toUpperCase() }
    });

    if (!material) {
      return res.status(404).json({ error: 'Material no encontrado' });
    }

    res.json(material);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching material', details: error.message });
  }
};

// Crear material reciclable (Admin)
exports.createMaterial = async (req, res) => {
  try {
    const {
      material,
      name,
      description,
      recycledIntoProducts,
      percentageRecycled,
      commonUses,
      environmentalImpact,
      color
    } = req.body;

    if (!material || !name) {
      return res.status(400).json({ error: 'Material y name son requeridos' });
    }

    const newMaterial = await prisma.recycledMaterial.create({
      data: {
        material: material.toUpperCase(),
        name,
        description,
        recycledIntoProducts: recycledIntoProducts ? JSON.stringify(recycledIntoProducts) : null,
        percentageRecycled,
        commonUses,
        environmentalImpact,
        color
      }
    });

    res.status(201).json(newMaterial);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Este material ya existe' });
    }
    res.status(500).json({ error: 'Error creating material', details: error.message });
  }
};

// Actualizar material (Admin)
exports.updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      material,
      name,
      description,
      recycledIntoProducts,
      percentageRecycled,
      commonUses,
      environmentalImpact,
      color
    } = req.body;

    const updatedMaterial = await prisma.recycledMaterial.update({
      where: { id: parseInt(id) },
      data: {
        material: material ? material.toUpperCase() : undefined,
        name,
        description,
        recycledIntoProducts: recycledIntoProducts ? JSON.stringify(recycledIntoProducts) : undefined,
        percentageRecycled,
        commonUses,
        environmentalImpact,
        color
      }
    });

    res.json(updatedMaterial);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Material no encontrado' });
    }
    res.status(500).json({ error: 'Error updating material', details: error.message });
  }
};

// Eliminar material (Admin)
exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.recycledMaterial.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Material eliminado exitosamente' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Material no encontrado' });
    }
    res.status(500).json({ error: 'Error deleting material', details: error.message });
  }
};
