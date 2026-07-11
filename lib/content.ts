// ─── Navigation ───────────────────────────────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Awards", href: "#company" },
] as const;

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const heroContent = {
  headline: "DISCOVER. DESIGN. DELIVER.",
  subtitle: "From Idea to Market-Ready Software",
  description:
    "At BlackBox Tech, we build the technology behind tomorrow's businesses. We partner with startups, enterprises, and institutions to design, engineer, and scale secure, AI-powered digital solutions—from strategy and design to development, cloud, and cybersecurity.",
  cta: { label: "Let's Chat", href: "#contact" },
} as const;

// ─── Trust Logos ──────────────────────────────────────────────────────────────
export const trustClients = [
  { name: "LNEX" },
  { name: "Rhema" },
  { name: "Beautcia" },
  { name: "Naasify" },
  { name: "Standard Bank" },
  { name: "Shoprite" },
] as const;

// ─── Metrics / Counters ───────────────────────────────────────────────────────
export const metrics = [
  { value: 50, prefix: "R ", suffix: "M+", label: "Revenue generated for clients" },
  { value: 150, prefix: "", suffix: "K+", label: "Users across deployed products" },
  { value: 5, prefix: "", suffix: "+", label: "Years of excellence" },
] as const;

// ─── Services ─────────────────────────────────────────────────────────────────
export const services = [
  {
    title: "Discovery",
    description:
      "We validate ideas and uncover opportunities through deep research and strategic analysis.",
    keywords: ["Research", "Analysis", "Ideation", "Validation"],
  },
  {
    title: "Design",
    description:
      "We craft intuitive interfaces and experiences that users love, grounded in data and empathy.",
    keywords: ["UX/UI Design", "Prototyping", "Branding", "User Testing"],
  },
  {
    title: "Development",
    description:
      "We build robust, scalable products using modern technology stacks and engineering best practices.",
    keywords: ["Web Apps", "Mobile", "APIs", "Cloud Infrastructure"],
  },
  {
    title: "Growth",
    description:
      "We scale products and drive adoption through data-driven marketing and continuous optimisation.",
    keywords: ["Marketing", "Analytics", "SEO", "Scaling"],
  },
] as const;

// ─── Software Training Courses ─────────────────────────────────────────────────
export const trainingCourses = [
  { name: "Scratch Programming", icon: "🧩", description: "Visual coding for beginners and young minds" },
  { name: "Front-End Web Dev", icon: "🎨", description: "HTML, CSS, JavaScript, Next.js & modern UI" },
  { name: "Back-End Web Dev", icon: "⚙️", description: "Node.js, APIs, databases & server logic" },
  { name: "Full Stack Web Dev", icon: "🚀", description: "End-to-end web application development" },
  { name: "Mobile Development", icon: "📱", description: "iOS & Android apps with React Native" },
  { name: "UI/UX Design", icon: "✏️", description: "Figma, user research & interaction design" },
  { name: "Cybersecurity", icon: "🔒", description: "Network security, ethics & threat analysis" },
  { name: "Artificial Intelligence", icon: "🤖", description: "Machine learning, NLP & AI fundamentals" },
  { name: "Digital Marketing", icon: "📈", description: "SEO, social media, ads & analytics" },
  { name: "Graphic Design", icon: "🎯", description: "Photoshop, CorelDraw, branding & visual communication" },
  { name: "Data Analytics", icon: "📊", description: "Excel, SQL, Python, Power BI & business intelligence" },
  { name: "Videography", icon: "🎬", description: "Content creation, video editing & production" },
  { name: "Roblox Game Dev", icon: "🎮", description: "Create games and experiences on Roblox" },
  { name: "Python Programming", icon: "🐍", description: "Powerful language for all skill levels" },
  { name: "Game Development", icon: "🕹️", description: "Build 2D/3D games with Unity and Unreal" },
  { name: "Cloud Computing", icon: "☁️", description: "AWS, Azure, GCP fundamentals & deployment" },
  { name: "DevOps", icon: "🔄", description: "CI/CD, Docker, Kubernetes & automation" },
  { name: "Blockchain Basics", icon: "⛓️", description: "Smart contracts, Web3 & decentralized apps" },
] as const;

