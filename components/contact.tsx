"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  User,
  AtSign,
  Clock,
  MessageSquare,
  Building2,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";

// ==================== WEB3FORMS CONFIG ====================
// 1. Get an access key tied to the email you want submissions to land in
//    (https://app.web3forms.com/onboarding/create), verify that inbox.
// 2. Put it in .env.local as NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=xxxx
// 3. The fallback below is a placeholder key from testing - REPLACE IT
//    with your real business-email key before going live.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "2733f8fd-61a0-49d5-b571-276cf8289bc4";

// WhatsApp number submissions get forwarded to (E.164 without the +)
const WHATSAPP_NUMBER = "917992392070";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Accepts Indian mobile numbers, with or without +91 / 91 prefix,
  // and ignores spaces or dashes the user may type in between.
  const isValidPhone = (value: string) => {
    const cleaned = value.replace(/[\s-]/g, "");
    return /^(\+91|91)?[6-9]\d{9}$/.test(cleaned);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "phone") {
      if (!value.trim()) {
        setPhoneError("Phone number is required.");
      } else if (!isValidPhone(value)) {
        setPhoneError("Enter a valid 10-digit Indian mobile number.");
      } else {
        setPhoneError("");
      }
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.message.trim() &&
    isValidPhone(formData.phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setStatus("error");
      if (!formData.phone.trim() || !isValidPhone(formData.phone)) {
        setErrorMsg("Please enter a valid 10-digit phone number.");
      } else {
        setErrorMsg("Please fill in your name, email, and message.");
      }
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Business Enquiry from ${formData.name} — VIONA FIBC Website`,
          from_name: "VIONA FIBC — Website Contact Form",
          "Full Name": formData.name,
          "Email Address": formData.email,
          "Contact Number": formData.phone || "Not provided",
          "Requirement / Message": formData.message,
          replyto: formData.email, // control field - sets reply-to, not shown in email body
          // honeypot field - keep empty, Web3Forms uses this to catch bots
          botcheck: "",
        }),
      });

      // Log the raw response once so you can see the exact JSON shape
      // Web3Forms sends back - open devtools console after a test submit.
      const data = await response.json();
      console.log("Web3Forms response:", data);

      if (data.success) {
        setStatus("success");
        setShowSuccessModal(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Web3Forms error:", err);
      setStatus("error");
      setErrorMsg(
        "Network error - please check your connection and try again.",
      );
    }
  };

  const handleWhatsAppSend = () => {
    if (!isFormValid) {
      setStatus("error");
      setErrorMsg(
        "Please fill in your name, email, and message before sending on WhatsApp.",
      );
      return;
    }

    const lines = [
      "Hello Viona FIBC Team,",
      "",
      "I came across your website and would like to enquire about your packaging solutions.",
      "",
      `*Name:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      formData.phone ? `*Phone:* ${formData.phone}` : null,
      "",
      "*Requirement:*",
      formData.message,
      "",
      "Looking forward to your response. Thank you.",
    ].filter((line) => line !== null);

    const text = encodeURIComponent(lines.join("\n"));

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      {/* ==================== BACKGROUND TEXTURES (DOTS & CHECKS) ==================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 1. Light Grey Grid Checks Pattern */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(203, 213, 225, 0.5) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(203, 213, 225, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* 2. Light Grey Micro Dots Texture */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(rgba(100, 116, 139, 0.3) 1.2px, transparent 1.2px)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* 3. Radial Mask Effect (Edges par pattern soft aur fade-out lagta hai) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-transparent to-slate-50 opacity-80" />

        {/* Ambient Subtle Color Glows */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* ==================== LEFT: CONTACT FORM (7 COLS) ==================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              Get in Touch
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
              Let's{" "}
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
                Connect.
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl">
              Reach out to us for bulk packaging inquiries, customized
              solutions, or partnership opportunities. We respond within 24
              hours.
            </p>

            {/* Form Card */}
            <form
              onSubmit={handleSubmit}
              className="relative mt-8 space-y-4 rounded-3xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 shadow-xl shadow-slate-900/5 backdrop-blur-md"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                    <User className="h-3.5 w-3.5 text-blue-600" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                    <AtSign className="h-3.5 w-3.5 text-blue-600" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                  <Phone className="h-3.5 w-3.5 text-blue-600" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`w-full rounded-xl border bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    phoneError
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                />
                {phoneError && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {phoneError}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-blue-600" />{" "}
                  Message / Requirement
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your packaging requirements, quantity, or specific details..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: status === "sending" ? 1 : 1.01 }}
                  whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                  type="submit"
                  disabled={status === "sending"}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-900 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition-all hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      Sending <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <Send className="h-4 w-4" />
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600"
                >
                  Send on WhatsApp <ArrowUpRight className="h-4 w-4" />
                </motion.button>
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs font-medium text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </div>
              )}
            </form>
          </motion.div>

          {/* ==================== RIGHT: CONTACT CARDS & INFO (5 COLS) ==================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            {/* Quick Contact Banner Card */}
            <div className="rounded-3xl border border-blue-200/60 bg-gradient-to-br from-blue-900 to-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 text-white/5">
                <Sparkles className="h-40 w-40" />
              </div>

              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300 border border-blue-400/30">
                  <Clock className="h-3.5 w-3.5" /> Fast Response Guaranteed
                </span>
                <h3 className="mt-4 text-2xl font-bold">Prefer Direct Talk?</h3>
                <p className="mt-2 text-xs text-blue-100/80 leading-relaxed">
                  Our team is available Monday to Saturday to assist you with
                  quick queries and immediate quotes.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+917992392070"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 hover:bg-blue-50 transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-blue-600" /> Call Now
                  </a>
                  <a
                    href="https://wa.me/917992392070?text=Hi!%20I%20found%20VIONA%20FIBC%20on%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20bulk%20packaging%20solutions."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 px-4 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                  >
                    WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Info Grid Cards */}
            <div className="grid grid-cols-1 gap-4">
              {/* Address Card */}
              <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Headquarters
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    15/2 Tatya Tope Marg Freeganj Ujjain- 456010 Madhya Pradesh
                    (India)
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Email Support
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    <a
                      href="mailto:info@vionafibc.com"
                      className="hover:text-blue-700 transition-colors"
                    >
                      info@vionafibc.com
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    <a
                      href="mailto:export@vionafibc.com"
                      className="hover:text-blue-700 transition-colors"
                    >
                      Marketing@vionafibc.com
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    <a
                      href="mailto:Marketing@vionafibc.com"
                      className="hover:text-blue-700 transition-colors"
                    >
                      export@vionafibc.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Business Hours
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Mon - Sat: 8:00 AM - 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ==================== SUCCESS MODAL ==================== */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccessModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 className="h-9 w-9 text-emerald-600" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Message Sent Successfully
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Thank you for reaching out to VIONA FIBC. Our team has received
                your enquiry and will get back to you within 24 hours.
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-6 w-full rounded-xl bg-blue-900 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition-all hover:bg-blue-800"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
