"use client";

import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";

export default function ThemeToggler() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="flex h-full items-center justify-center cursor-pointer p-2"
        >
            <div
                className={`absolute transition-transform duration-500 ${
                    isDark ? "animate-rotate" : "animate-rotate-back"
                }`}
            >
                {isDark ? (
                    <MdOutlineDarkMode className="h-5 w-5 text-foreground" />
                ) : (
                    <MdOutlineLightMode className="h-5 w-5 text-foreground" />
                )}
            </div>
        </button>
    );
}
