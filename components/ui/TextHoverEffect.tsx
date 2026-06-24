"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({
    text,
    duration = 0.4, // Default duration if not provided
}: {
    text: string;
    duration?: number;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "0%", cy: "0%" });

    useEffect(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercentage =
                ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercentage =
                ((cursor.y - svgRect.top) / svgRect.height) * 100;
            setMaskPosition({
                cx: `${cxPercentage}%`,
                cy: `${cyPercentage}%`,
            });
        }
    }, [cursor]);

    // Create unique IDs for each instance of the component
    const uniqueId = `text-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 300 100"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
            className="select-none"
        >
            <defs>
                {/* Use unique gradient ID */}
                <linearGradient
                    id={`textGradient-${uniqueId}`}
                    gradientUnits="userSpaceOnUse"
                    cx="50%"
                    cy="50%"
                    r="25%"
                >
                    {hovered && (
                        <>
                            <stop offset="0%" stopColor="var(--indigo-400)" />
                            <stop offset="25%" stopColor="var(--indigo-400)" />
                            <stop offset="50%" stopColor="var(--red-400)" />
                            <stop offset="75%" stopColor="var(--sky-400)" />
                            <stop
                                offset="100%"
                                stopColor="var(--destructive)"
                            />
                        </>
                    )}
                </linearGradient>

                {/* Use unique radial gradient ID */}
                <motion.radialGradient
                    id={`revealMask-${uniqueId}`}
                    gradientUnits="userSpaceOnUse"
                    r="20%"
                    animate={maskPosition}
                    transition={{ duration, ease: "easeOut" }}
                >
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </motion.radialGradient>

                {/* Use unique mask ID */}
                <mask id={`textMask-${uniqueId}`}>
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill={`url(#revealMask-${uniqueId})`}
                    />
                </mask>
            </defs>

            {/* Regular text with hover effect */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="0.9"
                className="font-[helvetica] font-bold stroke-muted fill-transparent text-5xl"
                style={{ opacity: hovered ? 0.8 : 0 }}
            >
                {text}
            </text>

            {/* Animated stroke effect */}
            <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="0.9"
                className="font-[helvetica] font-bold fill-transparent text-5xl stroke-muted"
                initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                animate={{
                    strokeDashoffset: 0,
                    strokeDasharray: 1000,
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                }}
            >
                {text}
            </motion.text>

            {/* Text with gradient mask */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke={`url(#textGradient-${uniqueId})`}
                strokeWidth="0.9"
                mask={`url(#textMask-${uniqueId})`}
                className="font-[helvetica] font-bold fill-transparent text-5xl"
            >
                {text}
            </text>
        </svg>
    );
};
