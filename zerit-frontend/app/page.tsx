import Link from "next/link";

// ─── Step data ────────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload Your Files",
    desc: "Drop in your PDFs or docs. Set page range, copies, color mode, and single or double sided — all in one go.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Get Your Token",
    desc: "Receive a short unique token — your print job is queued, combined, and ready at the stationary.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Walk In & Print",
    desc: "Show up, enter your token at the counter, and the operator hits print. Done in seconds.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.056 48.056 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
      </svg>
    ),
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    title: "No More Queues",
    desc: "Your job is ready before you arrive. Walk in, scan token, walk out.",
    accent: "cyan",
  },
  {
    title: "Granular Controls",
    desc: "Page ranges, copy count, colour or B&W, single or duplex — you decide.",
    accent: "magenta",
  },
  {
    title: "Instant Token",
    desc: "One short code ties everything together. No files, no WhatsApp, no chaos.",
    accent: "cyan",
  },
  {
    title: "Operator Dashboard",
    desc: "Staff get a clean dashboard — one button, one job, perfectly combined.",
    accent: "magenta",
  },
];

export default function Home() {
  return (
    <>
      {/* Google Fonts */}

      <main className="min-h-screen bg-white dark:bg-[#0D0F14] overflow-x-hidden">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center min-h-[92vh] px-6 text-center overflow-hidden">

          {/* Background glow blobs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 dark:opacity-[0.07] pointer-events-none"
            style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }} />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 dark:opacity-[0.06] pointer-events-none"
            style={{ background: "radial-gradient(circle, #FF0099 0%, transparent 70%)" }} />

          {/* Badge */}
          <div className="slide-up delay-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-600 dark:text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-6 font-display">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Campus Print — Reimagined
          </div>

          {/* Headline */}
          <h1 className="slide-up delay-2 font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.08] tracking-tight text-gray-900 dark:text-white max-w-3xl">
            Print smarter,<br />
            <span className="grad-text">not harder.</span>
          </h1>

          {/* Sub */}
          <p className="slide-up delay-3 mt-6 text-gray-500 dark:text-gray-400 text-lg sm:text-xl max-w-xl leading-relaxed font-light">
            Upload your files, set your options, get a token.
            Walk in. Print. Leave. No queues, no chaos.
          </p>

          {/* CTAs */}
          <div className="slide-up delay-4 mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/upload"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-white transition-opacity duration-300" />
              <svg className="relative w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="relative font-display text-sm tracking-wide">Start Uploading</span>
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-cyan-400/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 font-display text-sm tracking-wide"
            >
              See how it works
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Floating token preview */}
          <div className="slide-up delay-4 mt-16 float">
            <div className="relative inline-flex items-center gap-4 px-6 py-4 rounded-2xl noise"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.12) 0%, rgba(255,0,153,0.08) 100%)",
                border: "1px solid rgba(0,212,255,0.25)",
                backdropFilter: "blur(12px)"
              }}>
              <div className="pulse-ring relative w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 dark:text-gray-500 font-display tracking-widest uppercase">Your token</p>
                <p className="text-2xl font-bold font-display tracking-[0.15em] text-gray-900 dark:text-white mt-0.5">
                  Z–<span className="grad-text">4821</span>
                </p>
              </div>
              <div className="ml-2 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  3 files · 12 pages
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Color · Double sided
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-16">
              <p className="font-display text-xs tracking-[0.25em] uppercase text-cyan-500 dark:text-cyan-400 mb-3">The Flow</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white">
                Three steps to done.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`relative p-7 rounded-3xl noise group cursor-default ${
                    typeof window === "undefined" ? "shimmer-card" : ""
                  } shimmer-card dark:shimmer-card light-card`}
                >
                  {/* Step number — large background */}
                  <span className="absolute top-5 right-6 font-display font-extrabold text-6xl text-gray-100 dark:text-white/5 select-none leading-none">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="relative w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-400/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>

                  <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Connector line (not last) */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-gray-50/50 dark:bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-16">
              <p className="font-display text-xs tracking-[0.25em] uppercase text-[#FF0099] mb-3">Why Zerit</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white">
                Built for speed.<br />Designed for you.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="p-7 rounded-3xl noise shimmer-card light-card group cursor-default"
                >
                  <div className={`w-2 h-2 rounded-full mb-5 ${f.accent === "cyan" ? "bg-cyan-400" : "bg-[#FF0099]"}`} />
                  <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="relative p-12 rounded-[2.5rem] noise overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(255,0,153,0.06) 100%)",
                border: "1px solid rgba(0,212,255,0.15)"
              }}
            >
              {/* Blob decoration */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)" }} />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,0,153,0.12) 0%, transparent 70%)" }} />

              <h2 className="relative font-display font-extrabold text-4xl md:text-5xl text-gray-900 dark:text-white mb-4 leading-tight">
                Ready to skip<br />the line?
              </h2>
              <p className="relative text-gray-500 dark:text-gray-400 mb-8 text-lg">
                Upload once. Show your token. Collect your prints.
              </p>
              <Link
                href="/upload"
                className="relative group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 font-display tracking-wide"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-cyan-400 to-[#00bfff]" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
                <svg className="relative w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="relative">Upload Your Files</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer className="border-t border-gray-100 dark:border-white/5 py-8 px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-display font-bold text-xl text-gray-900 dark:text-white">
              Zerit<span className="text-cyan-400">.</span>
            </span>
            <p className="text-xs text-gray-400 font-display tracking-wide">
              © {new Date().getFullYear()} Zerit · Campus printing, simplified.
            </p>
          </div>
        </footer>

      </main>
    </>
  );
}