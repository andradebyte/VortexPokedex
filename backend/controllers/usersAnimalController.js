import UsersAnimalModal from "../models/UsersAnimalModal.js";

export const createUserAnimal = async (req, res) => {
    try {
        const { user, animal } = req.body;

        const userAnimal = new UsersAnimalModal({ user, animal });
        await userAnimal.save();

        res.status(201).json(userAnimal);
    } catch (error) {
        console.error("createUserAnimal error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//Todos os animais por usuário
export const getUserAnimalsByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const userAnimals = await UsersAnimalModal.find({ user: userId }).populate("animal");
        res.json(userAnimals);
    } catch (error) {
        console.error("getUserAnimalsByUserId error:", error);
        res.status(500).json({ message: "Server error" });
    }
};