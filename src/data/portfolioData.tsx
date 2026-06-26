import React from "react";
import { Server, Database, Sparkles, Code } from "lucide-react";

// Social & Personal Info
export const PERSONAL_INFO = {
  name: "Bhanu Teja Makkineni",
  role: "Python Full Stack Developer",
  location: "Hyderabad, India",
  email: "bhanutejamakkineni@gmail.com",
  phone: "+91 8328653599",
  socialLinks: {
    github: "https://github.com/bhanuteja449896/",
    linkedin: "https://www.linkedin.com/in/bhanu-teja-makkineni-a65310265",
    portfolio: "https://bhanuteja-portfolio.web.app",
  },
  heroDescription:
    "I design and develop high-performance backend systems, FastAPI and Django services, and polished React interfaces deployed for real-world scale.",
  aboutDescription:
    "Python full stack developer specializing in FastAPI, Django, React.js and SQL, building scalable and secure web applications deployed on AWS. Focused on performance, reliability and real-world problem solving.",
};

// Section 1: Hero Cards
export const HERO_CARDS = [
  {
    title: "Backend APIs",
    meta: "FastAPI / Django / REST",
    icon: <Server className="h-5 w-5" />,
    className: "left-0 top-4 z-30 w-[270px]",
    rotate: -4,
    depth: 60,
    floatDelay: 0,
  },
  {
    title: "Data & Storage",
    meta: "PostgreSQL / SQL / NoSQL",
    icon: <Database className="h-5 w-5" />,
    className: "right-0 top-24 z-20 w-[260px]",
    rotate: 3,
    depth: 110,
    floatDelay: 0.8,
  },
  {
    title: "AI Insights",
    meta: "Natural language + structured systems",
    icon: <Sparkles className="h-5 w-5" />,
    className: "left-10 top-[210px] z-10 w-[280px]",
    rotate: -2,
    depth: 160,
    floatDelay: 1.6,
  },
  {
    title: "Problem Solving",
    meta: "900+ LeetCode Problems Solved",
    icon: <Code className="h-5 w-5" />,
    className: "right-4 top-[320px] z-40 w-[270px]",
    rotate: 4,
    depth: 90,
    floatDelay: 2.2,
  },
];

export const HERO_PILLS = ["FastAPI", "Django", "React.js", "PostgreSQL", "AWS"];

// Section 3: Skills
export const SKILLS_DATA = [
  {
    id: "backend",
    label: "Backend",
    num: "01",
    sub: "Server-side foundations",
    title: "Backend Development",
    skills: ["Python", "FastAPI", "Django", "Express.js"],
  },
  {
    id: "frontend",
    label: "Frontend",
    num: "02",
    sub: "Client-side delivery",
    title: "Frontend Development",
    skills: ["JavaScript", "React.js"],
  },
  {
    id: "database",
    label: "Database",
    num: "03",
    sub: "Data persistence layer",
    title: "Database Engineering",
    skills: ["SQL", "PostgreSQL", "NoSQL"],
  },
  {
    id: "cloud",
    label: "Cloud",
    num: "04",
    sub: "Infrastructure & deployment",
    title: "Cloud & Infrastructure",
    skills: ["AWS (EC2, S3, RDS)"],
  },
  {
    id: "tools",
    label: "Tools",
    num: "05",
    sub: "Development workflow",
    title: "Tools & DevOps",
    skills: ["Git", "GitHub", "Docker", "Postman"],
  },
  {
    id: "core",
    label: "Core CS",
    num: "06",
    sub: "Engineering fundamentals",
    title: "Core Computer Science",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "REST API Design"],
  },
];

