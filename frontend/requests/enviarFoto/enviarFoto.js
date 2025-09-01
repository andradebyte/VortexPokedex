import { api } from "../api";

export default async function enviarFoto(image, token) {
  const { uri, type, name } = image;
  const formData = new FormData();
  formData.append("file", { uri, type, name });

  const res = await fetch(`${api}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Falha no upload");
  }
  return res.json();
}
