"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import Loader from "@/components/ui/Loader";

const ContactFormSchema = z.object({
    name: z.string().min(2, "Name is required").max(50, "Name is too long"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    phone: z.string().optional(), // Honeypot field for bots, not required by users
});

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormInputs>({
        resolver: zodResolver(ContactFormSchema),
    });

    const onSubmit = async (data: ContactFormInputs) => {
        // Check honeypot field; abort if it has any value
        if (data.phone) {
            console.warn("Bot submission detected");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/contact/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) throw new Error("Failed to send message");
            reset();
            alert("Message sent successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to send message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
            <div className="mt-5 space-y-2">
                <label htmlFor="name" className="uppercase text-sm mb-2">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    className="w-full border px-3 py-2 bg-transparent text-primary focus:outline-none focus:border-accent transition duration-300"
                    {...register("name")}
                    disabled={isSubmitting}
                />
                {errors.name && (
                    <p className="text-destructive text-sm">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="mt-5 space-y-2">
                <label htmlFor="email" className="uppercase text-sm mb-1">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full border px-3 py-2 bg-transparent text-primary focus:outline-none focus:border-accent transition duration-300"
                    {...register("email")}
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <p className="text-destructive text-sm">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="mt-5 space-y-2">
                <label htmlFor="message" className="uppercase text-sm mb-1">
                    Message
                </label>
                <textarea
                    id="message"
                    className="w-full border px-3 py-2 bg-transparent text-primary focus:outline-none focus:border-accent transition duration-300"
                    {...register("message")}
                    disabled={isSubmitting}
                />
                {errors.message && (
                    <p className="text-destructive text-sm">
                        {errors.message.message}
                    </p>
                )}
            </div>

            {/* Honeypot field */}
            <div style={{ display: "none" }}>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="text" {...register("phone")} />
            </div>

            <div className="flex w-full justify-end items-center">
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <Loader /> : "Send Message"}
                </button>
            </div>
        </form>
    );
}
