"use client";

import { useEffect, useState } from "react";
import { getStoredAttribution, captureAttribution, type Attribution } from "@/lib/attribution";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

const PROJECT_OPTIONS = [
  { id: "web-app", label: "Web App", icon: "🌐" },
  { id: "mobile-app", label: "Mobile App", icon: "📱" },
  { id: "ai-solution", label: "AI Solution", icon: "🤖" },
  { id: "uiux-design", label: "UI/UX Design", icon: "🎨" },
  { id: "mvp", label: "Startup MVP", icon: "🚀" },
  { id: "enterprise", label: "Enterprise System", icon: "🏢" },
];

const TRAINING_OPTIONS = [
  { id: "student-training", label: "Student Training", icon: "🎓" },
  { id: "professional-training", label: "Professional Training", icon: "💼" },
];

const BUDGET_RANGES = [
  { id: "under-500k", label: "Under ₦500k" },
  { id: "500k-2m", label: "₦500k – ₦2M" },
  { id: "2m-10m", label: "₦2M – ₦10M" },
  { id: "10m-plus", label: "₦10M+" },
  { id: "not-sure", label: "Not sure yet" },
];

type Step = "interest" | "contact" | "done";

export function FastQuote() {
  const [step, setStep] = useState<Step>("interest");
  const [category, setCategory] = useState<"build" | "training" | null>(null);
  const [optionId, setOptionId] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [waHref, setWaHref] = useState("");

  useEffect(() => {
    captureAttribution();
  }, []);

  const selectedOption = [...PROJECT_OPTIONS, ...TRAINING_OPTIONS].find((o) => o.id === optionId);
  const selectedBudget = BUDGET_RANGES.find((b) => b.id === budget);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setSubmitting(true);
    setError("");
    const attribution: Attribution = getStoredAttribution();

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          category,
          interest: selectedOption?.label || "General inquiry",
          interestId: optionId,
          budget: selectedBudget?.label || "",
          landingPage: window.location.pathname,
          attribution,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setWaHref(
        buildWhatsAppUrl(
          `Hi! I just requested a fast quote for: ${selectedOption?.label}${selectedBudget ? ` (budget: ${selectedBudget.label})` : ""}. My name is ${name.trim()}.`,
        ),
      );
      setStep("done");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const chipClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium border transition-all cursor-pointer ${
      active
        ? "bg-crimson-200 text-white border-crimson-200 shadow-md"
        : "bg-white text-dark border-gray-200 hover:border-crimson-100"
    }`;

  return (
    <section id="fast-quote" className="py-20 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-crimson-200 uppercase tracking-[0.25em] mb-2">
            30-Second Estimate
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-3">
            Get Your Instant Project Estimate
          </h2>
          <p className="text-gray text-lg">
            Two quick steps — no long forms. We&apos;ll reply with a tailored proposal.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8">
          {step === "interest" && (
            <div>
              <p className="text-sm font-bold text-dark mb-3 uppercase tracking-wide">
                Step 1 of 2 — What do you need?
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                <button type="button" onClick={() => { setCategory("build"); setOptionId(""); }} className={chipClass(category === "build")}>
                  🛠️ Build a Product
                </button>
                <button type="button" onClick={() => { setCategory("training"); setOptionId(""); }} className={chipClass(category === "training")}>
                  🎓 Join Training
                </button>
              </div>

              {category && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                    {(category === "build" ? PROJECT_OPTIONS : TRAINING_OPTIONS).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setOptionId(opt.id)}
                        className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                          optionId === opt.id
                            ? "border-crimson-200 bg-crimson-50 shadow-sm"
                            : "border-gray-100 bg-white hover:border-gray-200"
                        }`}
                      >
                        <span className="text-2xl block mb-1.5">{opt.icon}</span>
                        <span className="text-sm font-semibold text-dark">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  {category === "build" && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {BUDGET_RANGES.map((b) => (
                        <button key={b.id} type="button" onClick={() => setBudget(b.id)} className={chipClass(budget === b.id)}>
                          {b.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    disabled={!optionId}
                    onClick={() => setStep("contact")}
                    className="w-full rounded-full bg-[#fb4545dc] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-crimson-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Continue →
                  </button>
                </>
              )}
              {!category && (
                <p className="text-sm text-gray text-center py-4">Choose one of the options above to continue.</p>
              )}
            </div>
          )}

          {step === "contact" && (
            <form onSubmit={handleSubmit}>
              <p className="text-sm font-bold text-dark mb-1 uppercase tracking-wide">
                Step 2 of 2 — Where should we send your estimate?
              </p>
              <p className="text-sm text-gray mb-5">
                Selected: <strong className="text-dark">{selectedOption?.icon} {selectedOption?.label}</strong>
                {budget && <> · Budget: <strong className="text-dark">{selectedBudget?.label}</strong></>}
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name *"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-crimson-200 transition-colors"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address *"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-crimson-200 transition-colors"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="WhatsApp number (optional)"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-crimson-200 transition-colors"
                />
              </div>
              {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("interest")}
                  className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-full bg-[#fb4545dc] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-200 disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? "Sending..." : "Get My Estimate"}
                </button>
              </div>
            </form>
          )}

          {step === "done" && (
            <div className="text-center py-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Estimate on the way! 🎉</h3>
              <p className="text-gray text-sm mb-6 max-w-sm mx-auto">
                Thanks {name.split(" ")[0]}! We&apos;ll send your tailored proposal for <strong>{selectedOption?.label}</strong> to <strong>{email}</strong> within 24 hours.
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1da851]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Or fast-track it on WhatsApp now
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
