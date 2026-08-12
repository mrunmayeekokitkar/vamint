"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Terminal, AlertCircle } from "lucide-react";

const joinSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  rollNo: z.string().min(4, "Invalid roll number"),
  year: z.string().min(1, "Select your academic year"),
  branch: z.string().min(2, "Branch/Specialization is required"),
  domains: z.array(z.string()).min(1, "Select at least one domain of interest"),
  reason: z.string().min(15, "Describe why in at least 15 characters"),
  github: z.string().url("Must be a valid URL").or(z.literal("")),
});

type JoinFormValues = z.infer<typeof joinSchema>;

export default function Join() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<JoinFormValues>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      domains: [],
      github: "",
    },
  });

  const selectedDomains = watch("domains");

  const handleDomainToggle = (domain: string) => {
    const current = [...selectedDomains];
    const index = current.indexOf(domain);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(domain);
    }
    setValue("domains", current, { shouldValidate: true });
  };

  const onSubmit = async (data: JoinFormValues) => {
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
  };

  const domainOptions = ["Web Dev", "AI/ML", "Competitive Programming", "Cybersecurity"];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1100px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          
          {/* Why Join & Info */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <div className="font-mono text-xs text-mint-500 uppercase tracking-wider">
                [ Recruitment Drive ]
              </div>
              <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-text-primary">
                Join VAMINT
              </h1>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                We recruit builders who care about modular logic and compiler output. Here is our setup.
              </p>
            </div>

            {/* How it works */}
            <div className="space-y-6">
              <h3 className="font-mono text-xs font-semibold text-text-tertiary uppercase tracking-wider border-b border-border-subtle/50 pb-2">
                Recruitment Flow
              </h3>
              <ol className="space-y-4 font-sans text-sm">
                <li className="flex gap-4">
                  <span className="font-mono text-mint-500 font-bold">01.</span>
                  <div>
                    <h4 className="font-display font-semibold text-text-primary text-sm">Online Application</h4>
                    <p className="text-text-secondary text-xs mt-1">Submit your profile, branch, and preferred compile interests.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-mint-500 font-bold">02.</span>
                  <div>
                    <h4 className="font-display font-semibold text-text-primary text-sm">Practical Sprint</h4>
                    <p className="text-text-secondary text-xs mt-1">Complete a short, offline logical code challenge or UI assembly.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-mint-500 font-bold">03.</span>
                  <div>
                    <h4 className="font-display font-semibold text-text-primary text-sm">Interview conversational</h4>
                    <p className="text-text-secondary text-xs mt-1">Talk to execution leads about compiler optimization and team roles.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-3">
            <Card className="border border-border-subtle p-8">
              {submitSuccess ? (
                <div className="py-16 text-center space-y-6">
                  <CheckCircle2 className="text-mint-500 mx-auto" size={56} />
                  <h3 className="font-display font-semibold text-2xl text-text-primary">
                    Application queued
                  </h3>
                  <p className="font-sans text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
                    Your details have been successfully compiled in our registry database. We will review profiles and dispatch the Logical task invitations by the end of the week.
                  </p>
                  <Button variant="secondary" onClick={() => setSubmitSuccess(false)}>
                    Submit another application
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Row: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-text-secondary uppercase">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mint-500 focus:outline-none transition-colors"
                        placeholder="Sanjay Kumar"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-text-secondary uppercase">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mint-500 focus:outline-none transition-colors"
                        placeholder="sanjay@college.edu"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row: Roll No & Branch */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-text-secondary uppercase">
                        Roll Number / College ID
                      </label>
                      <input
                        type="text"
                        className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mint-500 focus:outline-none transition-colors"
                        placeholder="24CSE0123"
                        {...register("rollNo")}
                      />
                      {errors.rollNo && (
                        <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} />
                          {errors.rollNo.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-text-secondary uppercase">
                        Academic Branch
                      </label>
                      <input
                        type="text"
                        className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mint-500 focus:outline-none transition-colors"
                        placeholder="Computer Science & Eng"
                        {...register("branch")}
                      />
                      {errors.branch && (
                        <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} />
                          {errors.branch.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Dropdown: Year */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-text-secondary uppercase">
                      Current Year
                    </label>
                    <select
                      className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 text-sm text-text-primary focus:border-mint-500 focus:outline-none transition-colors"
                      {...register("year")}
                    >
                      <option value="">Select academic year</option>
                      <option value="1">1st Year (Freshman)</option>
                      <option value="2">2nd Year (Sophomore)</option>
                      <option value="3">3rd Year (Junior)</option>
                      <option value="4">4th Year (Senior)</option>
                    </select>
                    {errors.year && (
                      <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        {errors.year.message}
                      </p>
                    )}
                  </div>

                  {/* Multi-select: Domains */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-text-secondary uppercase mb-2">
                      Preferred Domains (Select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {domainOptions.map((domain) => {
                        const isSelected = selectedDomains.includes(domain);
                        return (
                          <button
                            key={domain}
                            type="button"
                            onClick={() => handleDomainToggle(domain)}
                            className={`px-3 py-1.5 border rounded font-sans text-xs font-semibold tracking-wide transition-all ${
                              isSelected
                                ? "bg-mint-500/10 border-mint-500 text-mint-500"
                                : "bg-bg-primary border-border-subtle text-text-secondary hover:text-text-primary"
                            }`}
                          >
                            {domain}
                          </button>
                        );
                      })}
                    </div>
                    {errors.domains && (
                      <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        {errors.domains.message}
                      </p>
                    )}
                  </div>

                  {/* Github Link */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-text-secondary uppercase">
                      GitHub / Portfolio Link (Optional)
                    </label>
                    <input
                      type="text"
                      className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mint-500 focus:outline-none transition-colors"
                      placeholder="https://github.com/username"
                      {...register("github")}
                    />
                    {errors.github && (
                      <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        {errors.github.message}
                      </p>
                    )}
                  </div>

                  {/* Why join statement */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-text-secondary uppercase">
                      Why do you want to compile with VAMINT?
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mint-500 focus:outline-none transition-colors resize-none"
                      placeholder="Share your interests or projects you've compiled..."
                      {...register("reason")}
                    />
                    {errors.reason && (
                      <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        {errors.reason.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></span>
                        Compiling profile...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Terminal size={16} />
                        Submit Application
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
