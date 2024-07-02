"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SunIcon from '@/icons/sun-icon.svg'
import MoonIcon from "@/icons/moon-icon.svg";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();


    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) {
        return null;
    }


    return (
        <div className="cursor-pointer p-[10px] bg-grey-100 text-grey-600 w-fit h-fit dark:bg-icon-dark dark:text-white rounded-full" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} >
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
        </div>
    );
};