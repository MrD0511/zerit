'use client'

import { FileItem } from "@/types/file"
import { useCallback, useState } from "react"

export function useFiles(){
    const [files, setFiles] = useState<FileItem[]>([])
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null)

    const updateFile = (id: string, updates: Partial<FileItem>) => {
        setFiles((prev) => 
                        prev.map((f) => (f.id === id ? {...f, ...updates} : f))
        )
    }

    const applyToAll = (updates: Partial<FileItem>) => {
        setFiles((prev) =>
        prev.map((f) => ({
            ...f,
            ...updates,
            configVisited: true,
        }))
        );
    };

    const addFiles: (incoming: FileList | null) => Promise<void> = useCallback(async (incoming: FileList | null) => {
        if(!incoming) return;
        const newFiles = Array.from(incoming).filter(
            (f) => f.type === "application/pdf" || f.name.endsWith(".pdf")
        ) 

        const { getPdfPageCount } = await import("@/lib/pdfUtils");

        const newFileItems: (FileItem | null)[] = await Promise.all(
        newFiles.map(async (file) => {
            try {
                const numPages = await getPdfPageCount(file);

                return {
                    id: crypto.randomUUID(),
                    file,
                    colorType: "black-white",
                    numOfCopies: 1,
                    numPages,
                    printType: "single-sided",
                    range: [1, numPages] as [number, number],
                    isConfigured: false
                };

            } catch (err) {
                console.log(err);
                console.error("Failed to read PDF:", file.name);
                return null;
            }
        })
        );

        const validItems = newFileItems.filter(
            (item): item is FileItem => item !== null
        );
        if (validItems.length === 0) return;
        setFiles((prev) => [...prev, ...validItems]);
        setSelectedFileId((prev) => prev ?? validItems[0].id);
    }, [])

    const removeFileItem = (id: string) => {
        setFiles((prev) => {
            const updated = prev.filter((fileItem) => fileItem.id !== id);
            setSelectedFileId((current) => {
                if (current !== id) return current;
                return updated.length > 0 ? updated[0].id : null;
            });
            return updated;
        })
    }


    return {
        files,
        selectedFileId,
        setSelectedFileId,
        addFiles,
        removeFileItem,
        updateFile,
        applyToAll,
        setFiles,
    };

}