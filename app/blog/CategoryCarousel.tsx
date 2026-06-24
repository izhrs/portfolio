"use client";

import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

import { Category } from "@/types";

interface CarouselProps {
    items: Category[];
    initialScroll?: number;
}

export const CategoryCarousel = ({
    items,
    initialScroll = 0,
}: CarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = initialScroll;
            checkScrollability();
        }
    }, [initialScroll]);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollLeft = () => {
        carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="relative w-full">
            <motion.div
                className="flex w-full overflow-x-scroll scroll-smooth scrollbar-none"
                ref={carouselRef}
                onScroll={checkScrollability}
            >
                <div className="flex gap-4 pl-4">
                    {items.map((item, index) => (
                        <CategoryCard key={index} category={item} />
                    ))}
                </div>
            </motion.div>
            <button
                className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-background/70 border flex items-center justify-center disabled:opacity-30 transition duration-300"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
            >
                <FaArrowLeftLong className="h-4 w-4 text-muted-foreground" />
            </button>
            <button
                className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-background/70 border flex items-center justify-center disabled:opacity-30 transition duration-300"
                onClick={scrollRight}
                disabled={!canScrollRight}
            >
                <FaArrowRightLong className="h-4 w-4 text-muted-foreground" />
            </button>
        </div>
    );
};

export const CategoryCard = ({ category }: { category: Category }) => {
    return (
        <Link
            href={`/blog/categories/${category.slug}`}
            className="block relative w-64 h-80 rounded-lg overflow-hidden"
        >
            <motion.div className="relative w-full h-full">
                <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 to-transparent from-15% to-100% flex flex-col items-start justify-end text-primary-foreground dark:text-primary p-4 text-center">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                        {category.posts_count}{" "}
                        {category.posts_count <= 1 ? "Post" : "Posts"}
                    </p>
                    <p className="text-sm mt-2 text-left">
                        {category.description}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};
