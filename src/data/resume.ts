// ─── Resume Data: Single Source of Truth ─────────────────────────────────────
// All professional information is derived from Shivam Jaiswal's resume.
// Experience duration is calculated dynamically — never hard-coded.

export const PERSONAL = {
  name: "Shivam Jaiswal",
  title: "Software Developer",
  subtitle: "Mobile & Automation",
  email: "sivamjaiswal322@gmail.com",
  phone: "+91 6371272745",
  location: "Bhubaneswar, Odisha",
  github: "https://github.com/Shivam-Jais",
  linkedin: "https://linkedin.com/in/shivam-6371",
  resumePath: "/resume/Shivam_Resume.pdf",
} as const;

export const PROFESSIONAL_SUMMARY =
  "Software Developer with experience in React Native (Expo), JavaScript ES6+, REST/SOAP API integration, JWT authentication, software testing, and mobile application development. Skilled in developing production applications, implementing Firebase Cloud Messaging (FCM), API integration, AI-assisted debugging, and software quality assurance.";

// ─── Dynamic Experience Calculation ──────────────────────────────────────────
export const EXPERIENCE_START_DATE = new Date(2025, 8, 1); // September 1, 2025

export function getExperienceDuration(): {
  years: number;
  months: number;
  label: string;
  shortLabel: string;
  startLabel: string;
} {
  const now = new Date();
  let years = now.getFullYear() - EXPERIENCE_START_DATE.getFullYear();
  let months = now.getMonth() - EXPERIENCE_START_DATE.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = years * 12 + months;

  let label: string;
  let shortLabel: string;

  if (years >= 1 && months > 0) {
    label = `${years} yr ${months} mo`;
    shortLabel = `${years}+ yr`;
  } else if (years >= 1) {
    label = `${years} yr`;
    shortLabel = `${years} yr`;
  } else {
    label = `${totalMonths} mo`;
    shortLabel = `${totalMonths} mo`;
  }

  const startLabel = EXPERIENCE_START_DATE.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return { years, months, label, shortLabel, startLabel };
}

// ─── Professional Experience ─────────────────────────────────────────────────
export const EXPERIENCE = {
  company: "Abrosys Technology Pvt. Ltd.",
  role: "Software Developer (Mobile & Automation)",
  startDate: "Sep 2025",
  endDate: "Present",
  responsibilities: [
    "Developed and maintained production mobile applications using React Native (Expo) for Android and iOS.",
    "Integrated REST/SOAP APIs, implemented JWT authentication, Firebase Cloud Messaging (FCM), and validated JSON/XML responses.",
    "Built and released production APK, AAB, and IPA using Expo EAS Build, resolving build, dependency, and Android SDK issues.",
    "Designed and enhanced application modules, optimized performance, and improved API synchronization and user experience.",
    "Performed Manual, Functional, Regression, UI, and API Testing using Postman, collaborating with developers to resolve production issues.",
    "Contributed to ETA-GIT, automation tools, Windows installer (EXE/MSI) creation, and technical SEO initiatives while leveraging AI tools for debugging and code analysis.",
  ],
} as const;

// ─── Education ───────────────────────────────────────────────────────────────
export const EDUCATION = {
  degree: "Master of Computer Applications (MCA)",
  university: "C. V. Raman Global University",
  location: "Bhubaneswar, Odisha",
  cgpa: 8.56,
} as const;

