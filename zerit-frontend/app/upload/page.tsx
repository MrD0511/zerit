'use client'

import dynamic from "next/dynamic"
import { useFiles } from "../hooks/useFiles"
import PrintLayout from "../components/print/PrintLayout";
import FileUploadBox from "../components/print/FileUploadBox";
import FilesList from "../components/print/FilesList";
import EditConfig from "../components/print/FileEditor";
import { ChevronLeft } from "lucide-react";
import SubmitDialog from "../components/print/SubmitDialog";
import { useState } from "react";
import { uploadFiles } from "@/lib/api/upload";
import ConfirmationContent from "../components/print/ConfirmationContent";

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
        resetFields
    } = useFiles();


    const selectedFile = files.find((f) => f.id === selectedFileId);
    const totalPages = files.reduce((sum, file) => sum + file.numPages, 0);
    const hasFiles = files.length > 0;
    const selectedFileName = selectedFile?.file.name ?? "No file selected";
    const [openSubmitDialog, setOpenSubmitDialog] = useState<Boolean>(false);
    const [token, setToken] = useState<string>("")
    const [isUploadSuccess, setIsUploadSuccess] = useState<boolean>(false)

    const toggleSubmitDialog = () => {
        setOpenSubmitDialog(!openSubmitDialog)
    }

    const handleFileSubmit = async (name: string, email: string) => {
        try{
            const formData = new FormData();

            files.forEach((fileItem) => {
                const { file, ...meta} = fileItem;
                formData.append(`file_${meta.id}`, file);
                formData.append(`meta_${meta.id}`, JSON.stringify(meta))
            })

            formData.append("name", name);
            formData.append("email", email)

            const response = await uploadFiles(formData);
            
            if(response.success){
                setToken(response.token);
                setIsUploadSuccess(true);
                setOpenSubmitDialog(false);
            }

            return response;
        }catch(error){
            console.log(error)
        }
    }

    const resetPage = () => {
        setToken("")
        setOpenSubmitDialog(false)
        setIsUploadSuccess(false)
        resetFields()
    }

    return (
        <PrintLayout 
            left={
                <div className="flex flex-col gap-3">
                    <div className="rounded-2xl border border-gray-200/70 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/[0.02]">
                        <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">Job summary</p>
                        <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-gray-900 dark:text-gray-100">{files.length} file{files.length === 1 ? "" : "s"}</span>
                            <span className="text-cyan-600 dark:text-cyan-300">{totalPages} total pages</span>
                        </div>
                    </div>

                    <FileUploadBox
                        addFiles={addFiles}
                    />

                    <div className="h-80 overflow-y-auto">
                        <FilesList 
                            files={files}
                            removeFileItem={removeFileItem}
                            setSelectedFileId={setSelectedFileId}
                            selectedFileId={selectedFileId}
                        />
                    </div>
                </div>
            }

            center={
                hasFiles ? (
                    <PDFViewer fileItem={selectedFile || null} />
                ) : (
                    <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-gray-300/80 bg-white/70 p-6 text-center dark:border-white/10 dark:bg-white/[0.02]">
                        <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
                            Upload at least one PDF to see a live preview and configure print settings.
                        </p>
                    </div>
                )
            }

            right={
                selectedFile ? (
                <EditConfig fileItem={selectedFile} updateFile={updateFile} />
                ) : (
                <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-gray-300/80 bg-white/70 p-6 text-center dark:border-white/10 dark:bg-white/[0.02]">
                    <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
                        Select a file from the list to edit page range, copies, color mode, and print sides.
                    </p>
                </div>
                )
            } 
            
            mobile={
                selectedFile ? 
                    <div className="w-full">
                        <div className="mb-3 flex w-full items-center gap-4 rounded-2xl border border-gray-200/70 bg-white/80 px-3 py-4 dark:border-white/10 dark:bg-white/[0.02]">
                            <button className="rounded-lg p-1 hover:bg-cyan-400/10" onClick={() => setSelectedFileId("")}>
                                <ChevronLeft className="text-gray-900 dark:text-gray-100"/>
                            </button>

                            <div>
                                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{selectedFileName}</span>
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
            
            submitDialog={
                openSubmitDialog ? 
                    <SubmitDialog toggleSubmitDialog={toggleSubmitDialog}
                                  totalFiles={files.length}
                                  totalPages={totalPages} 
                                  handleSubmit={handleFileSubmit}
                    />
                : <></>
            }

            confirmationContent={
                <ConfirmationContent token={token} resetPage={resetPage}/>
            }

            toggleSubmitDialog={toggleSubmitDialog}
            isUploadSuccess={isUploadSuccess}
        />
    )
}