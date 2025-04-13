import Image from "next/image";

import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";

import { TextHoverEffect } from "@/components/ui/TextHoverEffect";
import { FlipWords } from "@/components/ui/FlipWordsEffect";
import Link from "next/link";

export default function About() {
    return (
        <section
            id="about"
            className="w-screen min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden lg:border-t lg:border-b"
        >
            <div className="relative h-[500px] lg:h-screen">
                <Image
                    src="/images/glasses.jpg"
                    height={1500}
                    width={1000}
                    alt="about"
                    className="object-cover h-[500px] lg:h-screen w-full"
                />
                <div className="absolute inset-0 h-full w-full bg-purple-600/10 z-20" />
            </div>
            <div className="flex flex-col items-start justify-center p-5 py-20 lg:p-20">
                <div className="w-full h-48 -mt-14">
                    <TextHoverEffect text="ABOUT" />
                </div>

                <div>
                    <FlipWords
                        words={["Developer", "Designer", "Problem solver"]}
                        duration={1500}
                    />
                </div>

                <p className="text-muted-foreground text-lg mt-10">
                    Hello! I&apos;m Mohamed Izhar, a passionate web developer
                    and enthusiast from India. I&apos;m currently pursuing my
                    Bachelor&apos;s degree in Computer Science and Engineering
                    at Ajeenkya DY Patil University, with graduation expected in
                    2025. My technical skills include Django, Svelte, Next.js,
                    and TailwindCSS, and I thrive on creating seamless, engaging
                    digital experiences with a high level of craftsmanship.{" "}
                    <br /> <br />
                    Outside of tech, I&apos;m a big animal lover and have three
                    wonderful cats. I&apos;m passionate about coding, computer
                    science, and continuous learning, and I&apos;m actively
                    seeking job opportunities where I can bring my skills and
                    passion to a collaborative team. If you&apos;re looking for
                    a developer committed to excellence and innovation, feel
                    free to connect with me!
                </p>

                <div className="mt-10 flex gap-5 lg:gap-10 items-center justify-center lg:justify-start w-full h-fit text-muted-foreground">
                    <Link
                        href="https://raw.githubusercontent.com/izhrs/resume/refs/heads/main/resume-izhar.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary transition duration-300"
                        aria-label="Download my resume in PDF format"
                    >
                        Resume
                    </Link>

                    <Link
                        href="https://github.com/izhrs"
                        className="hover:text-primary hover:scale-110 duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit my GitHub profile"
                    >
                        <FaGithub className="h-7 w-7 lg:h-8 lg:w-8" />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/izharmohamed"
                        className="hover:text-primary hover:scale-110 duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Connect with me on LinkedIn"
                    >
                        <FaLinkedin className="h-7 w-7 lg:h-8 lg:w-8" />
                    </Link>
                    <Link
                        href="https://twitter.com/#"
                        className="hover:text-primary hover:scale-110 duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow me on Twitter"
                    >
                        <FaXTwitter className="h-7 w-7 lg:h-8 lg:w-8" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
