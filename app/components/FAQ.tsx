import { JsonLd } from "./JsonLd";

const faqs = [
  {
    question: "What does BlackBox Tech do?",
    answer: "BlackBox Tech is a full-cycle software development company based in Nigeria. We offer custom software development (web apps, mobile apps, APIs, enterprise systems), AI and machine learning solutions, UI/UX design, cloud computing and DevOps, cybersecurity services, and professional software training programs for students and working professionals. We take projects from initial idea through discovery, design, development, and launch — handling every stage of the product lifecycle.",
  },
  {
    question: "How much does it cost to build custom software with BlackBox Tech?",
    answer: "Project costs at BlackBox Tech depend on scope, complexity, and timeline. We offer budget tiers starting from under R10,000 for small projects up to R500,000+ for enterprise-grade solutions. Every project begins with a free discovery consultation where we assess your requirements and provide a transparent quote. We work with startups, SMEs, and enterprises to find the right balance between budget and functionality.",
  },
  {
    question: "What software training programs does BlackBox Tech offer?",
    answer: "BlackBox Tech offers 18+ hands-on software training programs for both students and professionals, including: Scratch Programming, Front-End Web Development, Back-End Web Development, Full Stack Web Development, Mobile Development (React Native), UI/UX Design, Cybersecurity, Artificial Intelligence, Digital Marketing, Graphic Design, Data Analytics, Videography, Roblox Game Development, Python Programming, Game Development (Unity/Unreal), Cloud Computing, DevOps, and Blockchain Basics. Classes are available weekday evenings (Mon-Fri 6-9 PM) and weekends (Sat-Sun 9 AM-4 PM).",
  },
  {
    question: "What technologies does BlackBox Tech work with?",
    answer: "BlackBox Tech works with modern, industry-leading technology stacks including: React and Next.js for front-end development, Node.js and NestJS for back-end services, React Native for cross-platform mobile apps, PostgreSQL and Supabase for databases, AWS/Azure/GCP for cloud infrastructure, Docker and Kubernetes for containerization, Python and TensorFlow for AI/ML, and Figma for UI/UX design. We choose the right technology for each project based on requirements, scalability needs, and long-term maintainability.",
  },
  {
    question: "How long does it take to develop a software product?",
    answer: "Development timelines at BlackBox Tech vary based on project complexity. A simple web application or MVP typically takes 1-2 months. Medium-complexity products like e-commerce platforms or SaaS tools take 3-4 months. Enterprise-grade systems with complex integrations may take 5-6+ months. We use agile methodology with 2-week sprints, so you see progress regularly and can adjust priorities as the project evolves.",
  },
  {
    question: "Does BlackBox Tech offer ongoing support after launch?",
    answer: "Yes. BlackBox Tech provides comprehensive post-launch support including bug fixes, performance monitoring, security updates, feature enhancements, and scaling assistance. We believe in long-term partnerships — our team remains available to ensure your product continues to perform optimally and evolves with your business needs.",
  },
  {
    question: "Can BlackBox Tech help startups build their first product (MVP)?",
    answer: "Absolutely. Building MVPs for startups is one of our core strengths. We help founders validate their ideas through our discovery phase, design a focused user experience, build a minimum viable product with the essential features, and launch quickly to gather real user feedback. Our startup-friendly pricing and agile process are designed to get your product to market fast without compromising quality.",
  },
  {
    question: "What industries does BlackBox Tech serve?",
    answer: "BlackBox Tech serves a wide range of industries including FinTech (payment systems, financial management), EdTech (learning platforms, exam systems), HealthTech (appointment systems, health records), E-Commerce (marketplaces, payment integration), Beauty & Wellness (service booking platforms), Real Estate (property management), Cooperative & Finance (savings and loan systems), Web3 & Blockchain (token distribution, DeFi), and more. Our diverse portfolio allows us to bring cross-industry insights to every project.",
  },
];

export function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <section className="py-20 px-4 bg-white" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-crimson-200 mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Everything you need to know about working with BlackBox Tech. Can&apos;t find your answer? <a href="#contact" className="text-crimson-200 font-semibold hover:underline">Reach out to us</a>.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-gray-200 bg-gray-50/50 open:bg-white open:border-crimson-200/30 open:shadow-sm transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 list-none">
                  <h3 className="text-sm md:text-base font-semibold text-dark pr-4">{faq.question}</h3>
                  <span className="shrink-0 w-6 h-6 rounded-full bg-gray-200 group-open:bg-crimson-200 flex items-center justify-center transition-colors">
                    <svg className="w-3 h-3 text-gray-600 group-open:text-white transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
