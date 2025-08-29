import { api } from "../api.js";

export async function meUsuario(token) {
  try {
    const response = await fetch(`${api}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao buscar dados do usuário");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
}

const data = await meUsuario(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGIwOTQ0MjU0NjhmNDNkOGE3ZDFhNjUiLCJlbWFpbCI6ImpvYW9AZXhhbXBsZS5jb20iLCJub21lIjoiSm_Do28iLCJpYXQiOjE3NTY0MDMxOTksImV4cCI6MTc1NzAwNzk5OX0.QMNTPgA9uq4K4UZTBRYA-8iaVkZ-0F8J1lKpvAE4_R0"
);
console.log(data);