// ─── Technical Skills (grouped by category) ──────────────────────────────────
export interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    category: "Mobile Development",
    icon: "📱",
    skills: ["React Native (Expo)", "Android Studio", "EAS Build", "APK/AAB & IPA Generation"],
  },
  {
    category: "Programming Languages",
    icon: "💻",
    skills: ["JavaScript (ES6+)", "Java", "Python", "SQL", "C", "HTML", "CSS"],
  },
  {
    category: "Frontend",
    icon: "🎨",
    skills: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Express.js", "REST APIs", "SOAP APIs"],
  },
  {
    category: "Databases",
    icon: "🗄️",
    skills: ["MySQL", "Oracle", "MongoDB"],
  },
  {
    category: "APIs & Authentication",
    icon: "🔐",
    skills: ["REST API Integration", "SOAP API Integration", "JWT Authentication", "JSON/XML Validation"],
  },
  {
    category: "Testing",
    icon: "🧪",
    skills: ["Manual Testing", "Functional Testing", "Regression Testing", "API Testing", "UI Testing"],
  },
  {
    category: "Developer Tools",
    icon: "🛠️",
    skills: ["Git", "GitHub", "Postman", "VS Code", "IntelliJ IDEA", "Eclipse", "Firebase", "Advanced Installer"],
  },
  {
    category: "Other Skills",
    icon: "🚀",
    skills: ["FCM Integration", "Prompt Engineering", "AI-Assisted Development", "Technical SEO", "CI/CD Workflows", "Agile/Scrum"],
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────
export interface Project {
  title: string;
  category: "mobile" | "desktop" | "automation" | "web";
  description: string;
  highlights: string[];
  technologies: string[];
  featured: boolean;
  githubUrl?: string;
  /** Relative path to a dedicated detail page (e.g. "/projects/p-gym") */
  detailPagePath?: string;
  /** Download URL for APK (leave undefined until the APK is published) */
  apkUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "P-GYM",
    category: "mobile",
    featured: true,
    detailPagePath: "/projects/p-gym",
    apkUrl: "https://github.com/Shivam-Jais/codewithhustle/releases/download/v1.1.2/app-release.apk",
    description:
      "Full-stack Gym Management Android app with membership subscriptions, Razorpay payments, Firebase push notifications, admin dashboard, and automated expiry reminders.",
    highlights: [
      "Membership & Subscription Management — create, renew, and track gym plans with expiry alerts",
      "Razorpay Payment Integration — secure in-app subscription checkout with receipt verification",
      "Firebase Push Notifications — automated reminders for upcoming subscription expiry",
      "Password Reset via Email — secure token-based password reset flow using Node.js + Nodemailer",
      "Admin Dashboard — view all members, subscription statuses, revenue metrics, and manage plans",
      "Subscription Expiry Reminders — cron-driven backend alerts 3 days before membership expires",
      "Exercise & Gallery Content — categorised exercise library with images and descriptions",
      "Force-Update Support — server-side version gating to ensure users always run the latest build",
    ],
    technologies: ["React Native", "Expo", "JavaScript", "Node.js", "Firebase", "MongoDB", "Razorpay", "REST APIs"],
  },
  {
    title: "ETA Mobile Application",
    category: "mobile",
    featured: true,
    description:
      "Production mobile application for shipment tracking and logistics management with real-time updates and optimized synchronization.",
    highlights: [
      "Built with React Native (Expo), JWT authentication, REST APIs, and Context API",
      "Designed Status, Driver Status, Find, Info, PCOB, and POD modules with real-time local state updates",
      "Implemented foreground/background notification workflows and ACK processing",
      "Refactored application architecture, improved UI/UX and performance",
      "Generated and tested multiple Android APK releases, resolved production bugs",
    ],
    technologies: ["React Native", "Expo", "JWT", "REST APIs", "Context API", "Android"],
  },
  {
    title: "Task Cafe",
    category: "mobile",
    featured: true,
    description:
      "Cross-platform task management application with SOAP API integration, role-based access control, and Firebase push notifications.",
    highlights: [
      "Built with React Native (Expo), SOAP APIs, FCM, and REST API integration across Android and iOS",
      "Implemented task updates, editable dropdowns, assignee mapping, and role-based access",
      "Upgraded project for latest Android SDK requirements, resolved Gradle and TypeScript issues",
      "Configured Firebase, resolved FCM token generation, validated push notification workflows",
      "End-to-end testing across Android and iOS platforms",
    ],
    technologies: ["React Native", "Expo", "SOAP APIs", "Firebase", "FCM", "Android", "iOS"],
  },
  {
    title: "ETA-GIT Desktop Application",
    category: "desktop",
    featured: true,
    description:
      "Git-like desktop application for repository management, collaboration, and synchronization with AI-powered debugging.",
    highlights: [
      "Performed Manual, Functional, Regression, UI, and API Testing for workflows",
      "Collaborated using Claude AI, Gemini AI, and prompt engineering for bug analysis",
      "Investigated Clone, Fetch, Pull, History, and repository synchronization issues",
      "Designed Repository Explorer, collaboration features, and GitHub Desktop-style UI/UX",
      "Built and tested Client & Server EXE releases for multi-user collaboration",
    ],
    technologies: ["Desktop App", "Git", "AI Integration", "Testing", "EXE Releases"],
  },
  {
    title: "ETA Bot Automation System",
    category: "automation",
    featured: false,
    description:
      "Automation system for device data extraction, active user monitoring, and workflow automation.",
    highlights: [
      "Worked on device data extraction and active user monitoring",
      "Assisted in debugging, performance optimization, and system monitoring",
    ],
    technologies: ["Automation", "Monitoring", "Data Extraction"],
  },
  {
    title: "Windows Installer Creation",
    category: "desktop",
    featured: false,
    description:
      "Created and deployed Windows installers (EXE/MSI) for software distribution to 50+ stakeholders.",
    highlights: [
      "Created EXE/MSI installers for software distribution",
      "Validated installation packages and deployment configurations",
      "Distributed to 50+ stakeholders",
    ],
    technologies: ["Advanced Installer", "EXE/MSI", "Deployment"],
  },
  {
    title: "SEO Optimization",
    category: "web",
    featured: false,
    description:
      "Supported technical SEO initiatives and website performance optimization for improved search visibility.",
    highlights: [
      "Contributed to technical SEO and website performance optimization",
      "Content optimization and on-page SEO improvements",
    ],
    technologies: ["Technical SEO", "Performance Optimization", "On-page SEO"],
  },
];

// ─── Soft Skills ─────────────────────────────────────────────────────────────
export const SOFT_SKILLS = [
  { name: "Leadership", description: "Taking initiative and guiding team projects" },
  { name: "Team Collaboration", description: "Working cohesively with peers to achieve common goals" },
  { name: "Effective Communication", description: "Clearly conveying ideas and facilitating discussions" },
  { name: "Problem-Solving", description: "Addressing challenges and finding solutions during projects" },
  { name: "Adaptability", description: "Adjusting to new roles and responsibilities as needed" },
] as const;

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
] as const;
