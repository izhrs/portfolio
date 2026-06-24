import React from "react";

export default function Button({ children }: { children: React.ReactNode }) {
    return (
        <button
            className="relative inline-flex h-10 md:h-12 overflow-hidden rounded-full p-[2px] md:p-[3px]"
            aria-label="This is a button bitch"
        >
            {/* gradient blue-500 accent blue-500 */}
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#89b4fa_0%,#b4befe_50%,#89b4fa_100%)] text-pur" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-5 py-2 text-sm font-medium backdrop-blur-3xl">
                {children}
            </span>
        </button>
    );
}
