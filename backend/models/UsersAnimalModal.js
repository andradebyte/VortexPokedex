// models/UserAnimal.js
import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const userAnimalSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: "User", required: true, index: true },
        animal: { type: Types.ObjectId, ref: "Animal", required: true, index: true },
    },
    { timestamps: true }
);

userAnimalSchema.index({ user: 1, animal: 1 }, { unique: true });

export default mongoose.model("UsersAnimal", userAnimalSchema);