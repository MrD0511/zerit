
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"; // default to localhost if not set

export async function uploadFiles(formData: FormData) {

  const res = await fetch(`${backend_url}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");

  return res.json(); // maybe returns file URLs or ids
}