'use client'

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useVirtualizer } from "@tanstack/react-virtual";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { FileItem } from "@/types/file";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ fileItem }: { fileItem: FileItem | null }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const start = fileItem?.range[0] ?? 1;
  const end = fileItem?.range[1] ?? 1;
  const safeStart = Math.max(1, start);
  const safeEnd = numPages ? Math.min(end, numPages) : start;
  const totalPages = numPages ? safeEnd - safeStart + 1 : 0;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(() => {
      setContainerWidth(el.clientWidth);
    });

    resizeObserver.observe(el);
    setContainerWidth(el.clientWidth);

    return () => resizeObserver.disconnect();
  }, []);

  const virtualizer = useVirtualizer({
    count: totalPages,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 700,
    overscan: 3,
  });

  useEffect(() => {
    setNumPages(0);
  }, [fileItem?.file]);

  return (
    <div
      ref={parentRef}
      className="max-h-[75vh] overflow-y-auto rounded-2xl border border-gray-200/70 bg-white/70 p-3 dark:border-white/10 dark:bg-white/[0.02]"
    >
      {!fileItem ? (
        <div className="flex justify-center items-center h-full">
          <p className="py-16 text-sm text-gray-500 dark:text-gray-400">
            No file selected yet.
          </p>
        </div>
      ) : (
        <div className={`${fileItem.colorType === "color" ? "" : "grayscale"}`}>
          <Document
            key={fileItem.id}
            file={fileItem.file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                position: "relative",
              }}
            >
              {numPages > 0 &&
                virtualizer.getVirtualItems().map((virtualRow) => {
                  const pageNum = safeStart + virtualRow.index;

                  if (pageNum > numPages) return null; // extra safety

                  return (
                    <div
                      key={virtualRow.key}
                      style={{ transform: `translateY(${virtualRow.start}px)` }}
                      className={`absolute top-0 left-0 w-full
                        
                      `}
                    >
                      <Page
                        pageNumber={pageNum}
                        width={containerWidth}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="mb-4 overflow-hidden rounded-xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10"
                      />
                    </div>
                  );
                })}
            </div>
          </Document>
        </div>
      )}
    </div>
  );
}