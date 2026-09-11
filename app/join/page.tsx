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

// ─── PREFERRED AREAS OPTIONS ────────────────────────────────────────────────
const PREFERRED_AREAS = [
  "Documentation",
  "Events & Operations",
  "Technical Team",
  "PR & Social Media",
  "Design & Creative",
];

const DEPARTMENTS = [
  "First Year Engineering",
  "Computer Engineering",
  "Information Technology",
  "Artificial Intelligence & Data Science",
  "Artificial Intelligence & Machine Learning",
  "Electronics & Telecommunication",
  "Mechanical Engineering",
  "Civil Engineering",
  "BCA",
  "MCA",
  "MBA",
];

// ─── VALIDATION SCHEMAS ──────────────────────────────────────────────────────
const membershipSchema = z.object({
  name: z.string().trim().min(1, "Full Name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email ID is required")
    .email("Invalid email format")
    .refine((val) => val.toLowerCase().endsWith("@gmail.com"), {
      message: "Email must be a valid @gmail.com address",
    }),
  phone: z
    .string()
    .trim()
    .min(1, "Contact Number is required")
    .regex(/^\d{10}$/, "Contact Number must be exactly 10 digits"),
  year: z.string().trim().min(1, "Select your academic year"),
  department: z.string().trim().min(1, "Select your department"),
});

const committeeSchema = z.object({
  name: z.string().trim().min(1, "Full Name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email ID is required")
    .email("Invalid email format")
    .refine((val) => val.toLowerCase().endsWith("@gmail.com"), {
      message: "Email must be a valid @gmail.com address",
    }),
  phone: z
    .string()
    .trim()
    .min(1, "Contact Number is required")
    .regex(/^\d{10}$/, "Contact Number must be exactly 10 digits"),
  year: z.string().trim().min(1, "Select your academic year"),
  department: z.string().trim().min(1, "Select your department"),
  preferredArea: z
    .array(z.string())
    .min(1, "Select at least one preferred area"),
  experience: z.string().trim().min(1, "Past experience is required"),
});

type MembershipValues = z.infer<typeof membershipSchema>;
type CommitteeValues = z.infer<typeof committeeSchema>;

