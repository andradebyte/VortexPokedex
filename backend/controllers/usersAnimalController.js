import UsersAnimalModal from "../models/UsersAnimalModal.js";
import Animal from "../models/AnimalsModel.js";

export const createUserAnimal = async (req, res) => {
  try {
    const { user, animalid } = req.body;

    const animal = await Animal.findOne({ animal_id: animalid });
    if (!animal) {
      return res.status(404).json({ message: "Animal não encontrado" });
    }

    const exists = await UsersAnimalModal.findOne({ user, animal: animal._id });
    if (exists) {
      return res.status(409).json({ message: "Relação já existe" });
    }
    const userAnimal = new UsersAnimalModal({ user, animal: animal._id });
    await userAnimal.save();
    await userAnimal.populate("animal");
    res.status(201).json(userAnimal);
  } catch (error) {
    console.error("createUserAnimal error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserAnimalsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const userAnimals = await UsersAnimalModal.find({
      user: userId,
    }).populate("animal");
    res.json(userAnimals);
  } catch (error) {
    console.error("getUserAnimalsByUserId error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
