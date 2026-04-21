import React from "react";

export default function PrintLayout({left, center, right, mobile}: {
    left: React.ReactNode,
    center: React.ReactNode,
    right: React.ReactNode,
    mobile: React.ReactNode
}){

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-white px-4 py-6 dark:bg-[#0D0F14] md:px-6">
            <div
                className="pointer-events-none absolute left-1/2 top-24 h-[460px] w-[460px] -translate-x-1/2 rounded-full opacity-10 dark:opacity-[0.07]"
                style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }}
            />
            <div
                className="pointer-events-none absolute -bottom-20 left-16 h-56 w-56 rounded-full opacity-10 dark:opacity-[0.06]"
                style={{ background: "radial-gradient(circle, #FF0099 0%, transparent 70%)" }}
            />

            <div className="relative mx-auto mb-6 max-w-7xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                    Print Workspace
                </div>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                    Configure and preview your print job.
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400 md:text-base">
                    Upload files, choose exact print settings, and submit when everything looks right.
                </p>
            </div>

            <div className="relative mx-auto max-w-7xl">
            <div className="md:hidden w-full">
                {mobile}
            </div>

            <div className="hidden w-full gap-4 md:grid md:grid-cols-3">
                <aside className="overflow-y-auto rounded-3xl border border-gray-200/70 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
                    {left}
                </aside>

                <main className="overflow-y-auto rounded-3xl border border-gray-200/70 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
                    {center}
                </main>

                <aside className="overflow-y-auto rounded-3xl border border-gray-200/70 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
                    {right}
                </aside>
            </div>

            <div className="mt-6 flex w-full items-center justify-end">
                <button type="button"
                        className={`inline-flex items-center gap-2.5 rounded-2xl px-6 py-3 font-semibold text-white transition-all duration-300 ${
                            false
                                ? "cursor-not-allowed bg-gray-300 dark:bg-gray-700"
                                : "bg-gradient-to-r from-cyan-500 to-cyan-400 hover:scale-[1.02] active:scale-95"
                        }`}
                >
                    {"Submit"}
                </button>
            </div>
            </div>
        </div>
    )
}