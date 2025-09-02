// src/routes/animalRoutes.js
import { Router } from "express";
import {
  getAnimalById,
  createAnimal,
} from "../controllers/animalsController.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/:id", auth, getAnimalById);
router.post("/", createAnimal);

export default router;
