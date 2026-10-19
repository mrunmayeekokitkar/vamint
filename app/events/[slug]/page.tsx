"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import {
  Calendar,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Users,
  Trophy,
  Sparkles,
  AlertCircle,
  Terminal,
  Upload,
  X,
  UserPlus,
  UserMinus,
  IndianRupee,
  BrainCircuit,
  Laptop,
} from "lucide-react";

// ─── GENERIC RSVP FORM VALIDATION ────────────────────────────────

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  rollNo: z.string().min(4, "Invalid roll number"),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

// ─── PITCH PERFECT FORM VALIDATION ──────────────────────────────

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

const participantSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format")
    .refine((val) => val.toLowerCase().endsWith("@gmail.com"), {
      message: "Email must be a valid @gmail.com address",
    }),
  phone: z
    .string()
    .trim()
    .min(1, "Contact number is required")
    .regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
  college: z.string().trim().min(1, "College name is required"),
  department: z.string().trim().min(1, "Department is required"),
  year: z.string().trim().min(1, "Year is required"),
});

type ParticipantValues = z.infer<typeof participantSchema>;

// ─── PITCH PERFECT REGISTRATION FORM ────────────────────────────

function PitchPerfectForm() {
  const [teamSize, setTeamSize] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [teamNameError, setTeamNameError] = useState("");
  const [participants, setParticipants] = useState<ParticipantValues[]>([
    { name: "", email: "", phone: "", college: "", department: "", year: "" },
  ]);
  const [participantErrors, setParticipantErrors] = useState<
    Record<string, string>[]
  >([{}]);
  const [paymentScreenshot, setPaymentScreenshot] = useState<string>("");
  const [paymentFileName, setPaymentFileName] = useState<string>("");
  const [paymentError, setPaymentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalFee = teamSize * 50;

  const addParticipant = () => {
    if (teamSize >= 3) return;
    setTeamSize((prev) => prev + 1);
    setParticipants((prev) => [
      ...prev,
      { name: "", email: "", phone: "", college: "", department: "", year: "" },
    ]);
    setParticipantErrors((prev) => [...prev, {}]);
  };

  const removeParticipant = () => {
    if (teamSize <= 1) return;
    setTeamSize((prev) => prev - 1);
    setParticipants((prev) => prev.slice(0, -1));
    setParticipantErrors((prev) => prev.slice(0, -1));
  };

  const updateParticipant = (
    index: number,
    field: keyof ParticipantValues,
    value: string,
  ) => {
    setParticipants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    // Clear error on change
    setParticipantErrors((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], [field]: "" };
      }
      return updated;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setPaymentError("Please upload an image file (JPG, PNG, or WebP)");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setPaymentError("File size must be less than 5MB");
      return;
    }

    setPaymentError("");
    setPaymentFileName(file.name);

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setPaymentScreenshot(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setPaymentScreenshot("");
    setPaymentFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate team name
    if (!teamName.trim()) {
      setTeamNameError("Team name is required");
      isValid = false;
    } else {
      setTeamNameError("");
    }

    // Validate each participant
    const newErrors: Record<string, string>[] = [];
    for (let i = 0; i < teamSize; i++) {
      const p = participants[i];
      const errors: Record<string, string> = {};

      if (!p.name.trim()) {
        errors.name = "Name is required";
        isValid = false;
      }

      if (!p.email.trim()) {
        errors.email = "Email is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
        errors.email = "Invalid email format";
        isValid = false;
      } else if (!p.email.toLowerCase().endsWith("@gmail.com")) {
        errors.email = "Email must be a valid @gmail.com address";
        isValid = false;
      }

      if (!p.phone.trim()) {
        errors.phone = "Contact number is required";
        isValid = false;
      } else if (!/^\d{10}$/.test(p.phone)) {
        errors.phone = "Contact number must be exactly 10 digits";
        isValid = false;
      }

      if (!p.college.trim()) {
        errors.college = "College name is required";
        isValid = false;
      }

      if (!p.department.trim()) {
        errors.department = "Department is required";
        isValid = false;
      }

      if (!p.year.trim()) {
        errors.year = "Year is required";
        isValid = false;
      }

      newErrors.push(errors);
    }
    setParticipantErrors(newErrors);

    // Validate payment
    if (!paymentScreenshot) {
      setPaymentError("Payment screenshot is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload: Record<string, unknown> = {
        teamName,
        teamSize,
        participant1: participants[0],
        paymentScreenshot,
        honeypot: "",
      };

      if (teamSize >= 2 && participants[1]) {
        payload.participant2 = participants[1];
      }
      if (teamSize >= 3 && participants[2]) {
        payload.participant3 = participants[2];
      }

      const response = await fetch("/api/pitch-perfect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(
          data.error || "Failed to submit registration. Please try again.",
        );
      }
    } catch {
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTeamSize(1);
    setTeamName("");
    setTeamNameError("");
    setParticipants([
      { name: "", email: "", phone: "", college: "", department: "", year: "" },
    ]);
    setParticipantErrors([{}]);
    setPaymentScreenshot("");
    setPaymentFileName("");
    setPaymentError("");
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  // ─── SUCCESS STATE ────────────────────────────────────────────
  if (submitSuccess) {
    return (
      <Card className="border border-border-subtle p-6 md:p-10">
        <div className="py-16 text-center space-y-6">
          <CheckCircle2 className="text-mustard-500 mx-auto" size={56} />
          <h3 className="font-display font-semibold text-2xl text-text-primary">
            Registration Successful!
          </h3>
          <p className="font-sans text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
            Your team has been registered for Pitch Perfect. We&apos;ll verify
            your payment and send a confirmation to the registered email
            addresses.
          </p>
          <Button variant="secondary" onClick={resetForm}>
            Submit another registration
          </Button>
        </div>
      </Card>
    );
  }

  // ─── FORM ─────────────────────────────────────────────────────
  return (
    <Card className="border border-border-subtle p-6 md:p-10">
      <div className="mb-8 border-b border-border-subtle pb-4">
        <div className="font-mono text-xs text-mustard-500 uppercase tracking-wider mb-1">
          [ Registration Form ]
        </div>
        <h3 className="font-display font-semibold text-2xl text-text-primary">
          Pitch Perfect — Team Registration
        </h3>
      </div>

      {submitError && (
        <div className="mb-6 p-4 bg-error-500/10 border border-error-500/30 rounded text-error-500 font-mono text-xs flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ─── TEAM NAME ──────────────────────────────────── */}
        <div className="space-y-2">
          <label className="block font-mono text-xs text-text-secondary uppercase">
            Team Name <span className="text-error-500">*</span>
          </label>
          <input
            type="text"
            className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
            placeholder="Enter your team name"
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
              if (e.target.value.trim()) setTeamNameError("");
            }}
          />
          {teamNameError && (
            <p className="font-mono text-xs text-error-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {teamNameError}
            </p>
          )}
        </div>

        {/* ─── TEAM SIZE CONTROLS ─────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-mono text-xs text-text-secondary uppercase">
              Team Members ({teamSize}/3)
            </label>
            <div className="flex items-center gap-2">
              {teamSize > 1 && (
                <button
                  type="button"
                  onClick={removeParticipant}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-error-500/10 border border-error-500/30 rounded text-error-500 font-mono text-xs hover:bg-error-500/20 transition-colors"
                >
                  <UserMinus size={14} />
                  Remove
                </button>
              )}
              {teamSize < 3 && (
                <button
                  type="button"
                  onClick={addParticipant}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-mustard-500/10 border border-mustard-500/30 rounded text-mustard-500 font-mono text-xs hover:bg-mustard-500/20 transition-colors"
                >
                  <UserPlus size={14} />
                  Add Member
                </button>
              )}
            </div>
          </div>

          <div className="p-3 bg-bg-surface rounded border border-border-subtle">
            <p className="font-sans text-xs text-text-secondary">
              <span className="text-mustard-500 font-semibold">Note:</span>{" "}
              Team size must be 1–3 members. Registration fee is{" "}
              <span className="text-mustard-500 font-semibold">
                ₹50 per person
              </span>
              . Your total:{" "}
              <span className="text-mustard-500 font-semibold">₹{totalFee}</span>
            </p>
          </div>
        </div>

        {/* ─── PARTICIPANTS ────────────────────────────────── */}
        {participants.slice(0, teamSize).map((participant, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border-subtle/50">
              <Users size={16} className="text-mustard-500" />
              <h4 className="font-display font-semibold text-sm text-text-primary">
                Participant {index + 1} Details
              </h4>
              {index === 0 && (
                <span className="text-xs font-mono text-text-tertiary ml-auto">
                  (Team Lead)
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-text-secondary uppercase">
                  Full Name <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                  placeholder="Enter full name"
                  value={participant.name}
                  onChange={(e) =>
                    updateParticipant(index, "name", e.target.value)
                  }
                />
                {participantErrors[index]?.name && (
                  <p className="font-mono text-xs text-error-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {participantErrors[index].name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-text-secondary uppercase">
                  Email ID <span className="text-error-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                  placeholder="example@gmail.com"
                  value={participant.email}
                  onChange={(e) =>
                    updateParticipant(index, "email", e.target.value)
                  }
                />
                {participantErrors[index]?.email && (
                  <p className="font-mono text-xs text-error-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {participantErrors[index].email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-text-secondary uppercase">
                  Contact Number <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                  placeholder="9876543210"
                  value={participant.phone}
                  onChange={(e) => {
                    // Only allow digits
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    updateParticipant(index, "phone", val);
                  }}
                />
                {participantErrors[index]?.phone && (
                  <p className="font-mono text-xs text-error-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {participantErrors[index].phone}
                  </p>
                )}
              </div>

              {/* College Name */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-text-secondary uppercase">
                  College Name <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                  placeholder="e.g. GSMCOE, Balewadi"
                  value={participant.college}
                  onChange={(e) =>
                    updateParticipant(index, "college", e.target.value)
                  }
                />
                {participantErrors[index]?.college && (
                  <p className="font-mono text-xs text-error-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {participantErrors[index].college}
                  </p>
                )}
              </div>

              {/* Department */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-text-secondary uppercase">
                  Department <span className="text-error-500">*</span>
                </label>
                <select
                  className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                  value={participant.department}
                  onChange={(e) =>
                    updateParticipant(index, "department", e.target.value)
                  }
                >
                  <option value="">Select department</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {participantErrors[index]?.department && (
                  <p className="font-mono text-xs text-error-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {participantErrors[index].department}
                  </p>
                )}
              </div>

              {/* Year */}
              <div className="space-y-1.5">
                <label className="block font-mono text-xs text-text-secondary uppercase">
                  Academic Year <span className="text-error-500">*</span>
                </label>
                <select
                  className="w-full bg-bg-primary border border-border-subtle rounded px-4 py-2.5 text-sm text-text-primary focus:border-mustard-500 focus:outline-none transition-colors"
                  value={participant.year}
                  onChange={(e) =>
                    updateParticipant(index, "year", e.target.value)
                  }
                >
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
                {participantErrors[index]?.year && (
                  <p className="font-mono text-xs text-error-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {participantErrors[index].year}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* ─── PAYMENT SECTION ─────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border-subtle/50">
            <IndianRupee size={16} className="text-mustard-500" />
            <h4 className="font-display font-semibold text-sm text-text-primary">
              Payment
            </h4>
          </div>

          {/* Payment Instructions */}
          <div className="p-4 bg-mustard-500/5 border border-mustard-500/20 rounded-lg space-y-3">
            <h5 className="font-mono text-xs text-mustard-500 uppercase tracking-wider font-semibold">
              Payment Instructions
            </h5>
            <ul className="space-y-2 font-sans text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-mustard-500 font-semibold mt-0.5">1.</span>
                Registration fee is{" "}
                <span className="text-mustard-500 font-semibold">
                  ₹50 per person
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mustard-500 font-semibold mt-0.5">2.</span>
                <span>
                  Team of 1 = ₹50 &nbsp;|&nbsp; Team of 2 = ₹100 &nbsp;|&nbsp;
                  Team of 3 = ₹150
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mustard-500 font-semibold mt-0.5">3.</span>
                Scan the QR code below and pay{" "}
                <span className="text-mustard-500 font-semibold">
                  ₹{totalFee}
                </span>{" "}
                (for {teamSize} member{teamSize > 1 ? "s" : ""})
              </li>
              <li className="flex items-start gap-2">
                <span className="text-mustard-500 font-semibold mt-0.5">4.</span>
                Take a screenshot of the payment confirmation and upload it below
              </li>
            </ul>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="p-4 bg-white rounded-lg border border-border-subtle shadow-sm">
              <Image
                src="/pitch-perfect-qr.jpg"
                alt="Payment QR Code"
                width={250}
                height={250}
                style={{ height: "auto" }}
                className="rounded"
              />
            </div>
          </div>

          {/* Total Amount Display */}
          <div className="text-center">
            <p className="font-mono text-sm text-text-secondary">
              Total Amount:{" "}
              <span className="text-mustard-500 font-bold text-lg">
                ₹{totalFee}
              </span>
              <span className="text-text-tertiary text-xs ml-2">
                ({teamSize} × ₹50)
              </span>
            </p>
          </div>

          {/* Screenshot Upload */}
          <div className="space-y-2">
            <label className="block font-mono text-xs text-text-secondary uppercase">
              Payment Screenshot <span className="text-error-500">*</span>
            </label>

            {paymentScreenshot ? (
              <div className="flex items-center gap-3 p-3 bg-bg-surface border border-mustard-500/30 rounded">
                <CheckCircle2 size={16} className="text-mustard-500 shrink-0" />
                <span className="font-sans text-sm text-text-primary truncate flex-1">
                  {paymentFileName}
                </span>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1 hover:bg-error-500/10 rounded transition-colors"
                >
                  <X size={14} className="text-error-500" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border-subtle rounded-lg hover:border-mustard-500/50 transition-colors cursor-pointer group"
              >
                <Upload
                  size={24}
                  className="text-text-tertiary group-hover:text-mustard-500 transition-colors mb-2"
                />
                <p className="font-sans text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  Click to upload payment screenshot
                </p>
                <p className="font-mono text-xs text-text-tertiary mt-1">
                  JPG, PNG or WebP (max 5MB)
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileUpload}
              className="hidden"
            />

            {paymentError && (
              <p className="font-mono text-xs text-error-500 flex items-center gap-1">
                <AlertCircle size={12} />
                {paymentError}
              </p>
            )}
          </div>
        </div>

        {/* ─── SUBMIT ──────────────────────────────────────── */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></span>
              Submitting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Terminal size={16} />
              Register Team — ₹{totalFee}
            </span>
          )}
        </Button>
      </form>
    </Card>
  );
}

// ─── MAIN EVENT DETAIL PAGE ─────────────────────────────────────

export default function EventDetail() {
  const params = useParams();
  const router = useRouter();

  const slug = params?.slug as string;

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [showPitchForm, setShowPitchForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  // ─── LOAD EVENT DATA ───────────────────────────────────────────

  useEffect(() => {
    if (!slug) return;

    import("@/content/events.json").then((data) => {
      const match = data.default.find((e: any) => e.slug === slug);

      if (match) {
        setEvent(match);
      } else {
        router.push("/not-found");
      }

      setLoading(false);
    });
  }, [slug, router]);

  // ─── RSVP SUBMISSION ───────────────────────────────────────────

  const onSubmit = async () => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setRegSuccess(true);
    reset();
  };

  // ─── LOADING ───────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-mint-500/20 border-t-mint-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) return null;

  const isUpcoming = event.status === "upcoming";
  const isPitchPerfect = event.slug === "pitch-perfect-2026";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-[1000px] mx-auto px-6 w-full">
        {/* BACK LINK */}
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors font-sans text-sm mb-8"
        >
          <ArrowLeft size={16} />
          Back to events
        </Link>

        {/* EVENT HEADER */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 bg-mint-500/10 border border-mint-500/20 text-mint-500 text-xs font-mono rounded">
              {event.type}
            </span>

            <span className="text-text-tertiary">|</span>

            <div className="flex items-center space-x-1 text-xs font-mono text-text-secondary">
              <Calendar size={12} />

              <span>
                {event.slug === "technobash-2026"
                  ? "February 13-14, 2026"
                  : new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "Asia/Kolkata",
                    })}
                {" · "}
                {new Date(event.date).toLocaleTimeString("en-IN", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                  timeZone: "Asia/Kolkata",
                })}
              </span>
            </div>
          </div>

          <h1 className="font-display font-semibold text-3xl md:text-5xl text-text-primary">
            {event.title}
          </h1>

          <div className="flex items-center space-x-2 text-sm text-text-secondary font-mono">
            <MapPin size={16} className="text-text-tertiary" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* ─── PAST EVENT RECAP ─── */}

        {!isUpcoming && (
          <div className="space-y-10">
            {/* OVERVIEW */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-mint-500" />

                <h2 className="font-display font-semibold text-xl text-text-primary">
                  About the Event
                </h2>
              </div>

              <Card className="border border-border-subtle">
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  {event.description}
                </p>
              </Card>
            </section>

            {/* HIGHLIGHTS */}
            {event.highlights && (
              <section>
                <div className="flex items-center gap-2 mb-5">
                  <Trophy size={18} className="text-mint-500" />

                  <h2 className="font-display font-semibold text-xl text-text-primary">
                    Event Highlights
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {event.highlights.map(
                    (
                      highlight: { value: string; label: string },
                      index: number,
                    ) => (
                      <Card key={index} hoverGlow className="text-center py-7">
                        <div className="font-display font-semibold text-2xl md:text-3xl text-mint-500 mb-2">
                          {highlight.value}
                        </div>

                        <div className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
                          {highlight.label}
                        </div>
                      </Card>
                    ),
                  )}
                </div>
              </section>
            )}

            {/* EVENT RECAP */}
            {event.outcome && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 size={18} className="text-mint-500" />

                  <h2 className="font-display font-semibold text-xl text-text-primary">
                    Event Recap
                  </h2>
                </div>

                <Card className="border border-mint-500/20 bg-bg-surface">
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">
                    {event.outcome}
                  </p>
                </Card>
              </section>
            )}

            {/* ORGANIZERS */}
            {event.organizers && event.organizers.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Users size={18} className="text-mint-500" />

                  <h2 className="font-display font-semibold text-xl text-text-primary">
                    Organized By
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  {event.organizers.map((organizer: string, index: number) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-bg-surface border border-border-subtle rounded-md font-sans text-sm text-text-secondary"
                    >
                      {organizer}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* BACK TO EVENTS */}
            <div className="pt-4 border-t border-border-subtle">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-semibold text-mint-500 hover:text-text-primary transition-colors"
              >
                <ArrowLeft size={16} />
                Explore more events
              </Link>
            </div>
          </div>
        )}

        {/* ─── UPCOMING EVENT PAGE ─── */}

        {isUpcoming && (
          <>
            {event.slug === "orientation-2026-27" ? (
              <div className="max-w-3xl space-y-8 font-sans text-text-secondary leading-relaxed">
                <div className="space-y-4">
                  <h3 className="font-display font-semibold text-lg text-text-primary border-b border-border-subtle/50 pb-2">
                    Overview
                  </h3>
                  <p className="text-sm">{event.description}</p>
                </div>
              </div>
            ) : isPitchPerfect ? (
              /* ─── PITCH PERFECT LAYOUT ─── */
              <div className="space-y-10">
                {/* 1. OVERVIEW */}
                <div className="space-y-6">
                  <div className="p-6 md:p-8 rounded-xl bg-bg-surface border border-border-subtle shadow-sm space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-500/10 border border-mint-500/20 text-mint-500 text-xs font-mono">
                      <Sparkles size={13} />
                      Innovation & Pitching Competition
                    </div>

                    <h2 className="font-display font-semibold text-2xl md:text-3xl text-text-primary">
                      About Pitch Perfect 2026
                    </h2>

                    <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed max-w-3xl">
                      {event.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                          setShowPitchForm(true);
                          setTimeout(() => {
                            document
                              .getElementById("pitch-registration-section")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }}
                      >
                        Register Your Team
                      </Button>
                      <a
                        href="#competition-structure"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-bg-surface border border-border-subtle text-text-secondary text-sm rounded hover:text-text-primary hover:border-mint-500/30 transition-colors"
                      >
                        View Structure
                      </a>
                    </div>
                  </div>

                  {/* HIGHLIGHT STATS */}
                  {event.highlights && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {event.highlights.map(
                        (
                          highlight: { value: string; label: string },
                          index: number,
                        ) => (
                          <Card
                            key={index}
                            hoverGlow
                            className="text-center py-5 px-3"
                          >
                            <div className="font-display font-semibold text-2xl text-mint-500 mb-1">
                              {highlight.value}
                            </div>
                            <div className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-text-tertiary">
                              {highlight.label}
                            </div>
                          </Card>
                        ),
                      )}
                    </div>
                  )}
                </div>

                {/* 2. COMPETITION STRUCTURE */}
                <section id="competition-structure" className="scroll-mt-24 space-y-6">
                  <div className="flex items-center gap-2">
                    <BrainCircuit size={20} className="text-mint-500" />
                    <h2 className="font-display font-semibold text-xl md:text-2xl text-text-primary">
                      Competition Structure
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Round 1 */}
                    <Card className="p-5 border border-border-subtle bg-bg-surface space-y-3">
                      <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2">
                        <span className="font-mono text-xs text-mint-500 uppercase tracking-wider font-semibold">
                          Round 1
                        </span>
                        <span className="text-[11px] font-mono text-text-tertiary bg-bg-primary px-2 py-0.5 rounded border border-border-subtle">
                          Ideation &amp; Pitch
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-base text-text-primary">
                        Domain Allotment, Blueprint &amp; Pitch
                      </h3>
                      <ul className="font-sans text-xs text-text-secondary space-y-2 leading-relaxed list-disc list-inside">
                        <li>
                          <strong className="text-text-primary">Industry Vertical Domain:</strong> Teams receive an assigned industry vertical domain upon arrival.
                        </li>
                        <li>
                          <strong className="text-text-primary">Problem Statement &amp; Verification:</strong> Teams formulate their problem statement and get it verified by the organizers to ensure no duplicate topics.
                        </li>
                        <li>
                          <strong className="text-text-primary">Blueprint Submission:</strong> Submit domain, problem statement, and solution blueprint via Google Form for panel judging and record keeping.
                        </li>
                        <li>
                          <strong className="text-text-primary">Panel Pitch:</strong> Present your pitch deck (PPT) to the panel. Scores are calculated and shortlisted teams are announced.
                        </li>
                      </ul>
                    </Card>

                    {/* Round 2 */}
                    <Card className="p-5 border border-border-subtle bg-bg-surface space-y-3">
                      <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2">
                        <span className="font-mono text-xs text-mint-500 uppercase tracking-wider font-semibold">
                          Round 2
                        </span>
                        <span className="text-[11px] font-mono text-text-tertiary bg-bg-primary px-2 py-0.5 rounded border border-border-subtle">
                          Technical Build
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-base text-text-primary">
                        Live Prototype Development
                      </h3>
                      <ul className="font-sans text-xs text-text-secondary space-y-2 leading-relaxed list-disc list-inside">
                        <li>
                          <strong className="text-text-primary">Build &amp; Deploy:</strong> Shortlisted teams build and make their technical prototype live within the given time.
                        </li>
                        <li>
                          <strong className="text-text-primary">Submit &amp; Conclude:</strong> Submit your live prototype link/repository and conclude (no panel demonstration required).
                        </li>
                        <li>
                          <strong className="text-text-primary">Cash Prizes:</strong> Winners receive exciting cash prizes and certificates of excellence!
                        </li>
                      </ul>
                    </Card>
                  </div>
                </section>

                {/* 3. GUIDELINES & NOTE */}
                <section className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="p-4 border border-border-subtle space-y-1.5">
                      <div className="flex items-center gap-2 text-text-primary font-semibold text-xs font-mono uppercase">
                        <Users size={14} className="text-mint-500" />
                        Team Size
                      </div>
                      <p className="text-xs text-text-secondary">
                        1 to 3 members per team. Open to all branches and years.
                      </p>
                    </Card>

                    <Card className="p-4 border border-border-subtle space-y-1.5">
                      <div className="flex items-center gap-2 text-text-primary font-semibold text-xs font-mono uppercase">
                        <Laptop size={14} className="text-mint-500" />
                        Hardware
                      </div>
                      <p className="text-xs text-text-secondary">
                        Laptop with charger (mandatory) and mobile hotspot required.
                      </p>
                    </Card>

                    <Card className="p-4 border border-border-subtle space-y-1.5">
                      <div className="flex items-center gap-2 text-text-primary font-semibold text-xs font-mono uppercase">
                        <IndianRupee size={14} className="text-mint-500" />
                        Registration Fee
                      </div>
                      <p className="text-xs text-text-secondary">
                        ₹50 per participant (1 member = ₹50, 2 = ₹100, 3 = ₹150).
                      </p>
                    </Card>
                  </div>

                  {/* Judges decision notice */}
                  <div className="p-3 bg-bg-surface border border-border-subtle rounded-lg text-center font-mono text-xs text-text-tertiary">
                    ⚖️ <span className="text-text-secondary font-medium">Important Note:</span> The decision of the judges will be final.
                  </div>
                </section>

                {/* 4. REGISTRATION SECTION (COLLAPSIBLE / CLICK TO REGISTER) */}
                <div id="pitch-registration-section" className="scroll-mt-24 pt-4 border-t border-border-subtle">
                  {!showPitchForm ? (
                    <div className="rounded-xl border p-8 md:p-10 flex flex-col items-center text-center bg-bg-surface border-border-subtle space-y-5">
                      <div className="space-y-2 max-w-md">
                        <h3 className="font-display font-semibold text-2xl text-text-primary">
                          Ready to Pitch?
                        </h3>
                        <p className="font-sans text-sm text-text-secondary">
                          Register your team for Pitch Perfect 2026. Entry fee is ₹50 per participant.
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                          setShowPitchForm(true);
                          setTimeout(() => {
                            document
                              .getElementById("pitch-form-card")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }}
                        className="px-8 py-3 text-sm font-semibold"
                      >
                        Click to Register
                      </Button>
                    </div>
                  ) : (
                    <div id="pitch-form-card" className="space-y-4 scroll-mt-24">
                      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                        <div>
                          <h3 className="font-display font-semibold text-xl text-text-primary">
                            Pitch Perfect Team Registration
                          </h3>
                          <p className="font-sans text-xs text-text-secondary">
                            Fill in your team details and upload your payment confirmation screenshot.
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setShowPitchForm(false)}
                          className="text-xs"
                        >
                          Hide Form
                        </Button>
                      </div>

                      <PitchPerfectForm />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* ─── DEFAULT UPCOMING EVENT LAYOUT ─── */
              <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                {/* MAIN CONTENT */}
                <div className="md:col-span-3 space-y-8 font-sans text-text-secondary leading-relaxed">
                  <div className="space-y-4">
                    <h3 className="font-display font-semibold text-lg text-text-primary border-b border-border-subtle/50 pb-2">
                      Overview
                    </h3>

                    <p className="text-sm">{event.description}</p>
                  </div>

                  {event.prerequisites && (
                    <div className="space-y-2">
                      <h4 className="font-display font-semibold text-sm text-text-primary">
                        Prerequisites
                      </h4>

                      <p className="text-xs">{event.prerequisites}</p>
                    </div>
                  )}

                  {event.whatToBring && (
                    <div className="space-y-2">
                      <h4 className="font-display font-semibold text-sm text-text-primary">
                        What to Bring
                      </h4>

                      <p className="text-xs">{event.whatToBring}</p>
                    </div>
                  )}

                  {/* PRIZES - ADDED */}
                  {event.prizes && (
                    <div className="space-y-2">
                      <h4 className="font-display font-semibold text-sm text-text-primary">
                        Prizes & Certificates
                      </h4>

                      <p className="text-xs">{event.prizes}</p>
                    </div>
                  )}
                </div>

                {/* RSVP */}
                <div className="md:col-span-2">
                  <Card className="border border-border-subtle">
                    {regSuccess ? (
                      <div className="text-center py-8 space-y-4">
                        <CheckCircle2
                          className="text-mint-500 mx-auto"
                          size={40}
                        />

                        <h4 className="font-display font-semibold text-lg text-text-primary">
                          Registration Complete
                        </h4>

                        <p className="text-xs text-text-secondary">
                          Your attendance confirmation has been processed.
                          We&apos;ll see you at the event!
                        </p>

                        <Button
                          variant="secondary"
                          onClick={() => setRegSuccess(false)}
                          className="w-full"
                        >
                          Done
                        </Button>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <h3 className="font-mono text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                          RSVP Registration
                        </h3>

                        {/* NAME */}
                        <div className="space-y-1.5">
                          <label className="block font-mono text-[10px] text-text-secondary uppercase">
                            Name
                          </label>

                          <input
                            type="text"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-3 py-2 text-xs text-text-primary focus:border-mint-500 focus:outline-none"
                            placeholder="Your name"
                            {...register("name")}
                          />

                          {errors.name && (
                            <p className="text-[10px] text-error-500">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        {/* EMAIL */}
                        <div className="space-y-1.5">
                          <label className="block font-mono text-[10px] text-text-secondary uppercase">
                            Email
                          </label>

                          <input
                            type="email"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-3 py-2 text-xs text-text-primary focus:border-mint-500 focus:outline-none"
                            placeholder="you@gmail.com"
                            {...register("email")}
                          />

                          {errors.email && (
                            <p className="text-[10px] text-error-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* ROLL NUMBER */}
                        <div className="space-y-1.5">
                          <label className="block font-mono text-[10px] text-text-secondary uppercase">
                            Roll Number
                          </label>

                          <input
                            type="text"
                            className="w-full bg-bg-primary border border-border-subtle rounded px-3 py-2 text-xs text-text-primary focus:border-mint-500 focus:outline-none"
                            placeholder="24CSE0123"
                            {...register("rollNo")}
                          />

                          {errors.rollNo && (
                            <p className="text-[10px] text-error-500">
                              {errors.rollNo.message}
                            </p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          {isSubmitting
                            ? "Registering..."
                            : "Register Attendance"}
                        </Button>
                      </form>
                    )}
                  </Card>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}