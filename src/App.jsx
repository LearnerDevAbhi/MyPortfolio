import { useState, useEffect, useRef } from "react";
import PHOTO from "./assets/profile.jpg";
import "./App.css";

const EMAIL = "tiwariabhishek1348@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/devabhishektiwari/";

const NAV = ["about", "services", "skills", "resume", "work"];
const NAV_LABELS = { about: "About", services: "Services", skills: "Skills", resume: "Resume", work: "Work" };

// Line icons, drawn on a 24×24 grid with a currentColor stroke.
const ICONS = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  arrowUp: <path d="M12 19V5M5 12l7-7 7 7" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  bot: <><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 4v4M9 13v1M15 13v1M9.5 17h5" /></>,
  flow: <><rect x="3" y="4" width="6" height="6" rx="1.5" /><rect x="15" y="14" width="6" height="6" rx="1.5" /><path d="M9 7h4a2 2 0 0 1 2 2v5" /></>,
  server: <><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></>,
  layout: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>,
  database: <><ellipse cx="12" cy="5.5" rx="8" ry="2.5" /><path d="M4 5.5v13c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-13M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" /></>,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  cloud: <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5H7z" />,
  signal: <><circle cx="12" cy="12" r="2" /><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" /></>,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};

function Icon({ name, size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

const SOCIALS = [
  { icon: "linkedin", label: "LinkedIn", href: LINKEDIN },
  { icon: "mail", label: "Email", href: `mailto:${EMAIL}` },
];

const FACTS = [
  { icon: "pin", label: "Based in", value: "Noida, India" },
  { icon: "briefcase", label: "Currently", value: "Senior SWE · Appinventiv" },
  { icon: "clock", label: "Experience", value: "5+ years" },
  { icon: "check", label: "Freelance", value: "Available" },
];

const HERO_BADGES = [
  { icon: "code", label: "Python", cls: "b1" },
  { icon: "spark", label: "LangChain", cls: "b2" },
  { icon: "flow", label: "n8n", cls: "b3" },
];

// Cycled one at a time in the skill spotlight under the hero.
const STACK = [
  { name: "Python", note: "AI services, LangChain pipelines and data prep." },
  { name: "LangChain", note: "RAG chains and tool-calling agents." },
  { name: "n8n", note: "Workflow automations with LLM steps in the middle." },
  { name: "Vector DBs", note: "Pinecone, ChromaDB and pgvector for semantic retrieval." },
  { name: "OpenAI", note: "LLMs, embeddings and Whisper speech-to-text." },
  { name: "RAG", note: "Chatbots grounded in your own documents." },
  { name: "NestJS", note: "Microservices built to scale under real traffic." },
  { name: "React", note: "Fast, clean front-ends for AI and SaaS products." },
  { name: "Kafka", note: "Event-driven pipelines between services." },
  { name: "PostgreSQL", note: "Relational data tuned for real workloads." },
  { name: "AWS", note: "Cloud infrastructure and deploys." },
  { name: "Azure", note: "Hosted NestJS microservices in production." },
  { name: "Docker", note: "Containerised deploys and CI/CD pipelines." },
];
const CYCLE_MS = 2200;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const STATS = [
  { n: "5", sup: "+", label: "Years building production software" },
  { n: "20", sup: "+", label: "Projects shipped" },
  { n: "10K", sup: "+", label: "Daily users served" },
  { n: "6", sup: "", label: "Industries" },
];

const SERVICES = [
  {
    icon: "bot", title: "AI Chatbots & RAG",
    desc: "Chatbots and agents that answer from your own documents — chunking, embeddings, retrieval and tool-calling, with a human hand-off when they're unsure.",
    chips: ["LangChain", "OpenAI", "RAG", "AI Agents"],
  },
  {
    icon: "flow", title: "Workflow Automation",
    desc: "n8n workflows that connect webhooks, LLM steps, CRMs and messaging — lead routing, support triage and reporting that run themselves.",
    chips: ["n8n", "Webhooks", "AI Nodes", "Integrations"],
  },
  {
    icon: "server", title: "Backend & Microservices",
    desc: "NestJS microservices, Kafka event pipelines and Socket.io real-time features, designed for 10K+ daily users.",
    chips: ["Node.js", "NestJS", "Kafka", "Socket.io"],
  },
  {
    icon: "layout", title: "Full-Stack Products",
    desc: "End-to-end SaaS features: React front-ends, clean APIs and containerised deploys on AWS or Azure with CI/CD.",
    chips: ["React", "TypeScript", "Docker", "Azure"],
  },
];

const PIPELINE = [
  { icon: "chat", title: "Chatbot UI", desc: "Website widget or messaging channel captures the question.", chip: "React · Widget" },
  { icon: "flow", title: "n8n Webhook", desc: "Workflow receives the event, enriches it and routes it.", chip: "n8n" },
  { icon: "code", title: "LangChain Chain", desc: "Python service embeds the query and orchestrates the chain.", chip: "Python · LangChain" },
  { icon: "database", title: "Vector DB", desc: "Top-k similar chunks are retrieved from indexed docs.", chip: "Pinecone · pgvector" },
  { icon: "spark", title: "LLM Answer", desc: "Grounded answer with sources; escalate to a human if unsure.", chip: "OpenAI" },
];

const TOOLKIT = [
  { icon: "spark", title: "AI & LLMs", items: ["LangChain", "OpenAI APIs", "RAG pipelines", "AI Agents", "Embeddings", "Prompt Engineering", "Function Calling"] },
  { icon: "flow", title: "Automation & Bots", items: ["n8n", "Webhooks", "AI Nodes", "Chat Widgets", "Support Bots", "Voice AI", "Whisper"] },
  { icon: "search", title: "Vector Search", items: ["Pinecone", "ChromaDB", "pgvector", "Semantic Search", "Similarity Search"] },
  { icon: "server", title: "Backend", items: ["Python", "Node.js", "NestJS", "Express.js", "Kafka", "Socket.io", "IronMQ"] },
  { icon: "layout", title: "Frontend", items: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS"] },
  { icon: "cloud", title: "Data & Cloud", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS", "Azure", "Docker", "Jenkins", "Ansible"] },
];

const EXPERIENCE = [
  {
    role: "Senior Software Engineer", company: "Appinventiv", period: "Mar 2025 – Present", current: true,
    highlights: [
      "Built CRM module for car wash SaaS platform",
      "Designed event-driven notification systems",
      "Developed Azure-hosted NestJS microservices",
      "Improved customer engagement through automation",
    ],
  },
  {
    role: "Software Engineer", company: "DLT Labs", period: "Dec 2023 – Mar 2025",
    highlights: [
      "Built Kafka-based communication systems",
      "Created CI/CD pipelines with Jenkins & Ansible",
      "Improved deployment reliability significantly",
    ],
  },
  {
    role: "Software Engineer", company: "Exdera", period: "Jan 2023 – Dec 2023",
    highlights: [
      "Built real-time notification microservice",
      "Implemented Socket.io for live events",
      "Supported 10K+ daily active users",
    ],
  },
  {
    role: "Software Engineer", company: "Zoxima Solutions", period: "Jul 2021 – Dec 2022",
    highlights: [
      "Built Distributor Management Systems",
      "Kafka integration & MySQL optimization",
      "Enterprise-grade backend services",
    ],
  },
];

const PROJECTS = [
  {
    name: "AI Customer Support Agent", kind: "AI", icon: "bot",
    desc: "RAG-powered chatbot with knowledge-base search, automated ticket routing and smart escalation.",
    tech: ["Python", "LangChain", "Vector DB", "OpenAI", "React"],
  },
  {
    name: "AI Objection Handling Assistant", kind: "AI", icon: "chat",
    desc: "Real-time AI sales assistant that listens to conversations and surfaces instant response suggestions.",
    tech: ["OpenAI", "Whisper", "React", "NestJS", "PostgreSQL"],
  },
  {
    name: "Multi-Tenant Asset Tracker", kind: "Platform", icon: "signal",
    desc: "Real-time asset monitoring platform with live updates across distributed tenants.",
    tech: ["Node.js", "Socket.io", "Kafka", "Redis"],
  },
  {
    name: "Car Wash SaaS CRM", kind: "Platform", icon: "layout",
    desc: "Customer relationship and automation platform powering an entire car wash franchise network.",
    tech: ["NestJS", "PostgreSQL", "Azure"],
  },
];

// Knowledge base for the on-page chatbot. Each chunk is scored by keyword
// overlap with the question — a tiny, local stand-in for vector retrieval.
const KB = [
  { src: "skills/ai.md", keys: ["ai", "llm", "langchain", "rag", "openai", "agent", "agents", "gpt", "embedding", "embeddings", "prompt"],
    text: "Abhishek builds LLM products with LangChain and OpenAI — RAG chatbots, tool-calling agents and prompt pipelines that answer from a company's own data." },
  { src: "skills/python.md", keys: ["python", "py", "script", "scripting", "language", "languages"],
    text: "Python is his go-to for AI work: LangChain chains, document ingestion, embeddings and API services. He also writes TypeScript/JavaScript daily." },
  { src: "skills/n8n.md", keys: ["n8n", "automation", "automate", "workflow", "workflows", "zapier", "webhook", "webhooks", "integration", "integrations"],
    text: "He uses n8n to automate workflows — webhooks in, LLM steps in the middle, CRMs, email and messaging out. Great for lead routing, support triage and reporting." },
  { src: "skills/vector-db.md", keys: ["vector", "vectors", "database", "db", "pinecone", "chroma", "chromadb", "pgvector", "semantic", "search", "similarity"],
    text: "For retrieval he works with vector databases like Pinecone, ChromaDB and pgvector — chunking documents, embedding them and running similarity search for context." },
  { src: "skills/chatbots.md", keys: ["chatbot", "chatbots", "bot", "chat", "widget", "support", "customer", "conversational", "voice", "whisper"],
    text: "He integrates chatbots into websites and support flows: knowledge-base answers, ticket routing, and human escalation. This widget is a small demo of the idea." },
  { src: "experience.md", keys: ["experience", "work", "job", "company", "companies", "appinventiv", "dlt", "exdera", "zoxima", "years", "current", "senior"],
    text: "5+ years: Senior Software Engineer at Appinventiv (Mar 2025–now), previously DLT Labs, Exdera and Zoxima Solutions — SaaS, microservices, Kafka and real-time systems." },
  { src: "skills/backend.md", keys: ["backend", "node", "nodejs", "nestjs", "express", "kafka", "microservices", "socket", "realtime", "api", "apis"],
    text: "On the backend he builds Node.js / NestJS microservices, Kafka event pipelines and Socket.io real-time features, deployed on AWS and Azure with Docker." },
  { src: "projects.md", keys: ["project", "projects", "portfolio", "built", "shipped", "tracker", "crm", "objection", "sales"],
    text: "Highlights: an AI Customer Support Agent (RAG + LangChain), a real-time AI Objection Handling Assistant, a multi-tenant asset tracker, and a car wash SaaS CRM." },
  { src: "contact.md", keys: ["contact", "hire", "email", "reach", "available", "freelance", "linkedin", "location", "where", "noida", "call"],
    text: `He's open to full-time roles and freelance AI/automation projects. Email ${EMAIL} or connect on LinkedIn. Based in Noida, India.` },
];

const BOT_SUGGESTIONS = ["What AI stack do you use?", "Do you use n8n?", "Which vector DBs?", "How can I hire you?"];

function retrieve(question) {
  const words = question.toLowerCase().match(/[a-z0-9]+/g) || [];
  let best = null, bestScore = 0;
  for (const chunk of KB) {
    const score = words.reduce((s, w) => s + (chunk.keys.includes(w) ? 1 : 0), 0);
    if (score > bestScore) { best = chunk; bestScore = score; }
  }
  return best;
}

const pad = n => String(n).padStart(2, "0");

// ── Hooks & primitives ────────────────────────────────────────
function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}

function SectionHead({ eyebrow, title, lead, align = "" }) {
  return (
    <Reveal className={`section-head ${align}`}>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}

// ── Nav ────────────────────────────────────────────────────────
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => { const d = document.documentElement; setP((window.scrollY / (d.scrollHeight - d.clientHeight)) * 100); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="progress" style={{ width: `${p}%` }} />;
}

function NavBar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#top" className="logo">Abhishek<span>.</span></a>
        <ul className="nav-links">
          {NAV.map(id => (
            <li key={id}><a href={`#${id}`} className={active === id ? "active" : ""}>{NAV_LABELS[id]}</a></li>
          ))}
        </ul>
        <a href="#contact" className="btn btn-outline nav-cta">Contact</a>
        <button className="menu-btn" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          {[...NAV, "contact"].map(id => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={() => setOpen(false)}>{NAV_LABELS[id] || "Contact"}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function Hero() {
  return (
    <header id="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="status"><span className="pulse" /> Available for freelance & full-time roles</div>
          <span className="hero-bar" aria-hidden="true" />
          <h1>I'm Abhishek, a Full&nbsp;Stack & <em>AI&nbsp;Engineer</em></h1>
          <p className="hero-lead">
            I build LLM chatbots, RAG pipelines and n8n automations — on backends engineered to scale.
            5+ years shipping SaaS platforms and event-driven systems.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-dark">Let's talk <Icon name="arrow" size={18} /></a>
            <a href="#work" className="btn btn-outline">View my work</a>
          </div>
          <div className="follow">
            <span>Follow me</span>
            <div className="socials">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={s.label}>
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="photo-backdrop" aria-hidden="true" />
          <div className="photo">
            {PHOTO
              ? <img src={PHOTO} alt="Portrait of Abhishek Tiwari" />
              : <div className="photo-placeholder" aria-label="Abhishek Tiwari"><span>AT</span></div>}
            <span className="photo-quote" aria-hidden="true">“</span>
          </div>
          {HERO_BADGES.map(b => (
            <span key={b.label} className={`hero-badge ${b.cls}`}><Icon name={b.icon} size={16} />{b.label}</span>
          ))}
          <div className="exp-card">
            <b>5<sup>+</sup></b>
            <span>Years shipping<br />production software</span>
          </div>
        </div>
      </div>

      <div className="container">
        <dl className="facts">
          {FACTS.map(f => (
            <div key={f.label} className="fact">
              <span className="fact-icon"><Icon name={f.icon} size={18} /></span>
              <div><dt>{f.label}</dt><dd>{f.value}</dd></div>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

// ── Skill spotlight ────────────────────────────────────────────
function StackSpotlight() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(prefersReducedMotion);
  const skill = STACK[active];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive(i => (i + 1) % STACK.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  // Hovering or focusing a chip holds the spotlight on it.
  const hold = i => { setActive(i); setPaused(true); };
  const release = () => setPaused(prefersReducedMotion());

  return (
    <section className="section stack" aria-label="Tech stack">
      <div className="container stack-inner">
        <div className="stack-lead" aria-live="polite">
          <span className="stack-label">Building with</span>
          <div className="stack-word"><span key={skill.name}>{skill.name}</span></div>
          <p className="stack-note" key={`${skill.name}-note`}>{skill.note}</p>
        </div>
        <ul className="stack-grid" onMouseLeave={release} onBlur={release}>
          {STACK.map((s, i) => (
            <li key={s.name}>
              <button
                className={i === active ? "on" : ""}
                aria-pressed={i === active}
                onMouseEnter={() => hold(i)}
                onFocus={() => hold(i)}
                onClick={() => hold(i)}
              >
                <small>{pad(i + 1)}</small>{s.name}
                {i === active && !paused && <i style={{ animationDuration: `${CYCLE_MS}ms` }} />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <Reveal className="about-text">
          <div className="eyebrow">About me</div>
          <h2 className="section-title">Backend engineer who learned to make systems <em>think</em>.</h2>
          <p>I'm a Full Stack Developer with 5+ years designing and shipping <strong>SaaS platforms, microservices and event-driven architectures</strong>.</p>
          <p>Today most of my work sits where that foundation meets AI: <strong>Python & LangChain RAG pipelines, vector search, chatbot integrations and n8n workflow automation</strong> — built to be reliable, observable, and actually useful to the business.</p>
          <a href="#resume" className="text-link">See my experience <Icon name="arrow" size={16} /></a>
        </Reveal>
        <Reveal delay={120}>
          <div className="stats">
            {STATS.map(s => (
              <div key={s.label} className="stat"><b>{s.n}<sup>{s.sup}</sup></b><span>{s.label}</span></div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Services ───────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <SectionHead
          eyebrow="Services"
          title={<>What I can <em>build</em> for you</>}
          lead="AI and automation up front, backed by the backend, data and cloud experience that keeps it running in production."
        />
        <div className="services">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} className="service" delay={(i % 2) * 90}>
              <div className="service-top">
                <span className="service-icon"><Icon name={s.icon} size={24} /></span>
                <span className="service-num">{pad(i + 1)}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="chips">{s.chips.map(c => <span key={c} className="chip">{c}</span>)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── AI pipeline ────────────────────────────────────────────────
function Pipeline() {
  return (
    <section className="section section-dark">
      <div className="container">
        <SectionHead
          eyebrow="How I build AI"
          title={<>How a question becomes a <em>grounded</em> answer</>}
          lead="A typical chatbot I build: the UI hands off to an n8n workflow, a Python LangChain service retrieves context from a vector database, and the LLM answers with sources."
        />
        <Reveal as="ol" className="pipeline">
          {PIPELINE.map((s, i) => (
            <li key={s.title} className="stage">
              <div className="stage-head">
                <span className="stage-icon"><Icon name={s.icon} size={22} /></span>
                <span className="stage-num">Step {pad(i + 1)}</span>
              </div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <span className="chip">{s.chip}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead
          eyebrow="Skills"
          title={<>The <em>toolkit</em> I ship with</>}
          lead="Tools I've used in production, grouped by where they sit in the stack."
        />
        <div className="toolkit">
          {TOOLKIT.map((g, i) => (
            <Reveal key={g.title} className="tool-card" delay={(i % 3) * 80}>
              <div className="tool-head">
                <span className="tool-icon"><Icon name={g.icon} size={20} /></span>
                <h3>{g.title}</h3>
                <span className="tool-count">{pad(g.items.length)}</span>
              </div>
              <ul>{g.items.map(t => <li key={t}>{t}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Resume ─────────────────────────────────────────────────────
function Resume() {
  return (
    <section id="resume" className="section section-alt">
      <div className="container resume-grid">
        <div className="resume-side">
          <SectionHead
            eyebrow="Resume"
            title={<>Where I've <em>shipped</em></>}
            lead="Four companies, one thread: backends that stay up under real traffic — and lately, AI on top of them."
          />
          <Reveal>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="btn btn-outline">Full profile on LinkedIn <Icon name="arrowUpRight" size={16} /></a>
          </Reveal>
        </div>
        <ol className="timeline">
          {EXPERIENCE.map(j => (
            <Reveal as="li" key={j.company} className={`job ${j.current ? "job-current" : ""}`}>
              <span className="job-dot" aria-hidden="true" />
              <div className="job-meta">
                <span className="job-period">{j.period}</span>
                {j.current && <span className="now">Current</span>}
              </div>
              <h3>{j.role}</h3>
              <div className="job-company">{j.company}</div>
              <ul>{j.highlights.map(h => <li key={h}>{h}</li>)}</ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── Work ───────────────────────────────────────────────────────
function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHead eyebrow="Selected work" title={<>Things I've <em>built</em></>} />
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} className={`project kind-${p.kind.toLowerCase()}`} delay={(i % 2) * 100}>
              <div className="project-cover" aria-hidden="true">
                <span className="project-num">{pad(i + 1)}</span>
                <span className="project-icon"><Icon name={p.icon} size={30} /></span>
              </div>
              <div className="project-body">
                <span className="project-kind">{p.kind}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="chips">{p.tech.map(t => <span key={t} className="chip">{t}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact & footer ───────────────────────────────────────────
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="cta">
          <div className="cta-copy">
            <div className="eyebrow">Contact</div>
            <h2>Have a project in mind? Let's build it.</h2>
            <p>Need a RAG chatbot, an n8n automation, or a backend that scales? I'm open to full-time roles, freelance projects and interesting collaborations.</p>
          </div>
          <div className="cta-actions">
            <a href={`mailto:${EMAIL}`} className="btn btn-dark">Send an email <Icon name="arrow" size={18} /></a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="btn btn-ghost">LinkedIn <Icon name="arrowUpRight" size={16} /></a>
            <button className="copy-email" onClick={copy}>
              <Icon name={copied ? "check" : "copy"} size={16} />
              <span>{copied ? "Copied to clipboard" : EMAIL}</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#top" className="logo">Abhishek<span>.</span></a>
        <nav>{NAV.map(id => <a key={id} href={`#${id}`}>{NAV_LABELS[id]}</a>)}</nav>
        <div className="footer-end">
          <span>© {new Date().getFullYear()} Abhishek Tiwari</span>
          <a href="#top" className="to-top" aria-label="Back to top"><Icon name="arrowUp" size={16} /></a>
        </div>
      </div>
    </footer>
  );
}

// ── Chatbot demo ───────────────────────────────────────────────
function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm a tiny RAG-style assistant trained on this portfolio. Ask me about Abhishek's AI stack, n8n, Python, vector DBs or experience." },
  ]);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, thinking]);

  const ask = (q) => {
    const question = q.trim();
    if (!question || thinking) return;
    setMessages(m => [...m, { from: "user", text: question }]);
    setInput("");
    setThinking(true);
    const hit = retrieve(question);
    setTimeout(() => {
      setMessages(m => [...m, hit
        ? { from: "bot", text: hit.text, src: hit.src }
        : { from: "bot", text: `I couldn't find that in my knowledge base — try asking about skills, projects or experience, or email ${EMAIL}.` }]);
      setThinking(false);
    }, 650);
  };

  if (!open) {
    return (
      <button className="bot-launch" onClick={() => setOpen(true)}>
        <Icon name="chat" size={18} /> Ask about me
      </button>
    );
  }

  return (
    <div className="bot" role="dialog" aria-label="Portfolio chatbot">
      <div className="bot-head">
        <span className="bot-avatar"><Icon name="bot" size={18} /></span>
        <div><b>Portfolio assistant</b><span>retrieval demo · runs in your browser</span></div>
        <button className="bot-close" aria-label="Close chat" onClick={() => setOpen(false)}><Icon name="close" size={18} /></button>
      </div>
      <div className="bot-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg msg-${m.from}`}>
            {m.text}
            {m.src && <span className="msg-src">↳ retrieved from {m.src}</span>}
          </div>
        ))}
        {thinking && <div className="msg msg-bot"><span className="typing-dots"><i /><i /><i /></span></div>}
      </div>
      {messages.length < 3 && (
        <div className="bot-suggest">
          {BOT_SUGGESTIONS.map(s => <button key={s} onClick={() => ask(s)}>{s}</button>)}
        </div>
      )}
      <form className="bot-form" onSubmit={e => { e.preventDefault(); ask(input); }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about skills, projects…" aria-label="Your question" />
        <button type="submit" aria-label="Send"><Icon name="arrowUp" size={18} /></button>
      </form>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    [...NAV, "contact"].forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <ScrollProgress />
      <NavBar active={active} />
      <Hero />
      <main>
        <StackSpotlight />
        <About />
        <Services />
        <Pipeline />
        <Skills />
        <Resume />
        <Work />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
