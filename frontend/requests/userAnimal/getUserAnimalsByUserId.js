import { api } from "../api.js";

export default async function getUserAnimalsByUserId(userId, token) {
  try {
    const response = await fetch(`${api}/usersanimals/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Erro desconhecido");
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar animais do usuário:", error);
    throw error;
  }
}

// const userId = "68b094425468f43d8a7d1a65";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGFlMTZlMWE5ODI2MGE2NTlmZGRlMWYiLCJlbWFpbCI6ImppZ29yOTQzM0BnbWFpbC5jb20iLCJub21lIjoiYW5kcmFkaW5obyIsImlhdCI6MTc1NjIzOTU4NSwiZXhwIjoxNzU2ODQ0Mzg1fQ.RqFPr_mOGpnKqDbg0NeQQEn1r4m9YXhZ-rAfOYCY5-w";

// const data = await getUserAnimalsByUserId(userId, token);
// console.log(data);
