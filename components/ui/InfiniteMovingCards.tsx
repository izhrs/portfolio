"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

import { Testimonial } from "@/types";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: Testimonial[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "20s"
                );
            } else if (speed === "normal") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "40s"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "80s"
                );
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:paused"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[350px] h-[350px] md:h-[400px] md:w-[450px] max-w-full relative border shrink-0 text-card-foreground bg-transparent backdrop-blur-sm px-8 py-6"
                        key={item.name + idx}
                    >
                        <blockquote className="h-full">
                            <div
                                aria-hidden="true"
                                className="select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%+4px)] w-[calc(100%+4px)]"
                            ></div>
                            <div className="w-full h-full flex flex-col justify-between">
                                <div className=" relative z-20 text-base leading-[1.6] font-normal text-foreground">
                                    &quot;{item.quote}&quot;
                                </div>
                                <div className="relative z-20 mt-6 flex gap-4 items-center">
                                    <Image
                                        src={item.avatar}
                                        alt={item.name}
                                        width={50}
                                        height={50}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />

                                    <div className="text-foreground">
                                        {item.name}
                                        <p className="text-sm text-muted-foreground">
                                            {item.designation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};
