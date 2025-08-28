import { api } from "../api.js";

export async function logarUsuario(email, senha) {
  try {
    const response = await fetch(`${api}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao fazer login");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}

const data = await logarUsuario("joao@example.com", "senha123");
console.log(data);
