import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data";

import { connectDB } from "./config/db.js";
import animalRoutes from "./routes/animalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import usersAnimalRoutes from "./routes/usersAnimalRoutes.js";

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do Sistema Pókedex Unifor.");
});

app.use("/api/animals", animalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/usersanimals", usersAnimalRoutes);

app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const form = new FormData();
  form.append("file", req.file.buffer, req.file.originalname);

  try {
    const response = await fetch("http://microsservico:8000/upload-image", {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });
    const data = await response.json();

    res.status(200).json({
      message: "Upload encaminhado para FastAPI",
      fastapi_response: data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Erro ao enviar para FastAPI" });
  }
});

app.use((req, res) => {
  res.status(404).json({
    erro: "Not Found",
    caminho: req.originalUrl,
  });
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running: ${process.env.PORT}`);
});