// ─── FORMS CONTAINER ──────────────────────────────────────────────────────────
export default function Join() {
  const [activeTab, setActiveTab] = useState<"member" | "committee">("member");
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedForm, setSubmittedForm] = useState<
    "member" | "committee" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  // 1. Membership Form Hook
  const memberForm = useForm<MembershipValues>({
    resolver: zodResolver(membershipSchema),
    defaultValues: { name: "", email: "", phone: "", year: "", department: "" },
  });

  // 2. Committee Form Hook
  const committeeForm = useForm<CommitteeValues>({
    resolver: zodResolver(committeeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      year: "",
      department: "",
      preferredArea: [],
      experience: "",
    },
  });

  const handleSelectRole = (role: "member" | "committee") => {
    setActiveTab(role);
    setShowForm(true);
    setSubmittedForm(null);
    setError(null);
    setTimeout(() => {
      document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const onMemberSubmit = async (data: MembershipValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, honeypot: "" }),
      });
      const resData = await response.json();
      if (response.ok) {
        setSubmittedForm("member");
        memberForm.reset();
      } else {
        setError(resData.error || "Failed to submit membership application.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCommitteeSubmit = async (data: CommitteeValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/committee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, honeypot: "" }),
      });
      const resData = await response.json();
      if (response.ok) {
        setSubmittedForm("committee");
        committeeForm.reset();
      } else {
        setError(resData.error || "Failed to submit committee application.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-4xl mx-auto px-6 w-full space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="font-mono text-xs text-mustard-500 uppercase tracking-wider">
            [ Admissions Open ]
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-text-primary">
            Join the VAMINT Community
          </h1>
          <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">
            VAMINT is open to all students at GSMCOE, regardless of branch, year, or experience level. Select an application type below to get started.
          </p>
        </div>

        {/* Two Column Clickable Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Card 1: Club Member */}
          <div
            className="rounded-xl border p-6 md:p-8 flex flex-col justify-between bg-bg-surface border-border-subtle"
          >
            <div className="space-y-3">
              <h2 className="font-display font-semibold text-2xl text-text-primary">
                Club Member
              </h2>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Join the Vamint Community, receive updates, and participate in activities
              </p>
            </div>

            <div className="pt-8">
              <Button
                type="button"
                onClick={() => handleSelectRole("member")}
                variant="secondary"
                className="w-full"
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Card 2: Committee Member */}
          <div
            className="rounded-xl border p-6 md:p-8 flex flex-col justify-between bg-bg-surface border-border-subtle"
          >
            <div className="space-y-3">
              <h2 className="font-display font-semibold text-2xl text-text-primary">
                Committee Member
              </h2>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Join the Vamint Team, take up responsibilities and help organize the events
              </p>
            </div>

            <div className="pt-8">
              <Button
                type="button"
                onClick={() => handleSelectRole("committee")}
                variant="secondary"
                className="w-full"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        {/* Application Form Section - only shown after clicking Apply */}
        {showForm && (
        <div id="application-form" className="scroll-mt-28">
          <Card className="border border-border-subtle p-6 md:p-10">
            <div className="mb-8 border-b border-border-subtle pb-4">
              <div className="font-mono text-xs text-mustard-500 uppercase tracking-wider mb-1">
                [ Application Form ]
              </div>
              <h3 className="font-display font-semibold text-2xl text-text-primary">
                {activeTab === "member" ? "Club Member Application" : "Committee Member Application"}
              </h3>
            </div>

            {submittedForm ? (
              <div className="py-16 text-center space-y-6">
                <CheckCircle2
                  className="text-mustard-500 mx-auto"
                  size={56}
                />
                <h3 className="font-display font-semibold text-2xl text-text-primary">
                  Application Received
                </h3>
                {submittedForm === "member" ? (
                  <div className="space-y-4">
                    <p className="font-sans text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
                      Thanks for applying! Join our WhatsApp group to stay
                      updated on announcements and upcoming events:
                    </p>
                    <div className="py-2">
                      <a
                        href="https://chat.whatsapp.com/DmOn3n5ArSe5VdMr5QXqkh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-sm font-semibold rounded transition-colors"
                      >
                        Join WhatsApp Group
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="font-sans text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
                      Thanks for applying! Join our committee WhatsApp group to stay updated on announcements and next steps:
                    </p>
                    <div className="py-2">
                      <a
                        href="https://chat.whatsapp.com/LJjqfPW3Umd4dJ7cQR175x?s=sh&p=a&mlu=4&ilr=4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-sm font-semibold rounded transition-colors"
                      >
                        Join Committee WhatsApp Group
                      </a>
                    </div>
                  </div>
                )}
                <Button
                  variant="secondary"
                  onClick={() => setSubmittedForm(null)}
                >
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
                  /* CLUB MEMBER FORM */
                  <form
                    onSubmit={memberForm.handleSubmit(onMemberSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-xs text-text-secondary uppercase">
                          Full Name
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
                          Email ID
                        </label>
                        <input
                          type="email"
                          className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                          placeholder="sanjay@gmail.com"
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
                          Contact Number
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

                      <div className="space-y-2">
                        <label className="block font-mono text-xs text-text-secondary uppercase">
                          Academic Year
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
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-text-secondary uppercase">
                        Department
                      </label>
                      <select
                        className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                        {...memberForm.register("department")}
                      >
                        <option value="">Select department</option>
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                      {memberForm.formState.errors.department && (
                        <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} />
                          {memberForm.formState.errors.department.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></span>
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Terminal size={16} />
                          Submit Application
                        </span>
                      )}
                    </Button>
                  </form>
                ) : (
                  /* COMMITTEE MEMBER FORM */
                  <form
                    onSubmit={committeeForm.handleSubmit(onCommitteeSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block font-mono text-xs text-text-secondary uppercase">
                          Full Name
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
                          Email ID
                        </label>
                        <input
                          type="email"
                          className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                          placeholder="sanjay@gmail.com"
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
                          Contact Number
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

                      <div className="space-y-2">
                        <label className="block font-mono text-xs text-text-secondary uppercase">
                          Academic Year
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
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-text-secondary uppercase">
                        Department
                      </label>
                      <select
                        className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                        {...committeeForm.register("department")}
                      >
                        <option value="">Select department</option>
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                      {committeeForm.formState.errors.department && (
                        <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} />
                          {
                            committeeForm.formState.errors.department
                              .message
                          }
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-text-secondary uppercase">
                        Preferred area to work with
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {PREFERRED_AREAS.map((area) => {
                          const currentSelected: string[] =
                            committeeForm.watch("preferredArea") || [];
                          const isSelected = currentSelected.includes(area);
                          return (
                            <button
                              key={area}
                              type="button"
                              onClick={() => {
                                const updated = isSelected
                                  ? currentSelected.filter(
                                      (item) => item !== area,
                                    )
                                  : [...currentSelected, area];
                                committeeForm.setValue(
                                  "preferredArea",
                                  updated,
                                  { shouldValidate: true },
                                );
                              }}
                              className={`flex items-center justify-between p-3.5 rounded-lg border text-left font-sans text-sm transition-all duration-200 ${
                                isSelected
                                  ? "bg-mustard-500/10 border-mustard-500 text-mustard-500 font-medium shadow-sm"
                                  : "bg-bg-primary border-border-subtle text-text-secondary hover:border-mustard-500/40 hover:text-text-primary"
                              }`}
                            >
                              <span>{area}</span>
                              {isSelected && (
                                <CheckCircle2
                                  size={16}
                                  className="text-mustard-500 shrink-0 ml-2"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      {committeeForm.formState.errors.preferredArea && (
                        <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} />
                          {
                            committeeForm.formState.errors.preferredArea
                              .message
                          }
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-text-secondary uppercase">
                        Past experience (if any)
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

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></span>
                          Submitting...
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
              </>
            )}
          </Card>
        </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
