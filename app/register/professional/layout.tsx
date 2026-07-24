import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blackboxtech.online";

export const metadata: Metadata = {
  title: "Professional Software Training — Upskill Your Team | BlackBox Tech",
  description:
    "Advance your career with BlackBox Tech professional training programs. Industry-relevant courses in full-stack development, mobile development, cloud computing, DevOps, AI, cybersecurity, data analytics, and blockchain. Flexible evening and weekend schedules available.",
  keywords: ["professional software training Nigeria", "software development bootcamp", "tech upskilling Lagos", "DevOps training Nigeria", "AI course professionals", "cybersecurity training Lagos", "cloud computing course Nigeria"],
  alternates: { canonical: `${SITE_URL}/register/professional` },
  openGraph: {
    title: "Professional Software Training — BlackBox Tech",
    description: "Industry-relevant software training for professionals. 17+ courses in development, AI, cloud, cybersecurity, and more.",
    type: "website",
    url: `${SITE_URL}/register/professional`,
    images: [{ url: `${SITE_URL}/logos/logoBlackPlain.png`, width: 512, height: 512, alt: "BlackBox Tech Professional Training" }],
  },
};

export default function ProfessionalLayout({ children }: { children: React.ReactNode }) {
  const trainingSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": "BlackBox Tech Professional Software Training Programs",
    "description": "Industry-relevant software training for working professionals. Courses in full-stack development, mobile development, cloud computing, DevOps, AI, cybersecurity, data analytics, blockchain, and more. Flexible evening and weekend schedules.",
    "provider": {
      "@type": "Organization",
      "name": "BlackBox Tech",
      "url": SITE_URL,
    },
    "educationalLevel": "Beginner to Advanced",
    "timeRequired": "PT12H",
    "programType": "https://schema.org/Certificate",
    "courseMode": ["onsite", "online"],
    "audience": { "@type": "EducationalAudience", "educationalRole": "professional" },
    "hasCourse": [
      { "@type": "Course", "name": "Front-End Web Development", "description": "HTML, CSS, JavaScript, Next.js and modern UI" },
      { "@type": "Course", "name": "Back-End Web Development", "description": "Node.js, APIs, databases and server logic" },
      { "@type": "Course", "name": "Full Stack Web Development", "description": "End-to-end web application development" },
      { "@type": "Course", "name": "Mobile Development", "description": "iOS and Android apps with React Native" },
      { "@type": "Course", "name": "UI/UX Design", "description": "Figma, user research and interaction design" },
      { "@type": "Course", "name": "Cybersecurity", "description": "Network security, ethics and threat analysis" },
      { "@type": "Course", "name": "Artificial Intelligence", "description": "Machine learning, NLP and AI fundamentals" },
      { "@type": "Course", "name": "DevOps", "description": "CI/CD, Docker, Kubernetes and automation" },
      { "@type": "Course", "name": "Cloud Computing", "description": "AWS, Azure, GCP fundamentals and deployment" },
      { "@type": "Course", "name": "Blockchain Basics", "description": "Smart contracts, Web3 and decentralized apps" },
    ],
  };

  return (
    <>
      <JsonLd data={trainingSchema} />
      {children}
    </>
  );
}
