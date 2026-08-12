"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call to Formspree/EmailJS
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1000px] mx-auto px-6 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-mint-500 uppercase tracking-wider mb-3">
            [ Endpoint ]
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-text-primary mb-6">
            Contact VAMINT
          </h1>
          <p className="font-sans text-text-secondary text-base">
            Reach out regarding campus partnerships, event collaborations, media inquiries, or technical support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Form */}
          <div className="md:col-span-3">
            <Card className="border border-border-subtle">
              {submitSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="text-mint-500 mx-auto" size={48} />
                  <h3 className="font-display font-semibold text-xl text-text-primary">
                    Transmission complete
                  </h3>
                  <p className="font-sans text-sm text-text-secondary max-w-sm mx-auto">
                    Your message has been processed successfully. The technical team will review and reply shortly.
                  </p>
                  <Button variant="secondary" onClick={() => setSubmitSuccess(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-mono text-xs text-text-secondary uppercase">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 font-sans text-sm text-text-primary focus:border-mint-500 focus:outline-none transition-colors placeholder:text-text-tertiary"
                      placeholder="Jane Doe"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-mono text-xs text-text-secondary uppercase">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 font-sans text-sm text-text-primary focus:border-mint-500 focus:outline-none transition-colors placeholder:text-text-tertiary"
                      placeholder="jane.doe@college.edu"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block font-mono text-xs text-text-secondary uppercase">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 font-sans text-sm text-text-primary focus:border-mint-500 focus:outline-none transition-colors placeholder:text-text-tertiary"
                      placeholder="Partnership proposal"
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block font-mono text-xs text-text-secondary uppercase">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 font-sans text-sm text-text-primary focus:border-mint-500 focus:outline-none transition-colors placeholder:text-text-tertiary resize-none"
                      placeholder="Describe your inquiry in detail..."
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></span>
                        Transmitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={16} />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-8 font-sans">
            <div>
              <h3 className="font-mono text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">
                Primary Contact
              </h3>
              <p className="text-text-primary text-base">
                hello@vamint.club
              </p>
            </div>

            <div>
              <h3 className="font-mono text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">
                Office Hours
              </h3>
              <p className="text-text-secondary text-sm">
                Wednesdays & Fridays<br />
                04:00 PM — 06:00 PM
              </p>
            </div>

            <div>
              <h3 className="font-mono text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">
                Lab Location
              </h3>
              <p className="text-text-secondary text-sm">
                Lab 4, CSE Wing (3rd Floor)<br />
                Information Technology Block<br />
                College Campus
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
