import { Experience, Education, Service, SkillCategory } from "@/types";

export const profile = {
  name: "Mohammed Ihsan",
  role: "Full Stack MERN Developer",
  location: "Kerala, India",
  email: "mohammed.ihsan.dev@gmail.com",
  socials: {
    github: "https://github.com/mohammed-ihsan-dev",
    linkedin: "https://www.linkedin.com/in/itsihsaney/",
    twitter: "https://x.com/itsihsaney?s=21",
    instagram: "https://instagram.com/_ihsaney",
  },
  resumeUrl: "/Mohammed_Ihsan_Resume.pdf",
  hero: {
    badge: "Open to Opportunities",
    headline: "DESIGNING\nAND ENGINEERING\nDIGITAL PRODUCTS\nTHAT SCALE",
    subheadline: "Full Stack MERN Developer focused on performance, scalability, and creating meaningful user experiences.",
    shortDescription: "Building products, not just websites."
  },
  about: {
    story: "I am a Full Stack Developer specializing in the MERN stack, currently pursuing my Bachelor of Computer Applications (BCA) at IGNOU (2025–2028). I focus on building real-world digital products that combine excellent user experiences with solid software engineering principles.\n\nFrom a Software Developer Intern at Bridgeon Solutions to independent freelance development, I have had the opportunity to build production applications, optimize complex state structures, and design secure API layers. My goal is to make sure every application I build is fast, clean, and highly reliable under production workloads.",
  }
};

export const skillsData: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "Auth & JWT"]
  },
  {
    category: "Database",
    skills: ["MongoDB", "Mongoose", "Caching"]
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Postman", "VS Code", "AWS"]
  }
];

export const experienceData: Experience[] = [
  {
    role: "Software Developer Intern",
    company: "Bridgeon Solutions",
    period: "2025 – Present",
    responsibilities: [
      "Building and delivering production-ready MERN stack web applications.",
      "Implementing secure Role-Based Access Control and authentication flows.",
      "Refactoring slow code paths and database queries to optimize response latency.",
      "Participating in agile workflows, version control processes, and pair-programming reviews."
    ]
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2025 – Present",
    responsibilities: [
      "Translating client business needs into clean, responsive web solutions.",
      "Designing database models and implementing secure integrations.",
      "Overseeing the entire deployment process, including domain management and VPS setups.",
      "Maintaining ongoing post-delivery support and Lighthouse audits."
    ]
  }
];

export const educationData: Education[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "IGNOU",
    period: "2025 – 2028"
  }
];

export const servicesData: Service[] = [
  {
    title: "Full Stack Development",
    description: "End-to-end web product design, architecture, and deployment. Separating modular frontends from secure, stateful backends."
  },
  {
    title: "MERN Development",
    description: "Creating production-grade web applications utilizing MongoDB, Express, React, and Node.js with scalable schemas."
  },
  {
    title: "API Development",
    description: "Designing and implementing fast, secure, and fully documented RESTful APIs with strict validation layers."
  },
  {
    title: "Website Development",
    description: "Crafting beautiful, accessible, and responsive user interfaces using Next.js and modern CSS features."
  },
  {
    title: "Maintenance & Support",
    description: "Auditing application security, updating packages, resolving bugs, and optimizing page load speeds."
  }
];

export interface DetailedProject {
  id: string;
  title: string;
  category: string;
  liveDemo: string;
  github: string;
  highlights: string[];
  technologiesUsed: string[];
  shortDesc: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string;
  gradient: string; // Tailwind gradient classes for screenshots
}

