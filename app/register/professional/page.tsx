"use client";

import { useState } from "react";
import Link from "next/link";
import { professionalPrograms, paymentPlans, scheduleOptions, experienceLevels, weekDays, timeSlots } from "@/lib/content";

export default function ProfessionalRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", gender: "", dob: "",
    organization: "", jobTitle: "", schedule: "", preferredTime: "", experienceLevel: "beginner",
    paymentPreference: "", trainingMode: "virtual", additionalInfo: "",
  });

  const toggleProgram = (name: string) => {
    setSelectedPrograms((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const dayLabels = selectedDays.map((d) => weekDays.find((w) => w.id === d)?.label || d);
    const timeLabel = timeSlots.find((t) => t.id === form.preferredTime)?.label || "";
    const scheduleStr = [dayLabels.join(", "), timeLabel].filter(Boolean).join(" - ");
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "professional", ...form, programs: selectedPrograms, schedule: scheduleStr || form.schedule }),
      });
      setSubmitted(true);
    } catch { /* ignore */ }
    finally { setSending(false); }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-crimson-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-dark mb-3">Enrollment Received!</h1>
          <p className="text-gray text-lg mb-8">Thank you, {form.fullName}! We&apos;ll contact you within 24 hours with payment details.</p>
          <Link href="/" className="inline-block rounded-full bg-dark px-8 py-3.5 text-base font-medium text-white hover:bg-dark/80 transition-colors">Back to Home</Link>
        </div>
      </div>
    );
  }

  const inputStyle = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-200 transition-colors";
  const labelStyle = "block text-sm font-semibold text-dark mb-1.5";

  return (
    <div className="min-h-screen" style={{ background: "#fb4545dc" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden -mt-20" style={{ background: "linear-gradient(135deg, #ddd7fd 0%, #fb4545dc 100%)" }}>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors">
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            Back to Home
          </Link>
          <p className="text-xs font-semibold text-white/70 uppercase tracking-[0.25em] mb-3">Professional Trainings</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Advance Your Career</h1>
          <p className="text-xl text-white/90 mb-8">Industry-leading skills training designed to accelerate your professional growth</p>
          <a href="#enroll" className="inline-block rounded-full bg-white px-8 py-3.5 text-lg font-bold text-purple-200 hover:bg-white/90 transition-colors shadow-lg">Enroll Now</a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-dark text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🏆", title: "Industry-Certified Instructors", desc: "Learn from professionals with real-world experience" },
              { icon: "🔧", title: "Hands-On Projects", desc: "Build a portfolio with practical, real-world projects" },
              { icon: "📅", title: "Flexible Scheduling", desc: "Weekday and weekend options to fit your lifestyle" },
              { icon: "🤝", title: "Career Support", desc: "Mentorship, networking & job placement assistance" },
              { icon: "🎓", title: "Recognized Certificate", desc: "Industry-recognized certification upon completion" },
              { icon: "📚", title: "Lifetime Access", desc: "Keep access to course materials even after completion" },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-gray-100 hover:border-purple-100 hover:shadow-lg transition-all">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="text-lg font-bold text-dark mb-1">{item.title}</h3>
                <p className="text-sm text-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Programs */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-dark text-center mb-4">Available Training Programs</h2>
          <p className="text-gray text-center mb-12 max-w-xl mx-auto">Cutting-edge programs designed to equip you with in-demand skills in today&apos;s tech landscape.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {professionalPrograms.map((course) => (
              <div key={course.name} className="flex items-start gap-3 p-5 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-2xl flex-shrink-0">{course.icon}</span>
                <div>
                  <h3 className="font-bold text-dark text-sm">{course.name}</h3>
                  <p className="text-xs text-gray mt-0.5">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Details */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(135deg, #1b1b1b 0%, #2d2d2d 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-12">Training Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Schedule */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold mb-3">Schedule Options</h3>
              {scheduleOptions.map((s) => (
                <div key={s.id} className="mb-2">
                  <p className="text-white/90 text-sm font-semibold">{s.label}</p>
                  <p className="text-white/50 text-xs">{s.time}</p>
                </div>
              ))}
            </div>
            {/* Experience Levels */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold mb-3">Experience Levels</h3>
              {experienceLevels.map((l) => (
                <div key={l.id} className="mb-2">
                  <p className="text-white/90 text-sm font-semibold">{l.label}</p>
                  <p className="text-white/50 text-xs">{l.description}</p>
                </div>
              ))}
            </div>
            {/* Payment */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold mb-3">Payment Options</h3>
              <p className="text-white/70 text-sm mb-1">Full Payment — 10% discount</p>
              <p className="text-white/70 text-sm mb-1">Installment — 2-3 payments</p>
              <p className="text-white/70 text-sm">Corporate — Special rates</p>
            </div>
            {/* What You Get */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold mb-3">What You&apos;ll Get</h3>
              {["Certificate", "Project portfolio", "Career guidance", "Course materials", "Networking", "Job placement help"].map((item) => (
                <p key={item} className="text-white/70 text-sm mb-1">✓ {item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enroll" className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-dark text-center mb-3">Enroll Now</h2>
          <p className="text-gray text-center mb-10">Secure your spot — limited seats available per batch</p>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Details */}
            <div className="p-6 rounded-2xl bg-purple-50/40 border border-purple-100/50">
              <h3 className="text-lg font-bold text-dark mb-4">Personal Details</h3>
              <div className="space-y-4">
                <div><label className={labelStyle}>Full Name *</label><input required className={inputStyle} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Your full name" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelStyle}>Email *</label><input required type="email" className={inputStyle} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" /></div>
                  <div><label className={labelStyle}>Phone *</label><input required className={inputStyle} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+27..." /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelStyle}>Gender</label>
                    <select className={inputStyle} value={form.gender} onChange={(e) => update("gender", e.target.value)}>
                      <option value="">Select</option><option>Male</option><option>Female</option><option>Prefer not to say</option>
                    </select>
                  </div>
                  <div><label className={labelStyle}>Date of Birth</label><input type="date" className={inputStyle} value={form.dob} onChange={(e) => update("dob", e.target.value)} /></div>
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-dark mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelStyle}>Organization / Company</label><input className={inputStyle} value={form.organization} onChange={(e) => update("organization", e.target.value)} placeholder="Your employer (optional)" /></div>
                <div><label className={labelStyle}>Job Title</label><input className={inputStyle} value={form.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} placeholder="e.g. Software Engineer (optional)" /></div>
              </div>
            </div>

            {/* Program Selection */}
            <div className="p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-dark mb-4">Select Training Programs *</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {professionalPrograms.map((course) => (
                  <label key={course.name} className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all ${selectedPrograms.includes(course.name) ? "bg-purple-50 border-purple-200 border" : "bg-gray-50 border border-transparent hover:bg-gray-100"}`}>
                    <input type="checkbox" checked={selectedPrograms.includes(course.name)} onChange={() => toggleProgram(course.name)} className="accent-purple-400 w-4 h-4" />
                    <span className="text-sm font-medium text-dark">{course.icon} {course.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="p-6 rounded-2xl border border-gray-100 space-y-4">
              <h3 className="text-lg font-bold text-dark mb-2">Training Preferences</h3>
              <div>
                <label className={labelStyle}>Training Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "virtual", label: "Virtual (Online)", icon: "💻", desc: "Learn from anywhere" },
                    { id: "physical", label: "Physical (In-Person)", icon: "🏫", desc: "Attend at our center" },
                  ].map((mode) => (
                    <label key={mode.id} className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${form.trainingMode === mode.id ? "border-purple-300 bg-purple-50/30" : "border-gray-100 hover:border-gray-200"}`}>
                      <input type="radio" name="trainingMode" value={mode.id} checked={form.trainingMode === mode.id} onChange={(e) => update("trainingMode", e.target.value)} className="accent-purple-400" />
                      <span className="text-xl">{mode.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-dark">{mode.label}</p>
                        <p className="text-xs text-gray">{mode.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelStyle}>Preferred Days *</label>
                <div className="flex flex-wrap gap-2">
                  {weekDays.map((day) => (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => toggleDay(day.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                        selectedDays.includes(day.id)
                          ? "text-white border-crimson-200"
                          : "bg-white border-gray-300 text-dark hover:border-crimson-200"
                      }`}
                      style={selectedDays.includes(day.id) ? { background: "linear-gradient(135deg, #ddd7fd, #fb4545dc)" } : {}}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><label className={labelStyle}>Preferred Time *</label>
                  <select required className={inputStyle} value={form.preferredTime} onChange={(e) => update("preferredTime", e.target.value)}>
                    <option value="">Select</option>
                    {timeSlots.map((t) => <option key={t.id} value={t.id}>{t.label} ({t.time})</option>)}
                  </select>
                </div>
                <div><label className={labelStyle}>Experience Level *</label>
                  <select required className={inputStyle} value={form.experienceLevel} onChange={(e) => update("experienceLevel", e.target.value)}>
                    {experienceLevels.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
                  </select>
                </div>
                <div><label className={labelStyle}>Payment Preference *</label>
                  <select required className={inputStyle} value={form.paymentPreference} onChange={(e) => update("paymentPreference", e.target.value)}>
                    <option value="">Select</option>
                    {paymentPlans.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>
                </div>
              </div>
              <div><label className={labelStyle}>Additional Information</label><textarea className={inputStyle + " resize-vertical"} rows={3} value={form.additionalInfo} onChange={(e) => update("additionalInfo", e.target.value)} placeholder="Any questions or special requirements?" /></div>
            </div>

            <button type="submit" disabled={sending} className="w-full py-4 rounded-xl font-bold text-lg text-white transition-colors disabled:opacity-60 cursor-pointer" style={{ background: "linear-gradient(135deg, #ddd7fd 0%, #fb4545dc 100%)" }}>
              {sending ? "Submitting..." : "Submit Registration"}
            </button>
            <p className="text-xs text-gray text-center">We&apos;ll contact you with payment details within 24 hours.</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center bg-dark">
        <p className="text-white/60 text-sm font-medium">BLACKBOX TECH</p>
        <p className="text-white/40 text-xs mt-1">Empowering professionals with cutting-edge skills</p>
      </footer>
    </div>
  );
}
