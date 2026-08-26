"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckCircle2, Terminal, AlertCircle } from "lucide-react";

// ─── VALIDATION SCHEMAS ──────────────────────────────────────────────────────
const membershipSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  rollNo: z.string().min(4, "Invalid roll number"),
  year: z.string().min(1, "Select your academic year"),
  branch: z.string().min(2, "Branch/Specialization is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  domains: z.array(z.string()).min(1, "Select at least one domain of interest"),
  referral: z.string().min(2, "Please share how you heard about us"),
});

const committeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  rollNo: z.string().min(4, "Invalid roll number"),
  year: z.string().min(1, "Select your academic year"),
  branch: z.string().min(2, "Branch/Specialization is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  position: z.string().min(2, "Preferred position/role is required"),
  reason: z.string().min(15, "Explain in at least 15 characters why you want to join"),
  experience: z.string().min(10, "Explain in at least 10 characters your prior experience"),
});

type MembershipValues = z.infer<typeof membershipSchema>;
type CommitteeValues = z.infer<typeof committeeSchema>;

// ─── FORMS CONTAINER ──────────────────────────────────────────────────────────
export default function Join() {
  const [activeTab, setActiveTab] = useState<"member" | "committee">("member");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Membership Form Hook
  const memberForm = useForm<MembershipValues>({
    resolver: zodResolver(membershipSchema),
    defaultValues: { domains: [], referral: "" },
  });

  // 2. Committee Form Hook
  const committeeForm = useForm<CommitteeValues>({
    resolver: zodResolver(committeeSchema),
    defaultValues: { position: "", reason: "", experience: "" },
  });

  const domainOptions = [
    "Community Events",
    "Workshops",
    "Competitions",
    "Technical Events",
    "Soft-Skills Events",
  ];

  const handleDomainToggle = (domain: string) => {
    const current = [...memberForm.watch("domains")];
    const index = current.indexOf(domain);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(domain);
    }
    memberForm.setValue("domains", current, { shouldValidate: true });
  };

  const onMemberSubmit = async (data: MembershipValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, honeypot: "" }),
      });
      const resData = await response.json();
      if (response.ok) {
        setSubmitSuccess(true);
        memberForm.reset();
      } else {
        setError(resData.error || "Failed to submit membership application.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCommitteeSubmit = async (data: CommitteeValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/committee-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, honeypot: "" }),
      });
      const resData = await response.json();
      if (response.ok) {
        setSubmitSuccess(true);
        committeeForm.reset();
      } else {
        setError(resData.error || "Failed to submit committee application.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1100px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Side Info */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <div className="font-mono text-xs text-mustard-500 uppercase tracking-wider">
                [ Admissions Open ]
              </div>
              <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-text-primary">
                Join the VAMINT Tech Community
              </h1>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Whether you want to participate in events and workshops as a club member, or organize them as part of our core committee, apply below.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="font-mono text-xs font-semibold text-text-tertiary uppercase tracking-wider border-b border-border-subtle/50 pb-2">
                What to expect
              </h3>
              <ul className="space-y-4 font-sans text-sm text-text-secondary">
                <li className="flex gap-2">
                  <span className="text-mustard-500 font-bold">✓</span>
                  <span>Collaborative events, hackathons, and soft-skills debates.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-mustard-500 font-bold">✓</span>
                  <span>A clean learning environment without gatekeeping or AI slop.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-3">
            <div className="flex bg-bg-surface border border-border-subtle p-1 rounded-md w-fit mb-6">
              <button
                onClick={() => {
                  setActiveTab("member");
                  setSubmitSuccess(false);
                  setError(null);
                }}
                className={`px-4 py-1.5 rounded font-sans text-xs font-semibold tracking-wide transition-all ${
                  activeTab === "member"
                    ? "bg-mustard-500/10 text-mustard-500 border border-mustard-500/20"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Club Membership
              </button>
              <button
                onClick={() => {
                  setActiveTab("committee");
                  setSubmitSuccess(false);
                  setError(null);
                }}
                className={`px-4 py-1.5 rounded font-sans text-xs font-semibold tracking-wide transition-all ${
                  activeTab === "committee"
                    ? "bg-mustard-500/10 text-mustard-500 border border-mustard-500/20"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Core Committee
              </button>
            </div>

            <Card className="border border-border-subtle p-8">
              {submitSuccess ? (
                <div className="py-16 text-center space-y-6">
                  <CheckCircle2 className="text-mustard-500 mx-auto" size={56} />
                  <h3 className="font-display font-semibold text-2xl text-text-primary">
                    Application Received
                  </h3>
                  <p className="font-sans text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
                    Thank you for applying. We will review your application details and follow up via email shortly.
                  </p>
                  <Button variant="secondary" onClick={() => setSubmitSuccess(false)}>
                    Submit another response
                  </Button>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-6 p-4 bg-error-500/10 border border-error-500/30 rounded text-error-500 font-mono text-xs flex items-center gap-2">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}

                  {activeTab === "member" ? (
                    /* CLUB MEMBERSHIP FORM */
                    <form onSubmit={memberForm.handleSubmit(onMemberSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            placeholder="Sanjay Kumar"
                            {...memberForm.register("name")}
                          />
                          {memberForm.formState.errors.name && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {memberForm.formState.errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            placeholder="sanjay@college.edu"
                            {...memberForm.register("email")}
                          />
                          {memberForm.formState.errors.email && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {memberForm.formState.errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Roll Number
                          </label>
                          <input
                            type="text"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            placeholder="24CSE0123"
                            {...memberForm.register("rollNo")}
                          />
                          {memberForm.formState.errors.rollNo && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {memberForm.formState.errors.rollNo.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Academic Branch
                          </label>
                          <input
                            type="text"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            placeholder="Computer Science"
                            {...memberForm.register("branch")}
                          />
                          {memberForm.formState.errors.branch && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {memberForm.formState.errors.branch.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Current Year
                          </label>
                          <select
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            {...memberForm.register("year")}
                          >
                            <option value="">Select year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                          </select>
                          {memberForm.formState.errors.year && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {memberForm.formState.errors.year.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            placeholder="9876543210"
                            {...memberForm.register("phone")}
                          />
                          {memberForm.formState.errors.phone && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {memberForm.formState.errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-xs text-text-secondary uppercase mb-2">
                          Preferred Domains
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {domainOptions.map((domain) => {
                            const isSelected = memberForm.watch("domains")?.includes(domain);
                            return (
                              <button
                                key={domain}
                                type="button"
                                onClick={() => handleDomainToggle(domain)}
                                className={`px-3 py-1.5 border rounded font-sans text-xs font-semibold tracking-wide transition-all ${
                                  isSelected
                                    ? "bg-mustard-500/10 border-mustard-500 text-mustard-500"
                                    : "bg-bg-primary border-border-subtle text-text-secondary hover:text-text-primary"
                                }`}
                              >
                                {domain}
                              </button>
                            );
                          })}
                        </div>
                        {memberForm.formState.errors.domains && (
                          <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                            <AlertCircle size={12} />
                            {memberForm.formState.errors.domains.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-xs text-text-secondary uppercase">
                          How did you hear about us?
                        </label>
                        <input
                          type="text"
                          className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                          placeholder="Friend, social media, poster..."
                          {...memberForm.register("referral")}
                        />
                        {memberForm.formState.errors.referral && (
                          <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                            <AlertCircle size={12} />
                            {memberForm.formState.errors.referral.message}
                          </p>
                        )}
                      </div>

                      <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></span>
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Terminal size={16} />
                            Submit Club Membership
                          </span>
                        )}
                      </Button>
                    </form>
                  ) : (
                    /* COMMITTEE APPLICATION FORM */
                    <form onSubmit={committeeForm.handleSubmit(onCommitteeSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            placeholder="Sanjay Kumar"
                            {...committeeForm.register("name")}
                          />
                          {committeeForm.formState.errors.name && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {committeeForm.formState.errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            placeholder="sanjay@college.edu"
                            {...committeeForm.register("email")}
                          />
                          {committeeForm.formState.errors.email && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {committeeForm.formState.errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Roll Number
                          </label>
                          <input
                            type="text"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            placeholder="24CSE0123"
                            {...committeeForm.register("rollNo")}
                          />
                          {committeeForm.formState.errors.rollNo && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {committeeForm.formState.errors.rollNo.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Academic Branch
                          </label>
                          <input
                            type="text"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            placeholder="Computer Science"
                            {...committeeForm.register("branch")}
                          />
                          {committeeForm.formState.errors.branch && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {committeeForm.formState.errors.branch.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Current Year
                          </label>
                          <select
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            {...committeeForm.register("year")}
                          >
                            <option value="">Select year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                          </select>
                          {committeeForm.formState.errors.year && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {committeeForm.formState.errors.year.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            placeholder="9876543210"
                            {...committeeForm.register("phone")}
                          />
                          {committeeForm.formState.errors.phone && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {committeeForm.formState.errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-xs text-text-secondary uppercase">
                          Preferred Core Committee Position
                        </label>
                        <select
                          className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                          {...committeeForm.register("position")}
                        >
                          <option value="">Select a role</option>
                          <option value="Technical Team Member">Technical Team Member</option>
                          <option value="Event Coordinator">Event Coordinator</option>
                          <option value="Social Media Manager">Social Media Manager</option>
                          <option value="Design Lead">Design Lead</option>
                        </select>
                        {committeeForm.formState.errors.position && (
                          <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                            <AlertCircle size={12} />
                            {committeeForm.formState.errors.position.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-xs text-text-secondary uppercase">
                          Why do you want to join the Core Committee?
                        </label>
                        <textarea
                          rows={4}
                          className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors resize-none font-sans"
                          placeholder="Tell us what drives you and how you plan to contribute to organizing VAMINT..."
                          {...committeeForm.register("reason")}
                        />
                        {committeeForm.formState.errors.reason && (
                          <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                            <AlertCircle size={12} />
                            {committeeForm.formState.errors.reason.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-xs text-text-secondary uppercase">
                          Relevant prior experience (coding, managing, designing, etc.)
                        </label>
                        <textarea
                          rows={4}
                          className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors resize-none font-sans"
                          placeholder="Highlight past projects, leadership experience, or previous event work..."
                          {...committeeForm.register("experience")}
                        />
                        {committeeForm.formState.errors.experience && (
                          <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                            <AlertCircle size={12} />
                            {committeeForm.formState.errors.experience.message}
                          </p>
                        )}
                      </div>

                      <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></span>
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Terminal size={16} />
                            Submit Committee Application
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
