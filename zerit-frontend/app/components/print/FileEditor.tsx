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

            <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.02]">
            <label htmlFor="numOfCopies" className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">Number of Copies</label>
                <input type="number" onChange={handleNumOfCopiesChange} id="numOfCopies"
                        value={fileItem.numOfCopies} 
                        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-slate-700 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-[#151924] dark:text-slate-200"
                />
            </div>

            {/* Range */}
            <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.02]">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-400">Page Range</span>
                    <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-600 dark:text-cyan-300">
                        {totalPages} page{totalPages !== 1 ? 's' : ''}
                    </span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs text-slate-700 dark:text-slate-500">From</label>
                    <input
                    type="number"
                    value={fileItem.range[0]}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-slate-700 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-[#151924] dark:text-slate-200"
                    onChange={(e) => handleRangeChange(e, "start")}
                    />
                </div>
                <ChevronRight size={16} className="text-slate-600 mt-5 flex-shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs text-slate-700 dark:text-slate-500">To</label>
                    <input
                    type="number"
                    value={fileItem.range[1]}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-slate-700 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-[#151924] dark:text-slate-200"
                    onChange={(e) => handleRangeChange(e, "end")}
                    />
                </div>
                <button
                    className="mt-5 flex-shrink-0 rounded-lg p-2 text-slate-700 transition hover:bg-cyan-400/10 hover:text-cyan-500 dark:text-slate-400"
                    title="Reset range"
                    onClick={() => resetRange()}
                >
                    <RotateCcw size={14} />
                </button>
                </div>

                <p className="text-xs text-slate-800 dark:text-slate-600">of {fileItem.numPages} total pages</p>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.02]">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-400">Print Options</span>

                <div className="mt-3 grid grid-cols-2 gap-3">
                {/* Color Type */}
                <div className="space-y-1.5">
                    <label className="text-xs text-slate-500 dark:text-slate-400">Color</label>
                    <div className="flex flex-col gap-1.5">
                    {(["black-white", "color"] as ColorType[]).map((opt) => (
                        <button
                        key={opt}
                        onClick={() => handleSelectChange("colorType", opt)}
                        className={`text-xs px-3 py-2 rounded-lg border transition text-left ${
                            fileItem.colorType === opt
                            ? "border-cyan-400 bg-cyan-400/15 text-cyan-700 dark:text-cyan-300"
                            : "border-gray-300 bg-white text-slate-600 hover:border-cyan-300 dark:border-white/10 dark:bg-[#151924] dark:text-slate-400"
                        }`}
                        >
                        {opt === "black-white" ? "⚫ B&W" : "🎨 Color"}
                        </button>
                    ))}
                    </div>
                </div>

                {/* Print Type */}
                <div className="space-y-1.5">
                    <label className="text-xs text-slate-500 dark:text-slate-400">Sides</label>
                    <div className="flex flex-col gap-1.5">
                    {(["single-sided", "double-sided"] as PrintType[]).map((opt) => (
                        <button
                        key={opt}
                        onClick={() => handleSelectChange("printType", opt)}
                        className={`text-xs px-3 py-2 rounded-lg border transition text-left ${
                            fileItem.printType === opt
                            ? "border-cyan-400 bg-cyan-400/15 text-cyan-700 dark:text-cyan-300"
                            : "border-gray-300 bg-white text-slate-600 hover:border-cyan-300 dark:border-white/10 dark:bg-[#151924] dark:text-slate-400"
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