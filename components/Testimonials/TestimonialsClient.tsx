"use client";

import { useEffect, useRef, useState } from "react";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import { ShootingStars } from "@/components/ui/ShootingStars";
import { StarsBackground } from "@/components/ui/StarsBackground";

import { Testimonial } from "@/types";

export default function TestimonialsClient({
    testimonials,
}: {
    testimonials: Testimonial[];
}) {
    const cardContainerRef = useRef<HTMLDivElement | null>(null);
    const [spacerHeight, setSpacerHeight] = useState(0);

    useEffect(() => {
        if (cardContainerRef.current) {
            setSpacerHeight(cardContainerRef.current.offsetHeight);
        }
    }, []);

    return (
        <section id="stories" className="my-16 md:my-32 w-full relative">
            <HorizontalLine />
            <div className="pt-16 md:pt-32">
                <div className="w-full max-w-2xl mx-auto h-48 -mt-14 z-40" />
            </div>
            <h2 className="container text-4xl md:text-5xl font-bold text-accent text-center mb-4">
                Trusted by the kindest customers
            </h2>
            <p className="text-muted-foreground text-sm md:text-base text-center mb-10">
                Here&apos;s a glimpse into the heartfelt experiences of my
                incredible customers. Your trust fuels my passion.
            </p>
            {/* Card container with ref */}
            <div
                ref={cardContainerRef}
                className="h-fit pb-16 md:pb-32 rounded-md flex flex-col antialiased items-center justify-center overflow-hidden w-screen absolute left-0"
            >
                <InfiniteMovingCards
                    items={testimonials}
                    direction="left"
                    speed="slow"
                />
            </div>
            {/* Spacer div with dynamic height */}
            <div style={{ height: spacerHeight }} />
            <HorizontalLine />
            <ShootingStars />
            <StarsBackground />
            <div className="absolute top-16 md:top-32 w-full">
                <div className="w-full max-w-2xl mx-auto h-48 -mt-14 z-40">
                    <TextHoverEffect text="STORIES" />
                </div>
            </div>
        </section>
    );
}
