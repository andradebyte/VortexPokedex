import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    animal_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    nome: { type: String, required: true, trim: true },
    bg: { type: String, required: true, trim: true },
    types: {
      type: [String],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    description: { type: String, required: true, trim: true },
    habitat: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Animal", animalSchema);
