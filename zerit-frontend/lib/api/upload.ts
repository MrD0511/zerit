
const backend_url = process.env.NEXT_APP_BACKEND_URL || 'http://localhost:8000';

export async function uploadFiles(formData: FormData) {

  const res = await fetch(`${backend_url}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");

  return res.json(); // maybe returns file URLs or ids
}