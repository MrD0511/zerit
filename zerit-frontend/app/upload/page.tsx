'use client'

import dynamic from "next/dynamic"
import { useFiles } from "../hooks/useFiles"
import PrintLayout from "../components/print/PrintLayout";
import FileUploadBox from "../components/print/FileUploadBox";
import FilesList from "../components/print/FilesList";
import EditConfig from "../components/print/FileEditor";
import { ChevronLeft } from "lucide-react";

const PDFViewer = dynamic(()=> import("../components/print/PdfViewer") , {
  ssr: false,
  loading: () => <p>Loading Viewer...</p>,
})

export default function UploadPage(){

    const {
        files,
        selectedFileId,
        setSelectedFileId,
        addFiles,
        removeFileItem,
        updateFile,
        applyToAll,
        setFiles,
    } = useFiles();


    const selectedFile = files.find((f) => f.id === selectedFileId);

    return (
        <PrintLayout 
            left={
                <div className="flex flex-col gap-3">

                    <FileUploadBox
                        addFiles={addFiles}
                    />

                    <FilesList 
                        files={files}
                        removeFileItem={removeFileItem}
                        setSelectedFileId={setSelectedFileId}
                        selectedFileId={selectedFileId}
                    />
                </div>
            }

            center={
                <PDFViewer fileItem={selectedFile || null} />
            }

            right={
                selectedFile ? (
                <EditConfig fileItem={selectedFile} updateFile={updateFile} />
                ) : (
                <></>
                )
            } 
            
            mobile={
                selectedFile ? 
                    <div className="w-full">
                        <div className="w-full px-3 py-6 flex gap-4">
                            <button onClick={() => setSelectedFileId("")}>
                                <ChevronLeft className="text-gray-900 dark:text-gray-100"/>
                            </button>

                            <div>
                                <span className="text-2xl text-gray-900 dark:text-gray-100 font-semibold">{selectedFile.file.name}</span>
                            </div>
                        </div>

                        <PDFViewer fileItem={selectedFile || null} />

                        <EditConfig fileItem={selectedFile} updateFile={updateFile} />
                    </div>
                : 
                    <div className="flex flex-col gap-3">
                        <FileUploadBox
                            addFiles={addFiles}
                        />

                        <FilesList 
                            files={files}
                            removeFileItem={removeFileItem}
                            setSelectedFileId={setSelectedFileId}
                        selectedFileId={selectedFileId}

                        />
                    </div>
                }
        />
    )
}