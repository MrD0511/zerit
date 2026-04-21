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
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const start = fileItem?.range[0] ?? 1;
  const end = fileItem?.range[1] ?? 1;
  const totalPages = fileItem ? end - start + 1 : 0;

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });
  
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
  
    return () => resizeObserver.disconnect();
  }, []);

  const virtualizer = useVirtualizer({
    count: totalPages,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 700,
    overscan: 3,
  });

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
        <div>
        <Document
          file={fileItem.file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const pageNum = start + virtualRow.index;

              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <Page
                    pageNumber={pageNum}
                    width={containerWidth}   // fit to parent
                    scale={scale}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="mb-4 overflow-hidden rounded-xl border border-gray-200/70 bg-white shadow-sm dark:border-white/10"
                  />
                </div>
              );
            })}
          </div>
        </Document>

        <div className="flex gap-2 mb-2">
            <button onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}>
            -
            </button>
            <span>{Math.round(scale * 100)}%</span>
            <button onClick={() => setScale((s) => Math.min(3, s + 0.2))}>
            +
            </button>
            </div>
        </div>
      )}
    </div>
  );
}