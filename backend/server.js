import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import animalRoutes from "./routes/animalRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do Sistema Pókedex Unifor.");
});

app.use("/api/animals", animalRoutes);
app.use("/api/users", userRoutes);

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