// ─── Student Programs (all courses including Scratch) ──────────────────────────
export const studentPrograms = trainingCourses;

// ─── Professional Programs (no Scratch) ────────────────────────────────────────
export const professionalPrograms = trainingCourses.filter((c) => c.name !== "Scratch Programming");

// ─── Payment Plans ─────────────────────────────────────────────────────────────
export const paymentPlans = [
  { id: "per-hour", label: "Per Hour", description: "Pay for each session individually", badge: "" },
  { id: "weekly", label: "Weekly", description: "Fixed weekly payment plan", badge: "Flexible" },
  { id: "monthly", label: "Monthly", description: "Monthly subscription package", badge: "Best value" },
] as const;

// ─── Schedule Options ──────────────────────────────────────────────────────────
export const scheduleOptions = [
  { id: "weekday-evenings", label: "Weekday Evenings", time: "Mon - Fri, 6:00 PM - 9:00 PM" },
  { id: "weekend", label: "Weekend Classes", time: "Sat - Sun, 9:00 AM - 4:00 PM" },
] as const;

export const weekDays = [
  { id: "monday", label: "Mon" },
  { id: "tuesday", label: "Tue" },
  { id: "wednesday", label: "Wed" },
  { id: "thursday", label: "Thu" },
  { id: "friday", label: "Fri" },
  { id: "saturday", label: "Sat" },
  { id: "sunday", label: "Sun" },
] as const;

export const timeSlots = [
  { id: "morning", label: "Morning", time: "8:00 AM - 12:00 PM" },
  { id: "afternoon", label: "Afternoon", time: "12:00 PM - 4:00 PM" },
  { id: "evening", label: "Evening", time: "5:00 PM - 9:00 PM" },
] as const;

// ─── Experience Levels ─────────────────────────────────────────────────────────
export const experienceLevels = [
  { id: "beginner", label: "Beginner", description: "No prior experience required" },
  { id: "intermediate", label: "Intermediate", description: "Basic knowledge in the field" },
  { id: "advanced", label: "Advanced", description: "Professional experience recommended" },
] as const;

// ─── Software Build Service Types ──────────────────────────────────────────────
export const buildServiceTypes = [
  { icon: "🌐", name: "Web Applications", description: "Custom web apps, SaaS platforms & dashboards" },
  { icon: "📱", name: "Mobile Apps", description: "Native & cross-platform iOS/Android apps" },
  { icon: "🤖", name: "AI Solutions", description: "Machine learning, automation & intelligent systems" },
  { icon: "🛒", name: "E-Commerce", description: "Online stores, marketplaces & payment systems" },
  { icon: "⚙️", name: "Custom Software", description: "Tailored business tools & enterprise systems" },
  { icon: "🔗", name: "APIs & Integrations", description: "Third-party integrations & API development" },
] as const;

// ─── Budget Ranges ─────────────────────────────────────────────────────────────
export const budgetRanges = [
  "Under R10,000",
  "R10,000 - R50,000",
  "R50,000 - R150,000",
  "R150,000 - R500,000",
  "R500,000+",
] as const;

