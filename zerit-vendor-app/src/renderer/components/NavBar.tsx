"use client";

import ThemeToggler from "./ThemeToggler";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`w-full flex justify-center items-center sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md dark:bg-[#0D0F14]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-sm"
          : "bg-transparent backdrop-blur-md"
      }`}
    >
      <div className="max-w-5xl w-full px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md scale-0 group-hover:scale-100 transition-transform duration-300" />
            <img
              src={'/icons/icon-192.png'}
              alt="Zerit Logo"
              height={38}
              width={38}
              className="relative rounded-xl"
            />
          </div>
          <span
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Zerit<span className="text-cyan-400">.</span>
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
}