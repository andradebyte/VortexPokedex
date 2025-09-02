import { api } from "../api";
export default async function getAnimal(animalId, token) {
  try {
    const response = await fetch(`${api}/animals/${animalId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
