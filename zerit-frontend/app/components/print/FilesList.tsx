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
            <div className="px-3 py-6">
                <p className="text-gray-900 dark:text-gray-200">Select files and choose printing options.</p>
            </div>
            <div className="py-2 flex flex-col gap-2">
                {files.map((fileItem, index) => (
                    <div className={`rounded-lg px-4 py-2 flex justify-between dark:bg-gray-900 ${selectedFileId === fileItem.id ? "border-2 border-blue-500" : ""} `} key={`file_${index}`} onClick={()=> selectedFileId === fileItem.id ?   setSelectedFileId("") : setSelectedFileId(fileItem.id)}>
                        <div className="flex flex-col gap-1 text-gray-900 dark:text-gray-100">
                            <span className="text-base">{fileItem.file.name}</span>
                            <span className="text-sm">{fileItem.file.size}</span>
                        </div>

                        <button onClick={() => removeFileItem(fileItem.id)}>
                            <X />
                        </button>
                    </div>
                ))}
            </div>
        
        </div>
    )
}