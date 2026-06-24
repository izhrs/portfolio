"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";

const techStack = [
    { name: "Rust", color: "text-chart-1" }, // red
    { name: "Next.js", color: "text-primary" }, // primary
    { name: "Django", color: "text-chart-2" }, // green
    { name: "Tailwind", color: "text-chart-3" }, // sky
    { name: "Svelte", color: "text-chart-4" }, // maroon
    { name: "React Native", color: "text-chart-5" }, // blue
];

export default function TechStackParallax() {
    const { scrollYProgress } = useScroll();

    // Use spring to make the scroll behavior smooth
    const springScrollY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    const transformX = useTransform(springScrollY, [0, 1], [-300, 300]);

    const transformXReverse = useTransform(
        springScrollY,
        [0, 1], // Maps scroll progress to the given range
        [300, -300], // Alternate directions
    );

    return (
        <section
            id="tech-stack-container"
            className="container relative flex flex-col items-center justify-center pb-16 md:py-32 w-full overflow-hidden"
        >
            <div className="w-full max-w-2xl h-48 -mt-14 z-30">
                <TextHoverEffect text="TECHSTACK" />
            </div>

            {techStack.map((tech, index) => {
                const xTransform =
                    index % 2 === 0 ? transformX : transformXReverse;

                return (
                    <motion.div
                        key={tech.name}
                        style={{ x: xTransform }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black mb-5"
                    >
                        <div className="flex flex-nowrap items-center justify-center gap-5 overflow-hidden">
                            {Array.from({ length: 15 }).map((_, i) => (
                                <React.Fragment key={i}>
                                    <span
                                        className={`uppercase whitespace-nowrap tracking-tighter ${
                                            i === 7
                                                ? tech.color
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        {tech.name}
                                    </span>
                                    {i < 14 && (
                                        <div className="h-3 w-3 md:w-4 md:h-4 bg-muted-foreground rounded-full self-center" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </motion.div>
                );
            })}

            <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-background"></div>
        </section>
    );
}
