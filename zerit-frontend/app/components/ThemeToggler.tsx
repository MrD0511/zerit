'use client'

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react"

export default function ThemeToggler(){

    const [dark, setDark] = useState<Boolean>(false);

    useEffect(()=>{
        const isDark = localStorage.getItem("theme") === "dark";
        setDark(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, [])

    const toggleTheme = () => {
        const newTheme = !dark;

        setDark(newTheme);

        if(newTheme){
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }else{
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }
    
    return (
        <button className={`rounded-full p-1.5 bg-gray-50 dark:bg-gray-900 text-blue-500 dark:text-gray-50 cursor-pointer border-2 border-blue-500 dark:border-gray-50`} onClick={toggleTheme}>
            {dark ? <Moon /> : <Sun />}
        </button>
    )
}