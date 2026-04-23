'use client'

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
        <label
            htmlFor="file-upload"
            className={`group flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 transition-all ${
                isDragging
                    ? "border-cyan-400 bg-cyan-50/80 dark:bg-cyan-400/10"
                    : "border-cyan-400/50 bg-white/60 hover:border-cyan-400 hover:bg-cyan-50/60 dark:bg-white/[0.02] dark:hover:bg-cyan-400/5"
            }`}
        >
            <div className="flex flex-col items-center justify-center pt-5 pb-6"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Drag and drop PDFs here</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">or click to upload from your device</p>
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