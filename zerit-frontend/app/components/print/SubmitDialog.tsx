'use client'

import { X, Loader2 } from "lucide-react"
import { useState } from "react"

export default function SubmitDialog({toggleSubmitDialog, totalPages, totalFiles, handleSubmit} : 
    {
        toggleSubmitDialog: () => void,
        totalPages: number,
        totalFiles: number,
        handleSubmit: (name: string, email: string) => void
    }
){

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function validateEmail(emailInput: string) {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(emailInput);
    }   

    const onSubmit = async () => {
        if(!name || !email){
            setError("Please fill in both fields to continue.")
            return
        }
        if(validateEmail(email) === false){
            setError("Please enter a valid E-Mail.")
            return;
        }
        setError("")
        setIsLoading(true)
        await handleSubmit(name, email)
        setIsLoading(false)
    }

    return (
        <div className="absolute inset-0 flex justify-center items-center z-10 backdrop-blur-lg bg-gray-900/70">

            <div className="w-full max-w-sm mx-4 rounded-2xl border border-gray-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/[0.02]">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">Print job</p>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">Upload &amp; get token</h3>
                    </div>
                    <button onClick={toggleSubmitDialog} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                {/* Summary row */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="rounded-full bg-gray-100 dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 px-2.5 py-1 text-xs text-gray-700 dark:text-gray-300">
                        {totalFiles} file{totalFiles === 1 ? "" : "s"}
                    </span>
                    <span className="rounded-full bg-cyan-400/10 border border-cyan-400/25 px-2.5 py-1 text-xs text-cyan-600 dark:text-cyan-300">
                        {totalPages} pages
                    </span>
                </div>

                <div className="h-px bg-gray-100 dark:bg-white/5 mb-4" />

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        <p className="text-red-600 dark:text-red-300 text-xs">{error}</p>
                    </div>
                )}

                {/* Inputs */}
                <div className="flex flex-col gap-3 mb-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">Full name</label>
                        <input
                            type="text"
                            placeholder="Your name..."
                            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-slate-700 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-[#151924] dark:text-slate-200"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-slate-700 transition focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 dark:border-white/10 dark:bg-[#151924] dark:text-slate-200"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    onClick={onSubmit}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 w-full rounded-2xl px-6 py-3 font-semibold text-white text-sm transition-all duration-300 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={15} className="animate-spin" />
                            Uploading…
                        </>
                    ) : (
                        "Upload & Get Token"
                    )}
                </button>
            </div>
        </div>
    )
}