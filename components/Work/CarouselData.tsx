import Image from "next/image";
import { Carousel, Card } from "@/components/ui/CardsCarousel";
import { project } from "@/types";

export function CarouselData({ projects }: { projects: project[] }) {
    const data = projects.map((project) => ({
        category: project.category,
        title: project.title,
        description: project.description,
        image: project.image,
        source_code_url: project.source_code_url,
        site_url: project.site_url,
        detail: <Content detail={project.detail} />,
    }));

    const cards = data.map((card, index) => (
        <Card key={card.image} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full">
            <h2 className="container text-4xl md:text-5xl mb-10 font-bold text-accent text-center">
                Dig into my universe
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const Content = ({ detail }: { detail: string }) => {
    return (
        <div className="min-h-screen bg-[#F5F5F7] dark:bg-zinc-800 p-8 md:p-14 rounded-3xl mb-4">
            <div className="max-w-3xl mx-auto">
                <div
                    className="prose prose-zinc dark:prose-invert lg:prose-lg max-w-none mb-5 md:mb-10"
                    dangerouslySetInnerHTML={{ __html: detail }}
                />
            </div>
        </div>
    );
};
