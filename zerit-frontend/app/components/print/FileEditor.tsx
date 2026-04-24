'use client'

import { ColorType, FileItem, PrintType } from "@/types/file";
import { ChevronRight, Minus, Plus, RotateCcw } from "lucide-react";

export default function EditConfig({
  fileItem,
  updateFile,
}: {
  fileItem: FileItem;
  updateFile: (id: string, updates: Partial<FileItem>) => void;
}) {

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  const updateRange = (type: "start" | "end", delta: number) => {
    const [start, end] = fileItem.range;
    if (type === "start") {
      const next = clamp(start + delta, 1, end);
      updateFile(fileItem.id, { range: [next, end] });
    } else {
      const next = clamp(end + delta, start, fileItem.numPages);
      updateFile(fileItem.id, { range: [start, next] });
    }
  };

  const updateCopies = (delta: number) => {
    const next = clamp(fileItem.numOfCopies + delta, 1, 50);
    updateFile(fileItem.id, { numOfCopies: next });
  };

  const resetRange = () =>
    updateFile(fileItem.id, { range: [1, fileItem.numPages] });

  const handleSelectChange = <K extends keyof FileItem>(
    key: K,
    value: FileItem[K]
  ) => updateFile(fileItem.id, { [key]: value });

  const totalPages = fileItem.range[1] - fileItem.range[0] + 1;

  return (
    <div className="w-full flex flex-col gap-3">

      {/* Copies */}
      <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.02]">
        <label className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">
          Number of Copies
        </label>
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => updateCopies(-1)}
            disabled={fileItem.numOfCopies <= 1}
            className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center text-slate-600 transition hover:border-cyan-400 hover:text-cyan-500 disabled:opacity-30 dark:border-white/10 dark:text-slate-400 active:scale-95"
          >
            <Minus size={16} />
          </button>
          <span className="flex-1 text-center text-lg font-semibold text-slate-700 dark:text-slate-200">
            {fileItem.numOfCopies}
          </span>
          <button
            onClick={() => updateCopies(1)}
            disabled={fileItem.numOfCopies >= 50}
            className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center text-slate-600 transition hover:border-cyan-400 hover:text-cyan-500 disabled:opacity-30 dark:border-white/10 dark:text-slate-400 active:scale-95"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Range */}
      <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-400">
            Page Range
          </span>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-600 dark:text-cyan-300">
              {totalPages} page{totalPages !== 1 ? "s" : ""}
            </span>
            <button
              onClick={resetRange}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-cyan-400/10 hover:text-cyan-500 dark:text-slate-400"
              title="Reset range"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          {/* Start */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs text-slate-500 dark:text-slate-400">From</label>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => updateRange("start", -1)}
                disabled={fileItem.range[0] <= 1}
                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-slate-500 transition hover:border-cyan-400 hover:text-cyan-500 disabled:opacity-30 dark:border-white/10 active:scale-95"
              >
                <Minus size={13} />
              </button>
              <span className="flex-1 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
                {fileItem.range[0]}
              </span>
              <button
                onClick={() => updateRange("start", 1)}
                disabled={fileItem.range[0] >= fileItem.range[1]}
                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-slate-500 transition hover:border-cyan-400 hover:text-cyan-500 disabled:opacity-30 dark:border-white/10 active:scale-95"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>

          <ChevronRight size={16} className="text-slate-400 mt-4 flex-shrink-0" />

          {/* End */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs text-slate-500 dark:text-slate-400">To</label>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => updateRange("end", -1)}
                disabled={fileItem.range[1] <= fileItem.range[0]}
                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-slate-500 transition hover:border-cyan-400 hover:text-cyan-500 disabled:opacity-30 dark:border-white/10 active:scale-95"
              >
                <Minus size={13} />
              </button>
              <span className="flex-1 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
                {fileItem.range[1]}
              </span>
              <button
                onClick={() => updateRange("end", 1)}
                disabled={fileItem.range[1] >= fileItem.numPages}
                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-slate-500 transition hover:border-cyan-400 hover:text-cyan-500 disabled:opacity-30 dark:border-white/10 active:scale-95"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-2 text-xs text-slate-400 dark:text-slate-600">
          of {fileItem.numPages} total pages
        </p>
      </div>

      {/* Print Options */}
      <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.02]">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-400">
          Print Options
        </span>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-500 dark:text-slate-400">Color</label>
            <div className="flex flex-col gap-1.5">
              {(["black-white", "color"] as ColorType[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectChange("colorType", opt)}
                  className={`text-xs px-3 py-2 rounded-lg border transition text-left active:scale-95 ${
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

          <div className="space-y-1.5">
            <label className="text-xs text-slate-500 dark:text-slate-400">Sides</label>
            <div className="flex flex-col gap-1.5">
              {(["single-sided", "double-sided"] as PrintType[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectChange("printType", opt)}
                  className={`text-xs px-3 py-2 rounded-lg border transition text-left active:scale-95 ${
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
  );
}