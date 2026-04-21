import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist";

// Ensure worker is configured for utility usage outside PdfViewer.
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

export async function getPdfPageCount(file: File): Promise<number> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  return pdf.numPages;
}