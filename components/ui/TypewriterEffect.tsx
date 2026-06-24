"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    className?: string;
    cursorClassName?: string;
}) => {
    // split text inside of words into array of characters
    const wordsArray = words.map((word) => {
        return {
            ...word,
            text: word.text.split(""),
        };
    });

    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);
    useEffect(() => {
        if (isInView) {
            animate(
                "span",
                {
                    display: "inline-block",
                    opacity: 1,
                    width: "fit-content",
                },
                {
                    duration: 0.1,
                    delay: stagger(0.08),
                    ease: "easeInOut",
                }
            );
        }
    }, [isInView]);

    const renderWords = () => {
        return (
            // @ts-ignore
            <motion.div ref={scope} className="inline">
                {wordsArray.map((word, idx) => {
                    return (
                        <div key={`word-${idx}`} className="inline-block">
                            {word.text.map((char, index) => (
                                <motion.span
                                    initial={{}}
                                    key={`char-${index}`}
                                    // @ts-ignore
                                    className={cn(
                                        `opacity-0 hidden`,
                                        word.className
                                    )}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            &nbsp;
                        </div>
                    );
                })}
            </motion.div>
        );
    };
    return (
        <div
            className={cn(
                "text-5xl md:text-6xl lg:text-7xl font-bold text-center",
                className
            )}
        >
            {renderWords()}
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                // @ts-ignore
                className={cn(
                    "inline-block rounded-sm w-[10px] h-10 md:h-14 lg:h-16 bg-accent -mb-2",
                    cursorClassName
                )}
            ></motion.span>
        </div>
    );
};

export const TypewriterEffectSmooth = ({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    className?: string;
    cursorClassName?: string;
}) => {
    // split text inside of words into array of characters
    const wordsArray = words.map((word) => {
        return {
            ...word,
            text: word.text.split(""),
        };
    });
    const renderWords = () => {
        return (
            <div>
                {wordsArray.map((word, idx) => {
                    return (
                        <div key={`word-${idx}`} className="inline-block">
                            {word.text.map((char, index) => (
                                <span
                                    key={`char-${index}`}
                                    className={cn(``, word.className)}
                                >
                                    {char}
                                </span>
                            ))}
                            &nbsp;
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={cn("flex space-x-1 my-6", className)}>
            <motion.div
                // @ts-ignore
                className="overflow-hidden pb-2"
                initial={{
                    width: "0%",
                }}
                whileInView={{
                    width: "fit-content",
                }}
                transition={{
                    duration: 2,
                    ease: "linear",
                    delay: 1,
                }}
            >
                <div
                    className="text-5xl md:text-6xl lg:text-7xl font-bold"
                    style={{
                        whiteSpace: "nowrap",
                    }}
                >
                    {renderWords()}{" "}
                </div>{" "}
            </motion.div>
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,

                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                // @ts-ignore
                className={cn(
                    "block rounded-sm w-[10px] h-10 md:h-14 lg:h-16 bg-accent -mb-2",
                    cursorClassName
                )}
            ></motion.span>
        </div>
    );
};
