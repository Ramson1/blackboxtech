import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/JsonLd";

export const metadata: Metadata = {
  title: "Tech Glossary — Key Terms & Definitions",
  description: "Comprehensive glossary of essential technology terms — software development, AI, cloud computing, cybersecurity, and more. Written by BlackBox Tech experts.",
  keywords: ["tech glossary", "software development terms", "AI definitions", "technology dictionary", "web development glossary"],
  alternates: { canonical: "/glossary" },
};

interface GlossaryEntry {
  term: string;
  definition: string;
  category: string;
}

const glossaryData: GlossaryEntry[] = [
  { term: "API (Application Programming Interface)", definition: "A set of protocols, routines, and tools that allow different software applications to communicate with each other. APIs define the methods and data formats that programs can use to request and exchange information.", category: "Software Development" },
  { term: "Agile Development", definition: "An iterative approach to software development that emphasizes flexibility, collaboration, and customer feedback. Agile teams deliver work in small increments (sprints) rather than trying to deliver everything at once.", category: "Software Development" },
  { term: "Artificial Intelligence (AI)", definition: "The simulation of human intelligence processes by computer systems. AI includes machine learning, natural language processing, computer vision, and robotics — enabling machines to learn from data, make decisions, and improve over time.", category: "AI & Technology" },
  { term: "Cloud Computing", definition: "The delivery of computing services — including servers, storage, databases, networking, software, and analytics — over the internet ('the cloud'). It enables faster innovation, flexible resources, and economies of scale.", category: "Cloud & DevOps" },
  { term: "CI/CD (Continuous Integration / Continuous Deployment)", definition: "A set of practices that combine code integration, automated testing, and automated deployment. CI/CD pipelines allow development teams to deliver code changes more frequently and reliably.", category: "Cloud & DevOps" },
  { term: "Cybersecurity", definition: "The practice of protecting systems, networks, and programs from digital attacks. It encompasses threat detection, prevention, and response to protect sensitive data and maintain business continuity.", category: "Cybersecurity" },
  { term: "DevOps", definition: "A set of practices that combines software development (Dev) and IT operations (Ops). DevOps aims to shorten the development lifecycle, deliver features frequently, and ensure high software quality through automation and collaboration.", category: "Cloud & DevOps" },
  { term: "Full-Stack Development", definition: "The practice of building both the front-end (client-side) and back-end (server-side) portions of a web application. Full-stack developers handle everything from user interface design to database management and API creation.", category: "Software Development" },
  { term: "Machine Learning (ML)", definition: "A subset of artificial intelligence that enables systems to automatically learn and improve from experience without being explicitly programmed. ML algorithms use statistical techniques to find patterns in data.", category: "AI & Technology" },
  { term: "Microservices Architecture", definition: "A software development approach where an application is structured as a collection of loosely coupled, independently deployable services. Each service runs a unique process and communicates through well-defined APIs.", category: "Software Development" },
  { term: "Natural Language Processing (NLP)", definition: "A branch of AI that gives computers the ability to understand, interpret, and generate human language. NLP powers chatbots, translation services, sentiment analysis, and voice assistants.", category: "AI & Technology" },
  { term: "Progressive Web App (PWA)", definition: "A web application that uses modern browser features to deliver an app-like experience. PWAs work offline, load instantly, support push notifications, and can be installed on the home screen.", category: "Software Development" },
  { term: "REST API (Representational State Transfer)", definition: "An architectural style for designing networked applications. REST APIs use standard HTTP methods (GET, POST, PUT, DELETE) and return data in formats like JSON, making them ideal for web and mobile integrations.", category: "Software Development" },
  { term: "Responsive Design", definition: "A web design approach that ensures websites look and function well on all devices and screen sizes. It uses flexible layouts, fluid grids, and CSS media queries to adapt the user experience to different viewports.", category: "Product Design" },
  { term: "SaaS (Software as a Service)", definition: "A software distribution model where applications are hosted by a provider and made available to customers over the internet. Users typically pay a subscription fee rather than purchasing software outright.", category: "Cloud & DevOps" },
  { term: "SEO (Search Engine Optimization)", definition: "The practice of optimizing websites to rank higher in search engine results. SEO involves technical optimization, content quality, keyword research, and link building to increase organic (non-paid) traffic.", category: "AI & Technology" },
  { term: "Serverless Computing", definition: "A cloud computing model where the cloud provider manages server infrastructure automatically. Developers write and deploy code without worrying about servers, scaling, or maintenance — paying only for actual compute time.", category: "Cloud & DevOps" },
  { term: "UI/UX Design (User Interface / User Experience)", definition: "UI Design focuses on the visual elements users interact with — buttons, layouts, typography. UX Design focuses on the overall experience — usability, accessibility, and satisfaction. Together, they create products people love to use.", category: "Product Design" },
  { term: "Version Control (Git)", definition: "A system that records changes to a file or set of files over time so that specific versions can be recalled later. Git is the most widely used version control system, enabling collaboration and code history tracking.", category: "Software Development" },
  { term: "Web Accessibility (a11y)", definition: "The practice of making websites usable by people with disabilities. It ensures that web content is perceivable, operable, understandable, and robust for all users, including those using assistive technologies.", category: "Product Design" },
  { term: "WebSocket", definition: "A communication protocol providing full-duplex communication channels over a single TCP connection. Unlike HTTP, WebSockets allow real-time data flow between client and server — ideal for chat apps, live dashboards, and gaming.", category: "Software Development" },
  { term: "Zero Trust Security", definition: "A security framework that requires strict identity verification for every person and device trying to access resources on a network. It operates on the principle of 'never trust, always verify' — regardless of location.", category: "Cybersecurity" },
];

const categories = [...new Set(glossaryData.map((g) => g.category))];

export default function GlossaryPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": glossaryData.map((item) => ({
      "@type": "Question",
      "name": `What is ${item.term}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.definition,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <div className="min-h-screen bg-white pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-crimson-200 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-gray-600 font-medium">Glossary</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technology Glossary
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Essential terms and definitions in software development, AI, cloud computing, cybersecurity, and product design — written by the BlackBox Tech team.
            </p>
          </div>

          {/* Category quick links */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-crimson-200 hover:text-white transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Glossary sections by category */}
          {categories.map((category) => {
            const entries = glossaryData.filter((g) => g.category === category);
            return (
              <section
                key={category}
                id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="mb-12 scroll-mt-24"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {category}
                </h2>
                <div className="space-y-6">
                  {entries.map((entry) => (
                    <article key={entry.term} className="group">
                      <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-crimson-200 transition-colors">
                        {entry.term}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {entry.definition}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}

          {/* CTA */}
          <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Need help with your tech project?</h2>
            <p className="text-sm text-gray-500 mb-5">Our team of experts can guide you through every step — from concept to deployment.</p>
            <Link
              href="/build"
              className="inline-block bg-[#fb4545dc] hover:bg-[#fb4545dc]/80 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              Build My Software
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