// Section 4: Experience
export const EXPERIENCE_CARDS = [
  {
    id: "identity",
    index: "01",
    type: "Identity",
    company: "VarenyamAI",
    role: "Python Full Stack Developer Intern",
    period: "June 2025 – Dec 2025",
    headline: "Full Stack Engineering",
    body: "Worked as a full-stack developer intern building production-grade backend services and responsive web interfaces at an AI-first startup.",
    tags: ["Python", "FastAPI", "React.js", "REST APIs"],
  },
  {
    id: "backend",
    index: "02",
    type: "Backend Impact",
    company: "REST API Performance",
    role: "Python · FastAPI · Optimization",
    period: "API Engineering",
    headline: "30% Faster APIs",
    body: "Designed and optimized RESTful APIs using Python and FastAPI. Profiled bottlenecks, implemented async handlers, and applied response caching — achieving a 30% reduction in average response time.",
    tags: ["Python", "FastAPI", "Async", "Caching"],
    metric: { value: "30%", label: "Faster API Response" },
  },
  {
    id: "frontend",
    index: "03",
    type: "Frontend Impact",
    company: "UI Performance",
    role: "React.js · Optimization · UX",
    period: "Frontend Engineering",
    headline: "25% Faster Page Load",
    body: "Built responsive React.js interfaces with lazy loading, code splitting, and optimized asset delivery — resulting in 25% faster page load times and measurably improved user engagement.",
    tags: ["React.js", "Performance", "Lazy Loading", "UX"],
    metric: { value: "25%", label: "Faster Page Load" },
  },
  {
    id: "stack",
    index: "04",
    type: "Tech Stack",
    company: "Technologies Used",
    role: "Full Stack · Systems · Tooling",
    period: "End-to-End Contribution",
    headline: "Stack & Execution",
    body: "Contributed across the full stack — from API architecture and database design to responsive front-end delivery. Focused on clean code, system-level thinking, and measurable performance outcomes.",
    tags: ["Python", "FastAPI", "React.js", "REST APIs", "Performance Optimization"],
  },
];

// Section 5: Projects
export const PROJECTS_DATA = [
  {
    id: "ai-college",
    index: "01",
    title: "AI-Integrated College Data Management System",
    tagline: "AI-powered college data insights platform",
    description:
      "An AI-powered backend system enabling natural language queries on structured college data. Combines REST API design with intelligent query parsing to dramatically reduce manual effort.",
    metric: { value: "40%", label: "Manual query effort reduction" },
    stack: ["Python", "FastAPI", "REST APIs", "AI Integration", "SQL / NoSQL"],
    accentLabel: "AI · Backend",
  },
  {
    id: "digital-wallet",
    index: "02",
    title: "Digital Wallet Payment System",
    tagline: "Secure digital wallet with real-time transactions",
    description:
      "Built a secure digital wallet system with robust backend validation, real-time transaction handling, and production-oriented deployment on AWS infrastructure.",
    metric: { value: "1000+", label: "Real-time transactions processed" },
    stack: ["Python", "Django", "React.js", "PostgreSQL", "AWS (EC2, S3, RDS)"],
    accentLabel: "FinTech · Full Stack",
  },
  {
    id: "gatepass",
    index: "03",
    title: "College Gatepass Automation System",
    tagline: "Automated gatepass workflow for colleges",
    description:
      "A full-stack automation platform replacing manual workflows with real-time dashboards, role-based access control, and digital approval chains.",
    metric: { value: "90%", label: "Reduction in manual processing time" },
    stack: ["Python", "Django", "React.js", "PostgreSQL"],
    accentLabel: "Automation · Full Stack",
  },
];

// Section 6: Problem Solving
export const PROBLEM_SOLVING_MARQUEE = [
  "Logic",
  "DSA",
  "Pattern Recognition",
  "Consistency",
  "Optimization",
  "Algorithmic Thinking",
  "Data Structures",
  "Problem Solving",
];

export const PROBLEM_SOLVING_INNER_ORBIT = [
  "Arrays",
  "Trees",
  "Greedy",
  "Sliding Window",
  "Recursion",
];

export const PROBLEM_SOLVING_OUTER_ORBIT = [
  "Dynamic Programming",
  "Graphs",
  "Backtracking",
  "Binary Search",
  "Hashing",
];

export const PROBLEM_SOLVING_STATS = {
  leetcodeCount: 900,
};

// Section 7: Achievements (Data extracted but keeping Icons mapping in component)
export const ACHIEVEMENTS_DATA = [
  {
    title: "Tech Community Builder",
    description:
      "Built and scaled a tech community in Hyderabad to 500+ members, organizing technical sessions and workshops.",
    badge: "500+ Members",
    iconKey: "Community",
  },
  {
    title: "Client Project Delivery",
    description:
      "Successfully delivered 2 full-stack projects to US-based clients, meeting production-level requirements.",
    badge: "2+ Client Projects",
    iconKey: "Project",
  },
  {
    title: "Problem Solving Discipline",
    description:
      "Solved 900+ LeetCode problems demonstrating strong algorithmic thinking and consistency.",
    badge: "900+ Problems Solved",
    iconKey: "Code",
  },
];

// Section 8: Education
export const EDUCATION_DATA = {
  degree: "B.Tech in Computer Science & Engineering (IoT)",
  institution: "Malla Reddy College of Engineering and Technology",
  period: "NOV 2022 – MAY 2026",
  cgpa: "9.04",
  certification: {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Certified",
    date: "Issued in 2024",
  },
};
