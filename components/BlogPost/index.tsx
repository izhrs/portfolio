import { PostResponse } from "@/types";
import Card from "@/components/ui/PostCard";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default async function BlogPosts() {
    let posts: PostResponse | null = null;
    let error: Error | null = null;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/blog/posts/?page_size=3`,
            { cache: "force-cache" },
        );

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        posts = await response.json();
    } catch (err) {
        error =
            err instanceof Error ? err : new Error("An unknown error occurred");
        console.error("Failed to fetch blog posts");
    }

    return (
        <section id="blog" className="pt-32">
            <div className="w-full max-w-2xl mx-auto h-48 -mt-14 z-30">
                <TextHoverEffect text="BLOG" />
            </div>
            <h2 className="container text-4xl md:text-5xl mb-5 font-bold text-accent text-center">
                Dive into my thoughts
            </h2>
            <p className="container text-muted-foreground text-sm md:text-base text-center mb-10">
                Explore my latest blog posts and read about my experiences,
                thoughts, and ideas.{" "}
                <Link
                    href="/blog"
                    className="text-transparent bg-clip-text bg-linear-to-r from-accent bg-destructive group"
                >
                    Explore all posts
                    <FaArrowRightLong className="inline-block ml-2 h-4 w-4 text-destructive group-hover:translate-x-2 transition duration-300" />
                </Link>
            </p>

            {error ? (
                <div className="container text-center py-10">
                    <p className="text-destructive mb-4">
                        Failed to load blog posts
                    </p>
                    <p className="text-muted-foreground text-sm">
                        Please try again later or check out the blog section
                        directly.
                    </p>
                </div>
            ) : posts && posts.results.length > 0 ? (
                <div className="container overflow-x-hidden w-full grid grid-cols-1 md:grid-cols-3 gap-5">
                    {posts.results.map((post, index) => (
                        <Card key={index} post={post} />
                    ))}
                </div>
            ) : (
                <div className="container text-center py-10">
                    <p className="text-muted-foreground">
                        No blog posts available at the moment.
                    </p>
                </div>
            )}
        </section>
    );
}
