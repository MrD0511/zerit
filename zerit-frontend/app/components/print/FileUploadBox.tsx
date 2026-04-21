'use client'

import { FileItem } from "@/types/file";
import { useState } from "react";

export default function FileUploadBox({ addFiles }: 
    {
        addFiles: (incoming: FileList | null) => Promise<void>
    }
){
    const [isDragging, setIsDragging] = useState(false)

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        addFiles(e.dataTransfer.files)
        setIsDragging(false)
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true)
    };

    const handleDragLeave = () => setIsDragging(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        addFiles(e.target.files)
        e.target.value = ""
    }


    return (
        <label htmlFor="file-upload" className={`flex flex-col items-center justify-center w-full h-24 border-3 border-blue-500 border-dashed rounded-lg cursor-pointer ${isDragging ? "bg-blue-50" : ""}`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}>
                <p className="text-sm text-gray-700 dark:text-gray-100">Drag & drop files or click to upload</p>
            </div>
            <input type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    multiple
                    accept="application/pdf"
                    id="file-upload"
            />
        </label>
    )
}