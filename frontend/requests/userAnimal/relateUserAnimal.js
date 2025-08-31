import { api } from "../api.js";

export async function relateUserAnimal(user, animalid, token) {
  try {
    const response = await fetch(`${api}/usersanimals/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: user,
        animalid: animalid,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Erro desconhecido");
    }

    return data;
  } catch (error) {
    console.error("Erro na requisição:", error.message);
    throw error;
  }
}

// const userId = "68b094425468f43d8a7d1a65";
// const animalId = "peacock";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGFlMTZlMWE5ODI2MGE2NTlmZGRlMWYiLCJlbWFpbCI6ImppZ29yOTQzM0BnbWFpbC5jb20iLCJub21lIjoiYW5kcmFkaW5obyIsImlhdCI6MTc1NjIzOTU4NSwiZXhwIjoxNzU2ODQ0Mzg1fQ.RqFPr_mOGpnKqDbg0NeQQEn1r4m9YXhZ-rAfOYCY5-w";

// relateUserAnimal(userId, animalId, token)
//   .then((data) => {
//     console.log("Relacionamento criado/sucesso:", data);
//   })
//   .catch((error) => {
//     console.error("Erro ao relacionar:", error.message);
//   });