export const detailedProjectsData: DetailedProject[] = [
  {
    id: "zinda-learn",
    title: "Zinda Learn",
    category: "Learning Management System",
    liveDemo: "https://zinda-learn.com",
    github: "https://github.com/mohammed-ihsan-dev/Zinda-Learn-devs",
    highlights: ["RBAC Middleware", "Secure Auth", "Course Builder", "Admin Analytics"],
    technologiesUsed: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT Auth", "CSS3"],
    shortDesc: "A complete learning platform featuring role-based workflows, dynamic student course tracking, and instructor content builder tools.",
    overview: "Zinda Learn is a live Learning Management System (LMS) that simplifies digital learning workflows. The application supports three separate user personas: Students, Instructors, and Administrators. By separating permissions and database actions at the middleware layer, Zinda Learn guarantees secure, structured pathways for course consumption, content creation, and platform management.",
    problem: "LMS products often suffer from loose endpoint security where student accounts can access teacher endpoints, and unstructured database schemas cause slow response rates when loading student profiles with dozens of course progression parameters.",
    solution: "We designed a robust Role-Based Access Control (RBAC) middleware module in Node.js, mapping access levels with bitwise validation rules. The client interface dynamically locks administrative pages depending on these payload claims. To speed up dashboard metrics, we optimized MongoDB aggregate queries, resulting in immediate responses.",
    features: [
      "Role-Based Middleware Validation checking request authentication payloads on each endpoint",
      "Dynamic Instructor Workspace with support for content uploads, draft creation, and enrollment metrics",
      "Student Dashboard tracking active courses, chapter progress, and quiz scoring",
      "Unified Administrator Console with global controls for review moderations and account adjustments"
    ],
    architecture: "The backend is structured as a modular MVC API separating routes, controller callbacks, and database models. The React frontend consumes these services through custom hooks, ensuring that API caching is managed cleanly and page re-renders are minimized.",
    challenges: "Synchronizing student progress with real-time video playback states was a primary challenge. We resolved this by building a debounced state update tracker on the client that periodically posts playback metrics back to the MongoDB tracking schema without overloading the Node.js server with frequent database write operations.",
    gradient: "from-emerald-600 to-teal-950"
  },
  {
    id: "baeby-store",
    title: "BaeBy Store",
    category: "E-Commerce Platform",
    liveDemo: "https://baeby-e-commerce-store.vercel.app/",
    github: "https://github.com/mohammed-ihsan-dev/BaeBy-ecommerce-project",
    highlights: ["Redux Toolkit", "Faceted Search", "Price Integrity", "Mobile Checkout"],
    technologiesUsed: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "Tailwind CSS"],
    shortDesc: "A premium MERN e-commerce application built with Redux state persistence and database-side checkout validations.",
    overview: "BaeBy Store is a modern online shopping platform dedicated to boutique kids' apparel and accessories. Engineered for speed and usability, the application offers recruiters a look at a full e-commerce transactional pipeline, from item discovery to cart state lifecycle management and order processing.",
    problem: "Common challenges in custom e-commerce applications include cart synchronization issues (where items disappear on tab refreshes) and checkout vulnerability exploits, where clients can override product pricing during order submission.",
    solution: "We implemented a Redux Toolkit state slice synced with localStorage for instant item interactions and persistence. To counter pricing vulnerabilities, checkout calculations are executed exclusively on the server. The server reads the product IDs from the client payload, queries the true database prices, and calculates the total order value before calling the payment gateway.",
    features: [
      "Persisted Shopping Cart keeping cart items synced across tab refreshes and active sessions",
      "Secure Server-Side Checkout validation checking prices directly in MongoDB before order completion",
      "Faceted Catalog Filtering allowing users to query by price threshold, category slugs, and age brackets",
      "Fully Responsive Layout optimized for mobile touch targets and rapid checkouts"
    ],
    architecture: "The application relies on Redux Toolkit for global client state coordination. The API uses a token-secured REST architecture, ensuring client calls are safe. Mongoose models are optimized with index rules for faster catalog queries.",
    challenges: "Managing clean state updates when adding items from various detail modules was critical. We overcame this by centralizing all cart modifiers within a unified Redux reducer context, eliminating double-trigger bugs and ensuring visual consistency across the UI.",
    gradient: "from-sky-600 to-blue-950"
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    category: "Developer Portfolio",
    liveDemo: "https://mohammed-ihsan.vercel.app/",
    github: "https://github.com/mohammed-ihsan-dev/Portfolio-Ihsan",
    highlights: ["Next.js 15+", "Lighthouse 100", "TypeScript", "JSON-LD Schema"],
    technologiesUsed: ["Next.js 15+", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    shortDesc: "A high-performance, dark-themed personal showcase built with Next.js Server Components, optimized for maximum speed and SEO indexing.",
    overview: "This developer portfolio showcases Mohammed Ihsan's development philosophy and products. Built using the latest Next.js 15 framework features, it emphasizes clean layout structure, speed, and visual appeal, serving as a primary case study for high-performance frontend architecture.",
    problem: "Many online portfolios are heavy, utilizing massive animation libraries or large asset payloads that result in slow load speeds, hurting recruiter engagement on mobile devices.",
    solution: "We designed a lightweight web asset utilizing Next.js Server Components, static page rendering, and Tailwind CSS. We avoided heavy dependencies, relying instead on clean CSS and Framer Motion micro-interactions. The result is a highly performant application with near-perfect Lighthouse audit scores.",
    features: [
      "Optimized Static Delivery loading basic structure in milliseconds",
      "Dynamic SEO Metadata generating schema markup and dynamic sitemaps",
      "Responsive Glassmorphic Theme adapting gracefully across mobile and desktop viewport ranges",
      "Clean Accessibility (A11y) incorporating aria-attributes and keyboard-accessible anchors"
    ],
    architecture: "Built on Next.js 15's App Router, the project uses Server Components by default to render markup. Interactions are isolated in specialized Client Components. Global styles are defined in a clean Tailwind v4 setup.",
    challenges: "Balancing fluid visual motion with fast page loading times was a priority. We solved this by using native CSS keyframe rules for basic layout animations and deferring Framer Motion loads until after the critical first page paint is finished.",
    gradient: "from-zinc-700 to-zinc-950"
  }
];
