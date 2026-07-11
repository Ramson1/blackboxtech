"use client";

import { useState } from "react";
import Link from "next/link";
import { studentPrograms, paymentPlans, scheduleOptions, experienceLevels, weekDays, timeSlots } from "@/lib/content";

export default function StudentRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [form, setForm] = useState({
    parentName: "", parentEmail: "", parentPhone: "",
    childName: "", childAge: "", childGender: "", childLevel: "beginner",
    schedule: "", preferredTime: "", startDate: "", paymentPlan: "", trainingMode: "virtual", notes: "",
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
        body: JSON.stringify({ type: "student", ...form, programs: selectedPrograms, schedule: scheduleStr || form.schedule }),
      });
      setSubmitted(true);
    } catch { /* ignore */ }
    finally { setSending(false); }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-crimson-50 via-white to-purple-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-dark mb-3">Registration Received!</h1>
          <p className="text-gray text-lg mb-8">Thank you, {form.parentName}! We&apos;ll contact you shortly about enrolling {form.childName}.</p>
          <Link href="/" className="inline-block rounded-full bg-dark px-8 py-3.5 text-base font-medium text-white hover:bg-dark/80 transition-colors">Back to Home</Link>
        </div>
      </div>
    );
  }

  const inputStyle = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-crimson-200 transition-colors";
  const labelStyle = "block text-sm font-semibold text-dark mb-1.5";

  return (
    <div className="min-h-screen" style={{ background: "#fb4545dc" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden -mt-20" style={{ background: "linear-gradient(135deg, #fb4545dc 0%, #ddd7fd 100%)" }}>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors">
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Online Coding Classes</h1>
          <p className="text-xl text-white/90 mb-8">Learn to code from anywhere — structured, instructor-led classes for young minds</p>
          <a href="#register" className="inline-block rounded-full bg-white px-8 py-3.5 text-lg font-bold text-crimson-200 hover:bg-white/90 transition-colors shadow-lg">Register Now</a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-dark text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎥", title: "Live Interactive Sessions", desc: "Real-time classes with expert instructors" },
              { icon: "👨‍🏫", title: "Experienced Instructors", desc: "STEM-certified teachers who love coding" },
              { icon: "🛠️", title: "Project-Based Learning", desc: "Build real projects, not just theory" },
              { icon: "💳", title: "Flexible Payment", desc: "Per-hour, weekly, or monthly plans" },
              { icon: "🎓", title: "Certificate of Completion", desc: "Recognized certification for every course" },
              { icon: "🕐", title: "Flexible Scheduling", desc: "Weekday and weekend options available" },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-gray-100 hover:border-crimson-100 hover:shadow-lg transition-all">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="text-lg font-bold text-dark mb-1">{item.title}</h3>
                <p className="text-sm text-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Courses */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-dark text-center mb-4">Available Courses</h2>
          <p className="text-gray text-center mb-12 max-w-xl mx-auto">From visual block coding to advanced web development — we have a course for every age and skill level.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentPrograms.map((course) => (
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

      {/* How It Works */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(135deg, #1b1b1b 0%, #2d2d2d 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Register Online", desc: "Fill out the registration form with your preferred courses and payment plan." },
              { step: "2", title: "Get Contacted", desc: "Our team will reach out to confirm the schedule and provide payment details." },
              { step: "3", title: "Start Learning", desc: "Join live online classes and begin the coding journey with expert guidance." },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="w-14 h-14 rounded-full bg-crimson-200 flex items-center justify-center mx-auto mb-4 text-white text-xl font-extrabold">{item.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-dark text-center mb-3">Register for Classes</h2>
          <p className="text-gray text-center mb-10">Fill the form below and we will contact you</p>

          {/* Payment Plans */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-dark text-center mb-4">Flexible Payment Plans</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {paymentPlans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => update("paymentPlan", plan.id)}
                  className={`relative p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${form.paymentPlan === plan.id ? "border-crimson-200 bg-crimson-50/50 shadow-md" : "border-gray-100 hover:border-gray-200 hover:shadow-sm"}`}
                >
                  {plan.badge && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-crimson-200 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">{plan.badge}</span>}
                  <div className={`w-5 h-5 rounded-full border-2 mx-auto mb-2 flex items-center justify-center ${form.paymentPlan === plan.id ? "border-crimson-200" : "border-gray-300"}`}>
                    {form.paymentPlan === plan.id && <div className="w-3 h-3 rounded-full bg-crimson-200" />}
                  </div>
                  <h4 className="text-base font-bold text-dark mb-1">{plan.label}</h4>
                  <p className="text-xs text-gray">{plan.description}</p>
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Parent Details */}
            <div className="p-6 rounded-2xl bg-crimson-50/30 border border-crimson-100/50">
              <h3 className="text-lg font-bold text-dark mb-4">Parent / Guardian Details</h3>
              <div className="space-y-4">
                <div><label className={labelStyle}>Full Name *</label><input required className={inputStyle} value={form.parentName} onChange={(e) => update("parentName", e.target.value)} placeholder="Your full name" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelStyle}>Email *</label><input required type="email" className={inputStyle} value={form.parentEmail} onChange={(e) => update("parentEmail", e.target.value)} placeholder="your@email.com" /></div>
                  <div><label className={labelStyle}>Phone Number *</label><input required className={inputStyle} value={form.parentPhone} onChange={(e) => update("parentPhone", e.target.value)} placeholder="+27..." /></div>
                </div>
              </div>
            </div>

            {/* Child Details */}
            <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100/50">
              <h3 className="text-lg font-bold text-dark mb-4">Child Details</h3>
              <div className="space-y-4">
                <div><label className={labelStyle}>Full Name *</label><input required className={inputStyle} value={form.childName} onChange={(e) => update("childName", e.target.value)} placeholder="Child's full name" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><label className={labelStyle}>Age</label><input type="number" className={inputStyle} value={form.childAge} onChange={(e) => update("childAge", e.target.value)} placeholder="Age" /></div>
                  <div><label className={labelStyle}>Gender</label>
                    <select className={inputStyle} value={form.childGender} onChange={(e) => update("childGender", e.target.value)}>
                      <option value="">Select</option><option>Male</option><option>Female</option><option>Prefer not to say</option>
                    </select>
                  </div>
                  <div><label className={labelStyle}>Experience Level</label>
                    <select className={inputStyle} value={form.childLevel} onChange={(e) => update("childLevel", e.target.value)}>
                      {experienceLevels.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Selection */}
            <div className="p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-dark mb-4">Select Courses *</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {studentPrograms.map((course) => (
                  <label key={course.name} className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all ${selectedPrograms.includes(course.name) ? "bg-crimson-50 border-crimson-200 border" : "bg-gray-50 border border-transparent hover:bg-gray-100"}`}>
                    <input type="checkbox" checked={selectedPrograms.includes(course.name)} onChange={() => toggleProgram(course.name)} className="accent-crimson-200 w-4 h-4" />
                    <span className="text-sm font-medium text-dark">{course.icon} {course.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="p-6 rounded-2xl border border-gray-100 space-y-4">
              <h3 className="text-lg font-bold text-dark mb-2">Preferences</h3>
              <div>
                <label className={labelStyle}>Training Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "virtual", label: "Virtual (Online)", icon: "💻", desc: "Learn from anywhere" },
                    { id: "physical", label: "Physical (In-Person)", icon: "🏫", desc: "Attend at our center" },
                  ].map((mode) => (
                    <label key={mode.id} className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${form.trainingMode === mode.id ? "border-crimson-200 bg-crimson-50/30" : "border-gray-100 hover:border-gray-200"}`}>
                      <input type="radio" name="trainingMode" value={mode.id} checked={form.trainingMode === mode.id} onChange={(e) => update("trainingMode", e.target.value)} className="accent-crimson-200" />
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
                <label className={labelStyle}>Preferred Days</label>
                <div className="flex flex-wrap gap-2">
                  {weekDays.map((day) => (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => toggleDay(day.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                        selectedDays.includes(day.id)
                          ? "bg-crimson-200 text-white border-crimson-200"
                          : "bg-white border-gray-300 text-dark hover:border-crimson-200"
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><label className={labelStyle}>Preferred Time</label>
                  <select className={inputStyle} value={form.preferredTime} onChange={(e) => update("preferredTime", e.target.value)}>
                    <option value="">Select</option>
                    {timeSlots.map((t) => <option key={t.id} value={t.id}>{t.label} ({t.time})</option>)}
                  </select>
                </div>
                <div><label className={labelStyle}>Preferred Start Date</label><input type="date" className={inputStyle} value={form.startDate} onChange={(e) => update("startDate", e.target.value)} /></div>
                <div><label className={labelStyle}>Payment Plan</label>
                  <select className={inputStyle} value={form.paymentPlan} onChange={(e) => update("paymentPlan", e.target.value)}>
                    <option value="">Select</option>
                    {paymentPlans.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>
                </div>
              </div>
              <div><label className={labelStyle}>Additional Notes</label><textarea className={inputStyle + " resize-vertical"} rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Any specific goals or questions..." /></div>
            </div>

            <button type="submit" disabled={sending} className="w-full py-4 rounded-xl bg-crimson-200 text-white font-bold text-lg hover:bg-crimson-200/90 transition-colors disabled:opacity-60 cursor-pointer">
              {sending ? "Submitting..." : "Register for Classes"}
            </button>
            <p className="text-xs text-gray text-center">By registering, you agree to our terms and conditions.</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center bg-dark">
        <p className="text-white/60 text-sm font-medium">BLACKBOX TECH</p>
        <p className="text-white/40 text-xs mt-1">Empowering the next generation of coders</p>
      </footer>
    </div>
  );
}
