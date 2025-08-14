import jwt from "jsonwebtoken";
import User from "../models/UsersModel.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

// Gera um token JWT para o usuário

function signToken(user) {
  return jwt.sign(
    { sub: user._id, email: user.email, nome: user.nome },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

// Realiza o cadastro de um novo usuário
export async function signup(req, res) {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: "nome, email e senha são obrigatórios" });
    }

    const user = new User({ nome, email, senha });
    await user.save();

    const token = signToken(user);
    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: { id: user._id, nome: user.nome, email: user.email },
      token,
    });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ error: "Email já cadastrado" });
    }
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

// Realiza o login do usuário
export async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ error: "email e senha são obrigatórios" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

    const ok = await user.verifyPassword(senha);
    if (!ok) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = signToken(user);
    return res.json({
      message: "Login OK",
      user: { id: user._id, nome: user.nome, email: user.email },
      token,
    });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao autenticar" });
  }
}

// Retorna os dados de usuário autenticado
export async function me(req, res) {
  try {
    const user = await User.findById(req.user.sub).select(
      "_id nome email createdAt updatedAt"
    );
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar perfil" });
  }
}
