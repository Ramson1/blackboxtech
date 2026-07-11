import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <section className="pt-32 pb-12 px-4 text-center -mt-20">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,69,69,0.12) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm font-medium mb-6 transition-colors">
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Terms of Service</h1>
          <p className="text-white/50">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-20 space-y-8 text-white/70 leading-relaxed">
        <div className="prose-custom">
          <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using the services provided by BlackBox Tech (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">2. Services</h2>
          <p>BlackBox Tech provides full-cycle product development services including but not limited to software development, UI/UX design, discovery sessions, training programs (student and professional), and technology consulting. Specific deliverables, timelines, and pricing will be outlined in individual project agreements.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">3. Client Responsibilities</h2>
          <p>You agree to provide accurate and complete information when requesting our services. You are responsible for maintaining the confidentiality of any account credentials and for all activities under your account. Timely feedback and approvals are required to keep projects on schedule.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">4. Payment Terms</h2>
          <p>Payment terms will be specified in individual project agreements or training registration confirmations. Fees are non-refundable once work has commenced unless otherwise agreed in writing. Late payments may incur additional charges.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">5. Intellectual Property</h2>
          <p>Upon full payment, clients receive ownership of custom-built deliverables as specified in the project agreement. BlackBox Tech retains the right to use general knowledge, skills, and experience gained during the project. Pre-existing tools, frameworks, and libraries remain the property of BlackBox Tech.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">6. Limitation of Liability</h2>
          <p>BlackBox Tech shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by the client for the specific service in question.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">7. Training Programs</h2>
          <p>Registration for student and professional training programs is subject to availability. Schedules may be adjusted with reasonable notice. Certificates are awarded upon successful completion of program requirements. Attendance and participation policies will be communicated upon registration.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">8. Termination</h2>
          <p>Either party may terminate a project agreement with written notice. Upon termination, the client is responsible for payment of all work completed up to the termination date. BlackBox Tech reserves the right to suspend services for non-payment.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">9. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services after changes constitutes acceptance of the updated terms.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">10. Contact</h2>
          <p>For questions about these Terms of Service, please contact us at <a href="mailto:info@blackboxtech.online" className="text-[#fb4545dc] hover:underline">info@blackboxtech.online</a></p>
        </div>
      </section>
    </div>
  );
}
