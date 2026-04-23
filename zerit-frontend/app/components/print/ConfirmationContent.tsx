'use client'

import { CheckCircle2, Copy, Printer } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function ConfirmationContent({ token, resetPage }: { token: string, resetPage: () => void }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(token)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center overflow-hidden">

            {/* Glow blobs — subtle in light, more visible in dark */}
            <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-[0.06] dark:opacity-10"
                 style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }} />
            <div className="pointer-events-none absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full opacity-[0.05] dark:opacity-[0.08]"
                 style={{ background: "radial-gradient(circle, #FF0099 0%, transparent 70%)" }} />

            <div className="relative max-w-md w-full flex flex-col items-center">

                {/* Success icon */}
                <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-cyan-50 border border-cyan-200 dark:bg-cyan-400/10 dark:border-cyan-400/30">
                        <CheckCircle2 size={36} className="text-cyan-500 dark:text-cyan-400" strokeWidth={1.5} />
                    </div>
                    <span className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping" />
                    <span className="absolute -inset-3 rounded-full border border-cyan-400/10 animate-ping"
                          style={{ animationDelay: "0.3s" }} />
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-50 dark:bg-emerald-400/5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-4 font-display">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    Order placed successfully
                </div>

                {/* Headline */}
                <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 dark:text-white mb-3 leading-tight">
                    You're all set.<br />
                    <span className="bg-gradient-to-r from-cyan-500 to-cyan-400 bg-clip-text text-transparent">
                        Go print.
                    </span>
                </h2>

                <p className="text-gray-500 dark:text-gray-400 text-base mb-10 leading-relaxed max-w-sm">
                    Show this token at the counter. The operator will have your job ready in seconds.
                </p>

                {/* Token card — gradient border wrapper */}
                <div className="w-full rounded-3xl p-px mb-6 bg-gradient-to-br from-cyan-400/40 to-pink-500/20">
                    <div className="w-full rounded-3xl px-8 py-7 flex flex-col items-center gap-2 bg-cyan-50/80 dark:bg-[#0D0F14]/80">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 font-display font-semibold">
                            Your print token
                        </p>
                        <p className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl tracking-[0.2em] text-gray-900 dark:text-white mt-1 text-nowrap">
                            {token.slice(0, 3)}
                            <span className="bg-gradient-to-r from-cyan-500 to-cyan-400 bg-clip-text text-transparent">
                                –{token.slice(3)}
                            </span>
                        </p>

                        <button
                            onClick={handleCopy}
                            className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-semibold transition-all duration-200 hover:scale-105 active:scale-95 border ${
                                copied
                                    ? "bg-emerald-50 border-emerald-300 text-emerald-600 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400"
                                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 dark:bg-white/5 dark:border-white/10 dark:text-gray-400 dark:hover:border-white/20"
                            }`}
                        >
                            <Copy size={12} />
                            {copied ? "Copied!" : "Copy token"}
                        </button>
                    </div>
                </div>

                {/* Instructions */}
                <div className="w-full rounded-2xl border border-gray-200/80 bg-white/80 px-5 py-4 mb-8 text-left dark:border-white/10 dark:bg-white/[0.02]">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-600 font-display font-semibold mb-3">What's next</p>
                    <div className="flex flex-col gap-2.5">
                        {[
                            "Walk to the stationary shop",
                            "Show your token at the counter",
                            "Operator hits print — done in seconds",
                        ].map((step, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-display flex-shrink-0 bg-cyan-50 border border-cyan-200 text-cyan-600 dark:bg-cyan-400/10 dark:border-cyan-400/20 dark:text-cyan-400">
                                    {i + 1}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 justify-center">
                    <button
                        className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 font-display text-sm tracking-wide"
                        onClick={resetPage}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400" />
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity" />
                        <Printer size={15} className="relative" />
                        <span className="relative">New Print Job</span>
                    </button>

                    <Link href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:border-cyan-400/50 hover:text-cyan-600 dark:hover:border-cyan-400/30 dark:hover:text-cyan-400 transition-all duration-300 font-display text-sm tracking-wide"
                    >
                        Back to home
                    </Link>
                </div>
            </div>
        </div>
    )
}