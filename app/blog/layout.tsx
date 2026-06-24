import { BackgroundBeams } from "@/components/ui/BackgroundBeams";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-svh">
            {children}
            <div className="container mb-16 md:mb-32">
                <div className="h-96 relative border">
                    <div className="absolute inset-0 h-full w-full flex flex-col justify-center items-center p-4">
                        <h4 className="text-xl md:text-3xl uppercase text-foreground text-center w-full tracking-tight">
                            Stay curious. Stay inspired. Let the stories find
                            you.
                        </h4>
                        <p className="mt-5 lg:max-w-4xl text-center text-muted-foreground">
                            Subscribe to get fresh insights, coding tips, and
                            the latest in tech delivered straight to your inbox.
                            Whether you&apos;re a beginner or an expert,
                            there&apos;s always something new to explore. Be the
                            first to explore stories that inspire, inform, and
                            ignite your imagination
                        </p>
                        <form className="max-w-4xl w-full space-y-5">
                            <div className="mt-5 md:mt-10 w-full relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@email.com"
                                    autoComplete="email"
                                    className="w-full border px-3 py-2 bg-transparent text-primary focus:outline-none focus:border-purple-600 transition duration-300"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-0 bottom-0 bg-primary text-primary-foreground py-2 px-5 uppercase text-xs"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                    <BackgroundBeams />
                </div>
            </div>
        </main>
    );
}
