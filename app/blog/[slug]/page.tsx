import Image from "next/image";
import { Metadata } from "next";

import { PostDetail } from "@/types";
import { CgCalendarTwo } from "react-icons/cg";

import RelatedPosts from "./RelatedPosts";
import SocialShare from "./SocialShare";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const slug = (await params).slug;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/posts/${slug}/`,
        { cache: "force-cache" },
    );

    const post: PostDetail = await response.json();

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
            type: "article",
            images: [
                {
                    url: post.image,
                    alt: post.title,
                    width: 1200,
                    height: 630,
                },
            ],
            siteName: "Mohamed Izhar",
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [post.image],
        },
    };
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/posts/${slug}/`,
        { cache: "force-cache" },
    );

    const post: PostDetail = await response.json();

    return (
        <div className="min-h-svh w-screen overflow-x-hidden mb-16 md:mb-32">
            <div className="h-svh w-full container relative">
                <Image
                    src={post.image}
                    alt={post.title}
                    width={1900}
                    height={1000}
                    className="h-svh object-cover"
                />
                <div className="absolute inset-0 h-svh bg-linear-to-r from-background via-transparent to-background" />
                <div className="absolute inset-0 h-svh bg-linear-to-b from-background to-transparent backdrop-blur-lg">
                    <div className="container h-full w-full max-w-4xl flex flex-col justify-end items-start py-16 text-primary">
                        <div className="mb-4 flex items-center justify-start">
                            <CgCalendarTwo className="h-5 w-5 text-muted-foreground" />
                            <span className="text-muted-foreground text-sm md:text-base ml-2 uppercase">
                                {new Date(post.updated_at).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    },
                                )}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                            {post.title}
                        </h1>
                        <div className="mt-5 flex flex-wrap gap-2 justify-start items-center w-full">
                            {post.categories?.map((category) => (
                                <span
                                    key={category.id}
                                    className="text-xs text-nowrap md:text-sm uppercase text-accent border border-accent py-1 px-3 rounded-full bg-background/40 backdrop-blur-xl"
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                        <div className="mt-8">
                            <SocialShare title={post.title} slug={post.slug} />
                        </div>
                        <p className="text-foreground text-sm md:text-base mt-8">
                            {post.description}
                        </p>
                    </div>
                </div>
            </div>
            <article className="prose-sm lg:prose-base prose-zinc dark:prose-invert prose-pre:bg-secondary prose-pre:text-secondary-foreground prose-pre:overflow-x-auto prose-h1:font-bold prose-h2:font-bold prose-h3:font-bold prose-h4:font-bold prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal container max-w-4xl">
                {post.content.map((content, idx) => (
                    <div className="space-y-5" key={idx}>
                        {content.image && (
                            <div className="h-full w-full aspect-video overflow-hidden">
                                <Image
                                    src={content.image}
                                    alt={"article content image"}
                                    width={1900}
                                    height={1000}
                                    className="w-full h-full aspect-video object-cover"
                                />
                            </div>
                        )}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: content.content,
                            }}
                        />
                    </div>
                ))}
            </article>
            <div className="container pt-16 md:pt-32">
                <h3 className="text-2xl md:text-3xl text-accent font-semibold mb-10">
                    Similar Posts
                </h3>
                <RelatedPosts slug={slug} />
            </div>
        </div>
    );
}
