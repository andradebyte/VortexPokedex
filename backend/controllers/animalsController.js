// src/controllers/animalsController.js
import Animal from "../models/AnimalsModel.js";

const parseTypes = (val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    return val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

export const createAnimal = async (req, res) => {
  try {
    const { animal_id, nome, bg, type, types, description, habitat } = req.body;

    const payload = {
      animal_id,
      nome,
      bg,
      types: parseTypes(types ?? type),
      description,
      habitat,
    };

    if (
      !payload.animal_id ||
      !payload.nome ||
      !payload.bg ||
      !payload.description ||
      !payload.habitat
    ) {
      return res.status(400).json({ message: "Campos obrigatórios faltando" });
    }
    if (!payload.types.length) {
      return res
        .status(400)
        .json({ message: "Campo 'types' deve ter ao menos 1 item" });
    }

    const doc = await Animal.create(payload);
    return res.status(201).json(doc);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "animal_id já existe", keyValue: error.keyValue });
    }
    console.error("createAnimal error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findOne({ animal_id: req.params.id });
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    res.json(animal);
  } catch (error) {
    console.error("getAnimalById error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
