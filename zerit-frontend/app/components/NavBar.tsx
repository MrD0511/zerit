"use client";

import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import Image from "next/image";
import logo from "@/public/icons/icon-512.png";
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
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md scale-0 group-hover:scale-100 transition-transform duration-300" />
            <Image
              src={logo}
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
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/upload"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm text-white overflow-hidden group transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {/* Gradient background */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-300 group-hover:from-cyan-400 group-hover:to-[#00bfff]" />
            {/* Glow */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-40 bg-cyan-400 blur-md transition-opacity duration-300" />
            {/* Icon */}
            <svg
              className="relative w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className="relative">Upload</span>
          </Link>

          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
}