"use client";

import { useState } from "react";
import { services, trainingCourses } from "@/lib/content";

const bgColors = ["bg-purple-50", "bg-crimson-50", "bg-purple-50", "bg-crimson-50"];

export function Services() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <section id="services" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-[-100%] animate-gradient-rotate" style={{ background: "conic-gradient(from 0deg at 50% 50%, #ddd7fd 0deg, #ffffff 72deg, #fde8e8 144deg, #ffffff 216deg, #fbbcbc 288deg, #ddd7fd 360deg)", filter: "blur(60px)", opacity: 0.5 }} />
      </div>
      {/* Main services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-dark mb-4">
          Our Full-Cycle Product Development Services
        </h2>
        <p className="text-center text-gray max-w-2xl mx-auto mb-14 text-lg">
          End-to-end capabilities that take your product from concept to scale.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div
              key={service.title}
              onClick={() => setShowAlert(true)}
              className={`p-6 rounded-2xl ${bgColors[i]} hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer`}
            >
              <h3 className="text-xl font-bold text-dark mb-3">
                {service.title}
              </h3>
              <p className="text-gray text-sm leading-relaxed mb-5">
                {service.description}
              </p>
              <ul className="space-y-1.5">
                {service.keywords.map((kw) => (
                  <li
                    key={kw}
                    className="text-sm font-medium text-dark flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson-200 flex-shrink-0" />
                    {kw}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Software Training */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 relative z-10">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-crimson-200 uppercase tracking-[0.25em] mb-2">
            Level Up Your Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Software Training Programs
          </h2>
          <p className="text-gray max-w-2xl mx-auto text-lg">
            Industry-ready courses designed to launch your tech career. Learn from
            practitioners, not just theorists.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {trainingCourses.map((course) => (
            <div
              key={course.name}
              onClick={() => setShowAlert(true)}
              className="group relative p-5 rounded-2xl border border-gray-100 bg-white hover:border-crimson-100 hover:shadow-md transition-all cursor-pointer"
            >
              <span className="text-3xl mb-3 block">{course.icon}</span>
              <h3 className="text-base font-bold text-dark mb-1.5 group-hover:text-crimson-200 transition-colors">
                {course.name}
              </h3>
              <p className="text-sm text-gray leading-relaxed">
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAlert(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-crimson-50 flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-crimson-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-dark text-center mb-3">
              Ready to Get Started?
            </h3>

            <p className="text-gray text-sm text-center mb-5 leading-relaxed">
              To register for a training or book a service, please use the options below:
            </p>

            {/* Desktop instruction */}
            <div className="bg-purple-50 rounded-xl p-4 mb-3 border border-purple-100">
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">🖥️</span>
                <div>
                  <p className="text-sm font-semibold text-dark mb-1">On Desktop</p>
                  <p className="text-xs text-gray leading-relaxed">
                    Click the <span className="font-bold text-dark">&quot;Get Started&quot;</span> button in the navigation bar at the top, then select the option you want from the dropdown menu.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile instruction */}
            <div className="bg-crimson-50/50 rounded-xl p-4 mb-5 border border-crimson-100/30">
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">📱</span>
                <div>
                  <p className="text-sm font-semibold text-dark mb-1">On Mobile</p>
                  <p className="text-xs text-gray leading-relaxed">
                    Tap the <span className="font-bold text-dark">menu button (☰)</span> at the top right, then select your preferred option from the menu list at the bottom.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAlert(false)}
              className="w-full bg-[#fb4545dc] hover:bg-[#fb4545dc]/80 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
