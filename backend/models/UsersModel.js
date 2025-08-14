import mongoose from "mongoose";
import { verifyPassword, hashPassword } from "../utils/bcrypt.js";

const userSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    senha: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  this.senha = await hashPassword(this.senha);
  next();
});

userSchema.methods.verifyPassword = function (senhaDigitada) {
  return verifyPassword(senhaDigitada, this.senha);
};

export default mongoose.model("User", userSchema);
