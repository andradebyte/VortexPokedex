import { api } from "../api.js";

export async function cadastrarUsuario(nome, email, senha) {
  try {
    const response = await fetch(`${api}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao cadastrar usuário");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
}
