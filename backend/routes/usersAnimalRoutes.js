import { Router } from "express";
import { createUserAnimal, getUserAnimalsByUserId } from "../controllers/usersAnimalController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/create", auth, createUserAnimal);
router.get("/:id", auth, getUserAnimalsByUserId);

export default router;