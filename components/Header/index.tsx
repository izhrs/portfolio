"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";

import Logo from "@/components/ui/Logo";
import HorizontalLine from "@/components/ui/HorizontalLine";
import ThemeToggler from "@/components/ThemeToggler";
import Button from "@/components/ui/Button";

const navs = [
    { text: "About", href: "/#about" },
    { text: "Work", href: "/#work" },
    {
        text: "Customer Stories",
        href: "/#stories",
    },
    { text: "Contact", href: "/#contact" },
    { text: "Blog", href: "/blog" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 80);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed top-2 left-0 w-screen h-16 lg:h-24 flex items-center py-2 lg:p-4 z-50 transition-all duration-300 p-4"
            >
                <motion.div
                    className={`container mx-auto grid grid-cols-2 lg:grid-cols-4 w-full rounded-full h-full
                    ${
                        isScrolled
                            ? "bg-background/50 backdrop-blur-xl text-foreground border"
                            : "bg-transparent text-foreground border border-transparent"
                    } transition-all duration-500
                    `}
                >
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-base md:text-xl tracking-tighter"
                        >
                            MOHAMED{" "}
                            <span className="font-extrabold">IZHAR</span>
                        </Link>
                    </div>
                    <nav className="hidden lg:flex lg:col-span-2 gap-5 items-center justify-center text-sm uppercase">
                        {["About", "Work", "Blog"].map((text, idx) => (
                            <Link
                                key={idx}
                                href={
                                    text === "Blog"
                                        ? "/blog"
                                        : `/#${text.toLowerCase()}`
                                }
                                className="hover:text-accent transition duration-300"
                            >
                                {text}
                            </Link>
                        ))}
                        <Link
                            href="https://github.com/izhrs"
                            className="hover:text-accent transition duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Github
                        </Link>
                    </nav>
                    <div className="flex items-center gap-3 lg:gap-5 justify-end w-full">
                        {/* <Search /> */}
                        <ThemeToggler />
                        <Link
                            href="/#contact"
                            className="-mr-2 hidden lg:block"
                        >
                            <Button>Get in Touch</Button>
                        </Link>
                        <button
                            className="lg:hidden"
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Open Navigation Menu"
                        >
                            <AiOutlineMenu className="h-5 w-5 text-foreground" />
                        </button>
                    </div>
                </motion.div>
            </motion.header>

            {/* Mobile Navigation */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: isMenuOpen ? "0%" : "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed top-0 right-0 h-screen w-full bg-background z-[60] p-8 shadow-lg lg:hidden"
            >
                <div className="flex items-center justify-end">
                    <button
                        className="text-foreground p-3"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Close Navigation Menu"
                    >
                        <RxCross1 className="h-5 w-5" />
                    </button>
                </div>

                {/* not using logo component for accessiblity reasons. onClick is required */}
                <Link
                    onClick={() => setIsMenuOpen(false)}
                    href="/"
                    className="w-full flex items-center justify-center mb-10"
                    aria-label="Go to Home"
                >
                    <Image src="/logo.svg" height={48} width={48} alt="logo" />
                </Link>

                <HorizontalLine />
                <div className="flex flex-col gap-4 py-10 p-5 text-center font-light">
                    {navs.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.href}
                            className="hover:text-primary text-xl font-light transition duration-300 uppercase"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.text}
                        </Link>
                    ))}
                    <Link
                        href="https://github.com/izhrs"
                        className="hover:text-primary text-xl font-light transition duration-300 uppercase"
                        onClick={() => setIsMenuOpen(false)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Github
                    </Link>
                </div>
                <HorizontalLine />
            </motion.div>
        </>
    );
}
