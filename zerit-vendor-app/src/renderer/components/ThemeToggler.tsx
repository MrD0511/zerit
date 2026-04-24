'use client'

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggler() {
    const [mounted, setMounted] = useState(false);
    const [dark, setDark] = useState(false);

    // Ensure component is mounted to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
        const isDark = localStorage.getItem("theme") === "dark" || 
                       (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
        setDark(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    const toggleTheme = () => {
        const newTheme = !dark;
        setDark(newTheme);
        document.documentElement.classList.toggle("dark", newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    if (!mounted) return <div className="p-5 w-10 h-10" />; // Placeholder to prevent layout shift

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`
                group relative flex items-center justify-center p-2.5 rounded-xl
                transition-all duration-300 active:scale-90
                bg-white/50 dark:bg-white/5 
                border border-gray-200 dark:border-white/10
                hover:border-cyan-400/50 dark:hover:border-cyan-400/50
                shadow-sm hover:shadow-cyan-500/20
            `}
        >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-colors duration-300" />

            <div className="relative overflow-hidden w-5 h-5">
                {dark ? (
                    <Moon 
                        size={20} 
                        className="text-gray-400 group-hover:text-cyan-400 transition-all duration-500 rotate-0 scale-100" 
                    />
                ) : (
                    <Sun 
                        size={20} 
                        className="text-gray-600 group-hover:text-amber-500 transition-all duration-500 rotate-0 scale-100" 
                    />
                )}
            </div>

            {/* Subtle highlight ring */}
            <span className="absolute inset-0 rounded-xl border border-white/20 dark:border-white/5 pointer-events-none" />
        </button>
    );
}