import { api } from "../api.js";

export async function relateUserAnimal(userID, token, animalId) {
  try {
    const response = await fetch(`${api}/usersAnimal/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user: userID, animalId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao reconhecer animal");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao reconhecer animal:", error);
    throw error;
  }
}

const data = await relateUserAnimal(
  "68b094425468f43d8a7d1a65",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGIwOTQ0MjU0NjhmNDNkOGE3ZDFhNjUiLCJlbWFpbCI6ImpvYW9AZXhhbXBsZS5jb20iLCJub21lIjoiSm_Do28iLCJpYXQiOjE3NTY0MDM5MDYsImV4cCI6MTc1NzAwODcwNn0.0SdDZgLmRjX9KkQ2a9BH6ppYu5UCw9fiKXre_tvHYj8",
  "cat"
);

console.log(data);
