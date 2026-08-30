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
  name: z.string().trim().min(1, "Full Name is required"),
  email: z.string().trim().email("Invalid email format"),
  phone: z.string().trim().regex(/^\d{10}$/, "Contact Number must be exactly 10 digits"),
  year: z.string().trim().min(1, "Select your academic year"),
  department: z.string().trim().min(1, "Select your department"),
});

const committeeSchema = z.object({
  name: z.string().trim().min(1, "Full Name is required"),
  email: z.string().trim().email("Invalid email format"),
  phone: z.string().trim().regex(/^\d{10}$/, "Contact Number must be exactly 10 digits"),
  year: z.string().trim().min(1, "Select your academic year"),
  department: z.string().trim().min(1, "Select your department"),
  preferredArea: z.string().trim().min(1, "Preferred area is required"),
  reason: z.string().trim().min(1, "Why do you want to join is required"),
  experience: z.string().trim().min(1, "Past experience is required"),
});

type MembershipValues = z.infer<typeof membershipSchema>;
type CommitteeValues = z.infer<typeof committeeSchema>;

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

// ─── FORMS CONTAINER ──────────────────────────────────────────────────────────
export default function Join() {
  const [activeTab, setActiveTab] = useState<"member" | "committee">("member");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedForm, setSubmittedForm] = useState<"member" | "committee" | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 1. Membership Form Hook
  const memberForm = useForm<MembershipValues>({
    resolver: zodResolver(membershipSchema),
    defaultValues: { name: "", email: "", phone: "", year: "", department: "" },
  });

  // 2. Committee Form Hook
  const committeeForm = useForm<CommitteeValues>({
    resolver: zodResolver(committeeSchema),
    defaultValues: { name: "", email: "", phone: "", year: "", department: "", preferredArea: "", reason: "", experience: "" },
  });

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
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="font-mono text-xs text-mustard-500 uppercase tracking-wider">
                [ Admissions Open ]
              </div>
              <h1 className="font-display font-semibold text-4xl md:text-5xl tracking-tight text-text-primary">
                Join the VAMINT Community
              </h1>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                VAMINT is open to all students at GSMCOE, regardless of branch, year, or experience level. Whether you want to show up to events and learn alongside others, or get more involved and help run things, there&apos;s a place for you here.
              </p>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Club Members get access to all our events, workshops, and community activities. Committee Members take an active role in planning and organizing, working directly with the core team to make things happen. Pick the one that fits where you&apos;re at right now.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-3">
            <div className="flex bg-bg-surface border border-border-subtle p-1 rounded-md w-fit mb-6">
              <button
                onClick={() => {
                  setActiveTab("member");
                  setSubmittedForm(null);
                  setError(null);
                }}
                className={`px-4 py-1.5 rounded font-sans text-xs font-semibold tracking-wide transition-all ${
                  activeTab === "member"
                    ? "bg-mustard-500/10 text-mustard-500 border border-mustard-500/20"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Club Member
              </button>
              <button
                onClick={() => {
                  setActiveTab("committee");
                  setSubmittedForm(null);
                  setError(null);
                }}
                className={`px-4 py-1.5 rounded font-sans text-xs font-semibold tracking-wide transition-all ${
                  activeTab === "committee"
                    ? "bg-mustard-500/10 text-mustard-500 border border-mustard-500/20"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Committee Member
              </button>
            </div>

            <Card className="border border-border-subtle p-5 md:p-8">
              {submittedForm ? (
                <div className="py-16 text-center space-y-6">
                  <CheckCircle2 className="text-mustard-500 mx-auto" size={56} />
                  <h3 className="font-display font-semibold text-2xl text-text-primary">
                    Application Received
                  </h3>
                  {submittedForm === "member" ? (
                    <div className="space-y-4">
                      <p className="font-sans text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
                        Thanks for applying! Join our WhatsApp group to stay updated on announcements and upcoming events:
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
                    <p className="font-sans text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
                      Thanks for applying. We&apos;ll review your application and be in touch soon.
                    </p>
                  )}
                  <Button variant="secondary" onClick={() => setSubmittedForm(null)}>
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
                    <form onSubmit={memberForm.handleSubmit(onMemberSubmit)} className="space-y-6">
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

                      <Button type="submit" disabled={isSubmitting} className="w-full">
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
                    <form onSubmit={committeeForm.handleSubmit(onCommitteeSubmit)} className="space-y-6">
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                              {committeeForm.formState.errors.department.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block font-mono text-xs text-text-secondary uppercase">
                            Preferred area to work with
                          </label>
                          {/* Flag: Meaning of Options 1-6 is not specified, left TODO comments for the club to fill in */}
                          <select
                            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                            {...committeeForm.register("preferredArea")}
                          >
                            <option value="">Select an area</option>
                            <option value="Option 1">Option 1 (TODO: Club to define preferred area 1)</option>
                            <option value="Option 2">Option 2 (TODO: Club to define preferred area 2)</option>
                            <option value="Option 3">Option 3 (TODO: Club to define preferred area 3)</option>
                            <option value="Option 4">Option 4 (TODO: Club to define preferred area 4)</option>
                            <option value="Option 5">Option 5 (TODO: Club to define preferred area 5)</option>
                            <option value="Option 6">Option 6 (TODO: Club to define preferred area 6)</option>
                          </select>
                          {committeeForm.formState.errors.preferredArea && (
                            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
                              <AlertCircle size={12} />
                              {committeeForm.formState.errors.preferredArea.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-mono text-xs text-text-secondary uppercase">
                          Why do you want to join?
                        </label>
                        <textarea
                          rows={4}
                          className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors resize-none font-sans"
                          placeholder="Tell us what drives you and how you plan to contribute to VAMINT..."
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
                          Past experience
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
