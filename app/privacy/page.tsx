import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <section className="pt-32 pb-12 px-4 text-center -mt-20">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,69,69,0.12) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm font-medium mb-6 transition-colors">
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/50">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-20 space-y-8 text-white/70 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
          <p>We collect information you provide directly, including:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Personal details (name, email, phone number) submitted through registration forms</li>
            <li>Student and professional training registration data</li>
            <li>Project details and business information for software build requests</li>
            <li>Messages sent through our contact form</li>
            <li>Documents uploaded for project requests</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Process training registrations and software build requests</li>
            <li>Communicate with you about our services</li>
            <li>Send confirmation emails and project updates</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Improve our services and website experience</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">3. Data Storage & Security</h2>
          <p>Your data is stored securely using Supabase with encryption at rest and in transit. We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Supabase</strong> — Database and file storage</li>
            <li><strong>Resend</strong> — Transactional email delivery</li>
            <li><strong>Vercel</strong> — Website hosting and deployment</li>
          </ul>
          <p className="mt-2">These services have their own privacy policies and we encourage you to review them.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">5. Data Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your data only in the following cases:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>With your explicit consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">6. Data Retention</h2>
          <p>We retain your personal data only as long as necessary to fulfill the purposes for which it was collected, including satisfying legal, accounting, or reporting requirements.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="mt-2">To exercise these rights, contact us at <a href="mailto:info@blackboxtech.online" className="text-[#fb4545dc] hover:underline">info@blackboxtech.online</a></p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">8. Children&apos;s Privacy</h2>
          <p>Our student training programs are designed for minors with parental or guardian consent. We collect parent/guardian information for registration purposes. We do not knowingly collect personal information from children under 13 without parental consent.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">10. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:info@blackboxtech.online" className="text-[#fb4545dc] hover:underline">info@blackboxtech.online</a></p>
        </div>
      </section>
    </div>
  );
}
