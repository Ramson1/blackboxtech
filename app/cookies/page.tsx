import Link from "next/link";

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <section className="pt-32 pb-12 px-4 text-center -mt-20">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(251,69,69,0.12) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm font-medium mb-6 transition-colors">
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Cookie Policy</h1>
          <p className="text-white/50">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-20 space-y-8 text-white/70 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">1. What Are Cookies</h2>
          <p>Cookies are small text files that are stored on your device when you visit a website. They help the website remember your preferences and understand how you use the site. Similar technologies like local storage and session storage may also be used.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">2. How We Use Cookies</h2>
          <p>BlackBox Tech uses cookies and similar technologies for the following purposes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Essential Cookies</strong> — Required for the website to function properly (e.g., session management, security)</li>
            <li><strong>Functional Cookies</strong> — Remember your preferences such as language or region</li>
            <li><strong>Analytics Cookies</strong> — Help us understand how visitors interact with our website by collecting and reporting information anonymously</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">3. Types of Cookies We Use</h2>
          <div className="mt-3 space-y-3">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="font-semibold text-white text-sm mb-1">Session Cookies</p>
              <p className="text-sm">These are temporary cookies that are deleted when you close your browser. They help us maintain your session while navigating the site.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="font-semibold text-white text-sm mb-1">Persistent Cookies</p>
              <p className="text-sm">These remain on your device for a set period of time. They help us remember your preferences for future visits.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="font-semibold text-white text-sm mb-1">Third-Party Cookies</p>
              <p className="text-sm">Our analytics and hosting providers (Vercel) may set their own cookies. These are governed by their respective privacy policies.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">4. Managing Cookies</h2>
          <p>You can control and manage cookies through your browser settings. Most browsers allow you to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>View what cookies are stored and delete them individually</li>
            <li>Block all third-party cookies</li>
            <li>Block all cookies from being set</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>
          <p className="mt-2">Please note that blocking or deleting cookies may affect the functionality of our website.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">5. Browser Settings</h2>
          <p>You can adjust cookie settings in your browser. Here are links to help pages for common browsers:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Safari</li>
            <li>Microsoft Edge</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">6. Changes to This Policy</h2>
          <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
          <p>If you have questions about our use of cookies, please contact us at <a href="mailto:info@blackboxtech.online" className="text-[#fb4545dc] hover:underline">info@blackboxtech.online</a></p>
        </div>
      </section>
    </div>
  );
}
