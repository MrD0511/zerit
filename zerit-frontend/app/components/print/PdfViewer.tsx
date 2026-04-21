'use client'

import { useState } from "react";
import {Document,  Page, pdfjs} from "react-pdf"
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { FileItem } from "@/types/file";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({fileItem}: {fileItem: FileItem | null}){

    const [numPages, setNumPages] = useState<number>(0);

    return (
        <div className="h-100 overflow-y-scroll p-2">
            <div className="h-full ">
                {fileItem ? 
                <Document 
                    file={fileItem.file}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                >
                    {Array.from(
                        { length: fileItem.range[1] - fileItem.range[0] + 1 },
                        (_, i) => fileItem.range[0] + i
                    ).map((pageNum) => (
                        <Page
                        key={`page_${pageNum}`}
                        pageNumber={pageNum}
                        className="mb-4"
                        />
                    ))}
                </Document> 
                    : 
                    <div className="flex justify-center items-center h-full">
                        <p>No File Selected</p>
                    </div>
                }
            </div>
        </div>

    )
}