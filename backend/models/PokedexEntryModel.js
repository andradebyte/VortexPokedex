import mongoose from "mongoose";

const pokedexEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
      index: true,
    },
    addedAt: { type: Date, default: Date.now },
    source: {
      type: String,
      enum: ["photo", "manual", "import"],
      default: "manual",
    },
  },
  { timestamps: true }
);

pokedexEntrySchema.index({ user: 1, animal: 1 }, { unique: true });

export default mongoose.model("PokedexEntry", pokedexEntrySchema);
