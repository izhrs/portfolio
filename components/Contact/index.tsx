import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";
import { TextHoverEffect } from "@/components/ui/TextHoverEffect";

import ContactForm from "./ContactForm";

export default function Contact() {
    return (
        <section id="contact" className="pb-16 md:pb-32">
            <div className="w-full max-w-2xl mx-auto h-48 -mt-14 z-30">
                <TextHoverEffect text="CONTACT" />
            </div>
            <div className="container overflow-x-hidden w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col items-start justify-center max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-accent">
                        Let&apos;s chat. Tell me about your project.
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base mt-4 mb-10">
                        Let&apos;s create something amazing together! I&apos;m
                        always open to new projects and collaborations.
                    </p>
                    <div className="flex gap-5 items-center justify-start p-10">
                        <IoMailOutline className="h-8 w-8 lg:h-10 lg:w-10 text-muted-foreground" />

                        <div>
                            <p className="text-muted-foreground">Mail me at</p>
                            <Link
                                href="mailto:mohamed@izhar.xyz"
                                className="text-primary font-semibold text-lg lg:text-xl mt-1"
                            >
                                mohamed@izhar.xyz
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex w-full items-center justify-center lg:justify-end">
                    <div className="lg:max-w-xl w-full border p-5 lg:p-10">
                        <p className="text-xl lg:text-2xl font-semibold">
                            Send me a message
                        </p>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
