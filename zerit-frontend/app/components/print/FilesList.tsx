import { FileItem } from "@/types/file"
import { X } from "lucide-react"

export default function FilesList({files, removeFileItem, selectedFileId, setSelectedFileId} : 
    {
        files: FileItem[],
        removeFileItem: (id: string) => void,
        setSelectedFileId: React.Dispatch<React.SetStateAction<string | null>>,
        selectedFileId: string | null
    }
){

    return (
        <div className="w-full max-w-3xl">
            <div className="px-1 py-4">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Your uploaded files</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Select one file to edit print settings.</p>
            </div>
            <div className="py-2 flex flex-col gap-2">
                {files.map((fileItem, index) => (
                    <div className={`flex cursor-pointer justify-between rounded-2xl border px-4 py-3 transition-all ${
                        selectedFileId === fileItem.id
                            ? "border-cyan-400 bg-cyan-50/70 shadow-sm dark:bg-cyan-400/10"
                            : "border-gray-200/80 bg-white/80 hover:border-cyan-300 dark:border-white/10 dark:bg-white/[0.02]"
                    }`} key={`file_${index}`} onClick={()=> selectedFileId === fileItem.id ?   setSelectedFileId("") : setSelectedFileId(fileItem.id)}>
                        <div className="flex flex-col gap-1 text-gray-900 dark:text-gray-100">
                            <span className="max-w-[220px] truncate text-sm font-medium md:max-w-[180px]">{fileItem.file.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{Math.round(fileItem.file.size / 1024)} KB</span>
                        </div>

                        <button className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-rose-50 hover:text-rose-500 dark:text-gray-400 dark:hover:bg-rose-500/10" onClick={() => removeFileItem(fileItem.id)}>
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        
        </div>
    )
}