// ─── In-House Products ────────────────────────────────────────────────────────
export const inHouseProducts = [
  {
    name: "Beautcia",
    category: "Beauty Technology • Marketplace",
    description: "A digital beauty marketplace connecting clients with verified beauty professionals including hairstylists, barbers, makeup artists, nail technicians, estheticians, spas, and salons. Simplifies beauty service discovery, appointment booking, secure payments, and business management.",
    features: ["Appointment scheduling", "Service marketplace", "Online payments", "Business profile management", "Customer reviews & ratings", "Portfolio showcase", "Booking reminders", "Business analytics"],
    technologies: "React Native • Next.js • NestJS • Cloud Database",
    laptopImage: "/products/beautcia mac.png",
    mobileImage: "/products/beautcia mobile.png",
  },
  {
    name: "LNEX Student App",
    category: "EdTech",
    description: "A comprehensive digital campus platform that improves communication, learning, and academic administration within higher institutions. Centralizes student activities into a single mobile application.",
    features: ["Smart Attendance", "Academic Polls", "Assignments & Notes", "Student Community", "Marketplace", "Announcements", "Digital Student ID", "AI-powered learning tools"],
    technologies: "React Native • Supabase • Clerk • PostgreSQL",
    laptopImage: "/products/lnex mac.png",
    mobileImage: "/products/lnex mobile.png",
  },
  {
    name: "Rhema Expert Solutions",
    category: "Technology Solutions Company",
    description: "A Nigerian technology company delivering innovative digital solutions for educational institutions, businesses, and organizations. Specializes in STEM education, software engineering, cybersecurity, AI, drone technology, IoT, and digital transformation.",
    features: ["Software Development", "Mobile & Web Applications", "STEM Robotics", "Coding Education", "Artificial Intelligence", "IoT", "Drone Technology", "Cyber Security"],
    technologies: "Full Stack • AI/ML • IoT • Drone Systems",
    laptopImage: "/products/rhema mac.png",
    mobileImage: "/products/rhema mobile.png",
  },
  {
    name: "LifeLink MPCS",
    category: "Cooperative Management Platform",
    description: "A multipurpose cooperative management platform empowering members through structured programs covering finance, property, transportation, investments, and enterprise development. Digitizes cooperative operations while promoting transparency and accountability.",
    features: ["Member Management", "Savings & Contributions", "Loan Management", "Property Investment", "Cooperative Wallet", "Financial Reports", "Member Dashboard", "Enterprise Programs"],
    technologies: "Next.js • Cloud Database • Financial Systems",
    laptopImage: "/products/lifelink mac.png",
    mobileImage: "/products/lifelink mobile.png",
  },
  {
    name: "MetaShares",
    category: "Investment Technology",
    description: "A digital investment and asset-sharing platform enabling individuals and organizations to participate in collective investment opportunities through secure and transparent technology. Simplifies asset ownership, portfolio tracking, and collaborative wealth creation.",
    features: ["Investment Portfolio", "Shared Asset Management", "Member Dashboard", "Investment Tracking", "Performance Analytics", "Secure Transactions", "Financial Reports"],
    technologies: "Next.js • Blockchain • Cloud Infrastructure",
    laptopImage: "/products/metashare mac.png",
    mobileImage: "/products/metashare mobile.png",
  },
  {
    name: "QR Code Generator & Scanner",
    category: "Productivity Tool",
    description: "A modern QR code solution enabling users to generate, customize, and scan QR codes for business, education, events, marketing, attendance systems, inventory management, and digital payments.",
    features: ["QR Code Generation", "QR Code Scanning", "Attendance Verification", "Business Cards", "Wi-Fi Sharing", "Event Tickets", "Product Tracking", "Download & Share"],
    technologies: "Next.js • React • Canvas API",
    laptopImage: "/products/qrcode mac.png",
    mobileImage: "/products/qrcode mobile.png",
  },
  {
    name: "Resume Builder",
    category: "Career Technology",
    description: "An intelligent platform helping job seekers create professional resumes and CVs within minutes. Choose from modern templates, receive AI-powered writing assistance, and export resumes in multiple formats.",
    features: ["AI Resume Writing", "Professional Templates", "Cover Letter Generator", "PDF Export", "ATS-Friendly Layouts", "Skills Suggestions", "Resume Preview"],
    technologies: "Next.js • AI Integration • PDF Generation",
    laptopImage: "/products/resume mac.png",
    mobileImage: "/products/resume mobile.png",
  },
  {
    name: "TokenVault",
    category: "Web3 • Blockchain",
    description: "A Web3 platform simplifying cryptocurrency distribution through automated airdrops, gifting, and token management. Enables projects, communities, and individuals to securely distribute digital assets with a seamless blockchain experience.",
    features: ["Crypto Airdrops", "Token Gifting", "Wallet Integration", "Multi-chain Support", "Campaign Management", "Transaction History", "Secure Asset Distribution"],
    technologies: "React • Web3.js • Smart Contracts • Multi-chain",
    laptopImage: "/products/tokenvault mac.png",
    mobileImage: "/products/tokenvault mobile.png",
  },
  {
    name: "PayTracker",
    category: "FinTech",
    description: "A financial management platform helping individuals and businesses monitor income, expenses, invoices, subscriptions, and payment activities. Provides real-time financial insights that improve budgeting and cash flow management.",
    features: ["Income Tracking", "Expense Management", "Invoice Management", "Subscription Monitoring", "Financial Reports", "Budget Planning", "Payment History", "Analytics Dashboard"],
    technologies: "Next.js • Financial APIs • Cloud Database",
    laptopImage: "/products/paytracker mac.png",
    mobileImage: "/products/paytracker mobile.png",
  },
  {
    name: "Gift Idea Generator",
    category: "Artificial Intelligence",
    description: "An AI-powered recommendation platform helping users discover thoughtful gift ideas based on recipient's age, gender, interests, hobbies, career, personality, relationship, budget, and special occasions. Generates personalized recommendations in seconds.",
    features: ["AI Gift Recommendations", "Budget-based Suggestions", "Occasion-based Gifts", "Age & Gender Filtering", "Hobby & Career Matching", "Personalized Gift Lists", "Smart Search"],
    technologies: "Next.js • AI/ML • Recommendation Engine",
    laptopImage: "/products/giftidea mac.png",
    mobileImage: "/products/giftidea mobile.png",
  },
  {
    name: "LifeLink",
    category: "Cooperative Technology",
    description: "A digital ecosystem modernizing cooperative society operations by providing members with secure access to savings, investments, loans, financial records, enterprise opportunities, and community engagement through an intuitive platform.",
    features: ["Digital Cooperative Management", "Member Portal", "Loan Processing", "Savings Tracking", "Investment Programs", "Notifications", "Reports & Analytics"],
    technologies: "Next.js • Cloud Database • Member Systems",
    laptopImage: "/products/lifelink mac.png",
    mobileImage: "/products/lifelink mobile.png",
  },
  {
    name: "Rhema CBT Exam",
    category: "Education Technology",
    description: "A secure Computer-Based Testing platform designed for schools, training institutions, and organizations. Streamlines examination administration, automates grading, and delivers detailed performance analytics.",
    features: ["Online Examinations", "Question Bank Management", "Automatic Grading", "Student Authentication", "Result Analytics", "Exam Scheduling", "Anti-cheating Measures", "Performance Reports"],
    technologies: "Next.js • Real-time Systems • Analytics",
    laptopImage: "/products/cbt mac.png",
    mobileImage: "/products/cbt mobile.png",
  },
] as const;

