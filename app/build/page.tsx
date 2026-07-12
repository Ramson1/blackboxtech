"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { buildServiceTypes, budgetRanges } from "@/lib/content";

export default function BuildPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    companyName: "", fullName: "", email: "", phone: "",
    projectType: "", budget: "", timeline: "",
    description: "", additionalRequirements: "",
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleFiles = (newFiles: FileList | null) => {
    if (newFiles) {
      setFiles((prev) => [...prev, ...Array.from(newFiles)]);
    }
  };

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const [uploadProgress, setUploadProgress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      let fileUrls: string[] = [];
      let fileNames: string[] = [];

      // Upload files to Supabase Storage first
      if (files.length > 0) {
        setUploadProgress("Uploading files...");
        const formData = new FormData();
        files.forEach((f) => formData.append("files", f));

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          alert(err.error || "File upload failed");
          setSending(false);
          setUploadProgress("");
          return;
        }

        const uploadData = await uploadRes.json();
        fileUrls = uploadData.urls || [];
        fileNames = uploadData.names || [];
      }

      setUploadProgress("Submitting request...");
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "build",
          ...form,
          files: fileNames.join(", "),
          file_urls: fileUrls,
        }),
      });
      setSubmitted(true);
    } catch { /* ignore */ }
    finally { setSending(false); setUploadProgress(""); }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Request Received!</h1>
          <p className="text-gray-400 text-lg mb-8">Thank you, {form.fullName}! Our team will review your project and get back to you within 48 hours.</p>
          <Link href="/" className="inline-block rounded-full bg-white px-8 py-3.5 text-base font-medium text-dark hover:bg-white/90 transition-colors">Back to Home</Link>
        </div>
      </div>
    );
  }

  const inputStyle = "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-crimson-200/50 transition-colors";
  const labelStyle = "block text-sm font-semibold text-white/80 mb-1.5";

  return (
    <div className="min-h-screen bg-dark text-white">
      <div style={{ height: "5rem" }} />
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden -mt-20">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,69,69,0.15) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm font-medium mb-6 transition-colors">
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4" style={{ background: "linear-gradient(135deg, #fb4545dc 0%, #ddd7fd 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>We Build Software for Your Business</h1>
          <p className="text-xl text-white/60 mb-8 max-w-xl mx-auto">From concept to launch — we design, engineer, and scale custom software solutions tailored to your needs.</p>
          <a href="#book" className="inline-block rounded-full px-8 py-3.5 text-lg font-bold text-white shadow-lg transition-colors" style={{ background: "linear-gradient(135deg, #fb4545dc 0%, #ddd7fd 100%)" }}>Book a Consultation</a>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-12">What We Build</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {buildServiceTypes.map((service) => (
              <div key={service.name} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-crimson-200/30 hover:bg-white/8 transition-all">
                <span className="text-3xl mb-3 block">{service.icon}</span>
                <h3 className="text-lg font-bold text-white mb-1">{service.name}</h3>
                <p className="text-sm text-white/50">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "We understand your vision, goals, and requirements through in-depth consultation.", icon: "🔍" },
              { step: "02", title: "Design", desc: "Our team creates wireframes, prototypes, and UI/UX designs for your approval.", icon: "✏️" },
              { step: "03", title: "Development", desc: "We build your software using modern tech stacks with agile methodology.", icon: "⚙️" },
              { step: "04", title: "Launch", desc: "Thorough testing, deployment, and ongoing support to ensure success.", icon: "🚀" },
            ].map((item, i) => (
              <div key={item.step} className="relative text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl" style={{ background: "linear-gradient(135deg, rgba(243,146,169,0.2) 0%, rgba(221,215,253,0.2) 100%)" }}>{item.icon}</div>
                <p className="text-xs font-bold text-crimson-200 mb-1">STEP {item.step}</p>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/10 to-transparent" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="book" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-3">Book Your Project</h2>
          <p className="text-white/50 text-center mb-10">Tell us about your project and we&apos;ll get back to you within 48 hours</p>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Details */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Business Details</h3>
              <div className="space-y-4">
                <div><label className={labelStyle}>Company Name</label><input required className={inputStyle} value={form.companyName} onChange={(e) => update("companyName", e.target.value)} placeholder="Your company name" /></div>
                <div><label className={labelStyle}>Your Name *</label><input required className={inputStyle} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Full name" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelStyle}>Email *</label><input required type="email" className={inputStyle} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="your@company.com" /></div>
                  <div><label className={labelStyle}>Phone</label><input className={inputStyle} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+27..." /></div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><label className={labelStyle}>Project Type *</label>
                    <select required className={inputStyle} value={form.projectType} onChange={(e) => update("projectType", e.target.value)}>
                      <option value="">Select</option>
                      {buildServiceTypes.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div><label className={labelStyle}>Budget Range *</label>
                    <select required className={inputStyle} value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                      <option value="">Select</option>
                      {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div><label className={labelStyle}>Expected Timeline</label>
                    <select className={inputStyle} value={form.timeline} onChange={(e) => update("timeline", e.target.value)}>
                      <option value="">Select</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="3-4 months">3-4 months</option>
                      <option value="5-6 months">5-6 months</option>
                      <option value="6+ months">6+ months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>
                <div><label className={labelStyle}>Project Description *</label><textarea required className={inputStyle + " resize-vertical"} rows={5} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe your project idea, key features, target audience, and any specific requirements..." /></div>
              </div>
            </div>

            {/* File Upload */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Upload Documents</h3>
              <p className="text-sm text-white/40 mb-4">Attach PRDs, wireframes, reference materials, or any relevant documents</p>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragOver ? "border-crimson-200/50 bg-crimson-200/5" : "border-white/10 hover:border-white/20"}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                onClick={() => fileInputRef.current?.click()}
              >
                <svg className="w-10 h-10 mx-auto mb-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 3 3 0 013.182 4.605A4.5 4.5 0 0118 19.5H6.75z" />
                </svg>
                <p className="text-sm text-white/50 mb-1">Drag & drop files here or <span className="text-crimson-200 font-semibold">browse</span></p>
                <p className="text-xs text-white/30">PDF, DOC, PNG, JPG, ZIP up to 10MB</p>
                <input ref={fileInputRef} type="file" multiple className="hidden" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip,.txt" onChange={(e) => handleFiles(e.target.files)} />
              </div>
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 min-w-0">
                        <svg className="w-4 h-4 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        <span className="text-sm text-white/70 truncate">{file.name}</span>
                        <span className="text-xs text-white/30 flex-shrink-0">{(file.size / 1024).toFixed(0)} KB</span>
                      </div>
                      <button type="button" onClick={() => removeFile(i)} className="text-white/30 hover:text-red-400 transition-colors ml-2 flex-shrink-0 cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <label className={labelStyle}>Additional Requirements</label>
              <textarea className={inputStyle + " resize-vertical"} rows={3} value={form.additionalRequirements} onChange={(e) => update("additionalRequirements", e.target.value)} placeholder="Any specific technologies, integrations, or other requirements..." />
            </div>

            <button type="submit" disabled={sending} className="w-full py-4 rounded-xl font-bold text-lg text-white transition-colors disabled:opacity-60 cursor-pointer" style={{ background: "linear-gradient(135deg, #fb4545dc 0%, #ddd7fd 100%)" }}>
              {sending ? (uploadProgress || "Submitting...") : "Submit Project Request"}
            </button>
            <p className="text-xs text-white/30 text-center">We&apos;ll review your request and respond within 48 hours.</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-white/5">
        <p className="text-white/40 text-sm font-medium">BLACKBOX TECH</p>
        <p className="text-white/25 text-xs mt-1">Discover. Design. Deliver.</p>
      </footer>
    </div>
  );
}
