'use client'

import { ColorType, FileItem, PrintType } from "@/types/file";
import { ChevronRight, RotateCcw } from "lucide-react";
import { ChangeEvent} from "react";

export default function EditConfig({fileItem, updateFile}: 
    {
        fileItem: FileItem,
        updateFile: (id: string, updates: Partial<FileItem>) => void
    }
){

    const handleRangeChange = (e: ChangeEvent<HTMLInputElement>, rangeType: string) => {
        const value = Number(e.target.value);
        if (value < 1 || value > fileItem.numPages) return;
        if (rangeType === "start" && value > fileItem.range[1]) return;
        if (rangeType === "end" && value < fileItem.range[0]) return;

        const updatedFile: Partial<FileItem> =
        rangeType === "start"
            ? { range: [value, fileItem.range[1]] }
            : { range: [fileItem.range[0], value] };

        updateFile(fileItem.id, updatedFile)
    }

    const resetRange = () => {
        updateFile(fileItem.id, {range: [1, fileItem.numPages]})
    }

    const handleSelectChange = <K extends keyof FileItem>(key: K, value: FileItem[K]) => {
        const updatedFile: Partial<FileItem> = { [key]: value };
        updateFile(fileItem.id, updatedFile)
    };

    const totalPages = fileItem.range[1] - fileItem.range[0] + 1;

    const handleNumOfCopiesChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(parseInt(e.target.value) > 50 || parseInt(e.target.value) < 1) return;
        updateFile(fileItem.id, {numOfCopies: parseInt(e.target.value) })
    }

    return (
        <div className="w-full flex flex-col gap-3">

            <div className="bg-gray-100/60 dark:bg-slate-800/60 backdrop-blur border border-slate-400 dark:border-slate-700/50 rounded-xl p-4 space-y-3">
            <label htmlFor="numOfCopies" className="text-xs text-slate-700 dark:text-slate-500">Number of Copies</label>
                <input type="number" onChange={handleNumOfCopiesChange} id="numOfCopies"
                        value={fileItem.numOfCopies} 
                        className="bg-slate-900 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
                />
            </div>

            {/* Range */}
            <div className="bg-gray-100/60 dark:bg-slate-800/60 backdrop-blur border border-slate-400 dark:border-slate-700/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-widest">Page Range</span>
                    <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
                        {totalPages} page{totalPages !== 1 ? 's' : ''}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs text-slate-700 dark:text-slate-500">From</label>
                    <input
                    type="number"
                    value={fileItem.range[0]}
                    className="bg-slate-900 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
                    onChange={(e) => handleRangeChange(e, "start")}
                    />
                </div>
                <ChevronRight size={16} className="text-slate-600 mt-5 flex-shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs text-slate-700 dark:text-slate-500">To</label>
                    <input
                    type="number"
                    value={fileItem.range[1]}
                    className="bg-slate-900 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
                    onChange={(e) => handleRangeChange(e, "end")}
                    />
                </div>
                <button
                    className="mt-5 p-2 text-slate-700 dark:text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition flex-shrink-0"
                    title="Reset range"
                    onClick={() => resetRange()}
                >
                    <RotateCcw size={14} />
                </button>
                </div>

                <p className="text-xs text-slate-800 dark:text-slate-600">of {fileItem.numPages} total pages</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-xl p-4 space-y-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Print Options</span>

                <div className="grid grid-cols-2 gap-3">
                {/* Color Type */}
                <div className="space-y-1.5">
                    <label className="text-xs text-slate-500">Color</label>
                    <div className="flex flex-col gap-1.5">
                    {(["black-white", "color"] as ColorType[]).map((opt) => (
                        <button
                        key={opt}
                        onClick={() => handleSelectChange("colorType", opt)}
                        className={`text-xs px-3 py-2 rounded-lg border transition text-left ${
                            fileItem.colorType === opt
                            ? "bg-blue-500/20 border-blue-500 text-blue-300"
                            : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                        }`}
                        >
                        {opt === "black-white" ? "⚫ B&W" : "🎨 Color"}
                        </button>
                    ))}
                    </div>
                </div>

                {/* Print Type */}
                <div className="space-y-1.5">
                    <label className="text-xs text-slate-500">Sides</label>
                    <div className="flex flex-col gap-1.5">
                    {(["single-sided", "double-sided"] as PrintType[]).map((opt) => (
                        <button
                        key={opt}
                        onClick={() => handleSelectChange("printType", opt)}
                        className={`text-xs px-3 py-2 rounded-lg border transition text-left ${
                            fileItem.printType === opt
                            ? "bg-blue-500/20 border-blue-500 text-blue-300"
                            : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                        }`}
                        >
                        {opt === "single-sided" ? "📄 Single" : "📋 Double"}
                        </button>
                    ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}