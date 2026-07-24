import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blackboxtech.online";

export const metadata: Metadata = {
  title: "Student Software Training — Web Dev, Mobile, AI, Cybersecurity & More",
  description:
    "Enroll your child in BlackBox Tech student training programs. Hands-on courses in Scratch programming, web development, mobile apps, UI/UX design, cybersecurity, AI, game development, data analytics, and more. Flexible schedules — weekday evenings and weekends.",
  keywords: ["software training for students Nigeria", "coding classes for kids", "web development course students", "programming training Lagos", "tech courses for young learners", "Scratch programming Nigeria", "student coding bootcamp"],
  alternates: { canonical: `${SITE_URL}/register/student` },
  openGraph: {
    title: "Student Software Training — BlackBox Tech",
    description: "Hands-on software training for students. 18+ courses including web dev, mobile apps, AI, cybersecurity, game dev, and more.",
    type: "website",
    url: `${SITE_URL}/register/student`,
    images: [{ url: `${SITE_URL}/logos/logoBlackPlain.png`, width: 512, height: 512, alt: "BlackBox Tech Student Training" }],
  },
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const trainingSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": "BlackBox Tech Student Software Training Programs",
    "description": "Hands-on software training programs for students covering web development, mobile apps, AI, cybersecurity, game development, data analytics, UI/UX design, and more. Available weekday evenings and weekends.",
    "provider": {
      "@type": "Organization",
      "name": "BlackBox Tech",
      "url": SITE_URL,
    },
    "educationalLevel": "Beginner to Advanced",
    "timeRequired": "PT12H",
    "programType": "https://schema.org/Certificate",
    "courseMode": ["onsite", "online"],
    "hasCourse": [
      { "@type": "Course", "name": "Scratch Programming", "description": "Visual coding for beginners and young minds" },
      { "@type": "Course", "name": "Front-End Web Development", "description": "HTML, CSS, JavaScript, Next.js and modern UI" },
      { "@type": "Course", "name": "Back-End Web Development", "description": "Node.js, APIs, databases and server logic" },
      { "@type": "Course", "name": "Full Stack Web Development", "description": "End-to-end web application development" },
      { "@type": "Course", "name": "Mobile Development", "description": "iOS and Android apps with React Native" },
      { "@type": "Course", "name": "UI/UX Design", "description": "Figma, user research and interaction design" },
      { "@type": "Course", "name": "Cybersecurity", "description": "Network security, ethics and threat analysis" },
      { "@type": "Course", "name": "Artificial Intelligence", "description": "Machine learning, NLP and AI fundamentals" },
      { "@type": "Course", "name": "Data Analytics", "description": "Excel, SQL, Python, Power BI and business intelligence" },
      { "@type": "Course", "name": "Game Development", "description": "Build 2D/3D games with Unity and Unreal" },
      { "@type": "Course", "name": "Python Programming", "description": "Powerful language for all skill levels" },
      { "@type": "Course", "name": "Cloud Computing", "description": "AWS, Azure, GCP fundamentals and deployment" },
    ],
  };

  return (
    <>
      <JsonLd data={trainingSchema} />
      {children}
    </>
  );
}
