'use client'

import { fetchOrder } from "@/lib/api/apis";
import { useState } from "react";

type FileItem = {
  id: number;
  filename: string;
  orderId: number;
  printType: "single-sided" | "double-sided";
  colorType: "black-white" | "color";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  url: string;
};

type Order = {
  id: number;
  name: string;
  email: string;
  token: string;
  isPrinted: boolean;
  createdAt: string;
  updatedAt: string;
  files: FileItem[];
};

type ApiResponse = {
  success: boolean;
  message: string;
  order: Order;
};

export default function Vendor() {
  const [token, setToken] = useState<string>("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [printedFiles, setPrintedFiles] = useState<Set<number>>(new Set());

  const GetOrder = async () => {
    setLoading(true);
    setError(null);
    setOrder(null);
    setPrintedFiles(new Set());

    if(token.length != 6){
        setError("Please enter a 6 digit vadlid token.");
        return
    }

    try {
        const data: ApiResponse = await fetchOrder(token);
        if(data.success) {
            setOrder(data.order);
        if (data.order.isPrinted) {
          setPrintedFiles(new Set(data.order.files.map((f) => f.id)));
        }
      } else {
        setError("Failed to fetch order. Please check the token.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

//   const handlePrint = (file: FileItem) => {
//     setPrintedFiles((prev) => new Set(prev).add(file.id));
//   };

//   const handlePrintAll = () => {
//     if (!order) return;
//     setPrintedFiles(new Set(order.files.map((f) => f.id)));
//   };

//   const allPrinted = order
//     ? order.files.every((f) => printedFiles.has(f.id))
//     : false;

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const truncate = (filename: string) =>
    filename.length > 20 ? filename.slice(0, 8) + "…" + filename.slice(-8) : filename;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="w-full min-h-screen dark:bg-[#0f1117] bg-gray-50">
      {/* Header */}
      <div className="w-full px-12 py-6 border-b border-gray-200 dark:border-white/10">
        <h1 className="text-4xl font-bold">
          Enter Order <span className="text-cyan-500">Token</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">Scan or type the token from the student's receipt</p>
      </div>

      {/* Token Input */}
      <div className="px-12 py-6 flex items-center gap-4">
        <input
          className="w-full max-w-xs rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-mono tracking-widest text-slate-700 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-[#151924] dark:text-slate-200"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && token && !loading && GetOrder()}
          placeholder="e.g. 233098"
          maxLength={12}
        />
        <button
          className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold text-white transition-all duration-200 ${
            token === "" || loading
              ? "cursor-not-allowed bg-gray-300 dark:bg-gray-700"
              : "bg-gradient-to-r from-cyan-500 to-cyan-400 hover:scale-[1.02] active:scale-95"
          }`}
          onClick={GetOrder}
          disabled={token === "" || loading}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z" />
              </svg>
              Fetching…
            </>
          ) : (
            "Get Order"
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-12 mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Order Result */}
      {order && (
        <div className="px-12 pb-10">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#151924] overflow-hidden">

            {/* Order Info Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-semibold text-sm flex-shrink-0">
                  {initials(order.name)}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{order.name}</p>
                  <p className="text-xs text-gray-400">{order.email}</p>
                </div>
              </div>
{/* 
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  allPrinted
                    ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                }`}>
                  {allPrinted ? "Printed" : "Pending"}
                </span>
                <button
                  onClick={handlePrintAll}
                  disabled={allPrinted}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    allPrinted
                      ? "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-600"
                      : "bg-cyan-500 text-white hover:bg-cyan-600 active:scale-95"
                  }`}
                >
                  Print All
                </button>
              </div> */}
            </div>

            {/* Meta */}
            <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-white/10 border-b border-gray-100 dark:border-white/10">
              {[
                { label: "Order ID", value: `#${order.id}`, mono: false },
                { label: "Token", value: order.token, mono: true },
                { label: "Placed at", value: formatDate(order.createdAt), mono: false },
              ].map(({ label, value, mono }) => (
                <div key={label} className="px-6 py-4">
                  <p className="text-xs text-gray-400 mb-1">{label}</p>
                  <p className={`text-sm font-semibold text-slate-800 dark:text-slate-100 ${
                    mono ? "font-mono tracking-widest text-cyan-500" : ""
                  }`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Files */}
            <div className="px-6 py-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Files{" "}
                <span className="ml-1 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 px-1.5 py-0.5 rounded-md">
                  {order.files.length}
                </span>
              </p>
              <div className="space-y-2">
                {order.files.map((file, i) => {
                  const isPrinted = printedFiles.has(file.id);
                  return (
                    <div
                      key={file.id}
                      className="flex items-center gap-4 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3"
                    >
                      {/* Icon */}
                      <div className="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14,2 14,8 20,8" />
                        </svg>
                      </div>

                      {/* Name + Tags */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate">
                          File {i + 1} — {truncate(file.filename)}
                        </p>
                        <div className="flex gap-1.5 mt-1">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            file.colorType === "black-white"
                              ? "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"
                              : "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400"
                          }`}>
                            {file.colorType === "black-white" ? "B&W" : "Color"}
                          </span>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            file.printType === "single-sided"
                              ? "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                              : "bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400"
                          }`}>
                            {file.printType === "single-sided" ? "Single" : "Double"}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                        >
                          Preview
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}