// ─── Awards & Accreditations ───────────────────────────────────────────────────
export const awards = [
  {
    title: "App of the Year 2017",
    org: "Most Innovative Solution",
  },
  {
    title: "ISO Certification 2022",
    org: "Quality Management Systems",
  },
  {
    title: "Top Dev Agency 2023",
    org: "Clutch Global Award",
  },
  {
    title: "Best UX Design 2024",
    org: "Awwwards Honoree",
  },
] as const;

// ─── Portfolio / Case Studies ─────────────────────────────────────────────────
export const portfolioItems = [
  {
    title: "Fintech Platform",
    client: "LNEX",
    description: "End-to-end digital banking solution serving 500k+ users.",
    color: "from-crimson-100 to-purple-100",
  },
  {
    title: "E-Commerce Marketplace",
    client: "Shoprite",
    description: "Scalable marketplace handling 1M+ daily transactions.",
    color: "from-purple-100 to-crimson-50",
  },
  {
    title: "Health & Beauty App",
    client: "Beautcia",
    description: "Mobile-first beauty platform with AR try-on features.",
    color: "from-crimson-50 to-purple-50",
  },
  {
    title: "InsurTech Solution",
    client: "Naasify",
    description: "AI-powered insurance platform reducing claims processing by 60%.",
    color: "from-purple-50 to-crimson-100",
  },
] as const;

// ─── Footer ───────────────────────────────────────────────────────────────────
export const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
  ],
  services: [
    { label: "Discovery", href: "/#services" },
    { label: "Design", href: "/#services" },
    { label: "Development", href: "/#services" },
    { label: "Growth", href: "/#services" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
} as const;

export const contactInfo = {
  email: "info@blackboxtech.online",
  phone: "+234 805 020 5349",
  socials: {
    linkedin: "https://linkedin.com/company/blackboxtech",
    instagram: "https://instagram.com/blackboxtech",
    facebook: "https://facebook.com/blackboxtech",
    twitter: "https://twitter.com/blackboxtech",
  },
} as const;
