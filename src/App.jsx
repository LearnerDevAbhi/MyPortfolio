import { useState, useEffect, useRef, useId } from "react";
import sorcererImage from "./assets/sorcerer-dusk.jpg";
import "./App.css";

const EMAIL = "tiwariabhishek1348@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/devabhishektiwari/";

const NAV = ["about", "skills", "ai", "experience", "projects", "contact"];
const NAV_LABELS = { about: "About", skills: "Skills", ai: "AI Stack", experience: "Experience", projects: "Work", contact: "Contact" };

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const MARQUEE = ["Python", "LangChain", "n8n", "Vector DBs", "OpenAI", "RAG", "NestJS", "React", "Kafka", "PostgreSQL", "AWS", "Azure", "Docker"];

const SIGIL_RUNES = "PYTHON ✦ LANGCHAIN ✦ N8N ✦ RAG ✦ NESTJS ✦ KAFKA ✦ VECTORS ✦ REACT ✦ OPENAI ✦ AZURE ✦ ";

// Two schools of magic, matching the portrait: gold (engineering) on the
// left hands, arcane blue (AI) on the right, Python at the core binding both.
const SCHOOLS = {
  gold: { name: "School of Craft", sub: "Engineering", tag: "Craft" },
  arcane: { name: "School of the Arcane", sub: "AI & Automation", tag: "Arcane" },
  core: { name: "The Core", sub: "Where both schools meet", tag: "Core" },
};

// One spell per hand. x/y are % positions of each glowing spell circle
// within the image, so the hotspots sit on top of them.
const HANDS = [
  {
    key: "llm", school: "arcane", x: 83.5, y: 13.5, icon: "🧠", name: "LLMs & RAG",
    title: "Conjuring grounded AI",
    desc: "Retrieval-augmented chatbots and tool-calling agents that answer from your own data, backed by vector search.",
    chips: ["LangChain", "OpenAI", "RAG", "Pinecone", "pgvector"],
  },
  {
    key: "backend", school: "gold", x: 20, y: 11, icon: "🛠️", name: "Backend",
    title: "Systems built to scale",
    desc: "NestJS microservices, Kafka event pipelines and Socket.io real-time features serving 10K+ daily users.",
    chips: ["Node.js", "NestJS", "Kafka", "Socket.io"],
  },
  {
    key: "python", school: "core", x: 50.5, y: 59, icon: "🐍", name: "Python",
    title: "The core that binds both",
    desc: "The language at the centre of the craft — LangChain pipelines, ingestion, embeddings and API services.",
    chips: ["Python", "LangChain", "REST APIs", "Scripting"],
  },
  {
    key: "n8n", school: "arcane", x: 92, y: 57.5, icon: "⚙️", name: "n8n & Chatbots",
    title: "Automations that run themselves",
    desc: "Webhooks in, LLM steps in the middle, CRMs and messaging out — plus support bots with human hand-off.",
    chips: ["n8n", "Webhooks", "AI Nodes", "Chat Widgets", "Whisper"],
  },
  {
    key: "cloud", school: "gold", x: 7.5, y: 45.5, icon: "☁️", name: "Cloud & Data",
    title: "The foundation that holds it up",
    desc: "Containerised deploys and CI/CD on AWS and Azure, over PostgreSQL, MongoDB and Redis tuned for real workloads.",
    chips: ["AWS", "Azure", "Docker", "PostgreSQL", "Redis"],
  },
];

// Headline skill cards (bento). `span` maps to a grid-column class.
const SKILL_CARDS = [
  {
    key: "ai", school: "arcane", span: "span-4", cls: "card-ai", icon: "🧠", kicker: "Core focus",
    title: "LLMs, LangChain & RAG",
    desc: "Retrieval-augmented chatbots and agents that answer from your own data — chunking, embeddings, retrieval, prompt design and tool-calling agents.",
    chips: ["LangChain", "OpenAI APIs", "RAG pipelines", "AI Agents", "Embeddings", "Prompt Engineering", "Function Calling"],
    accent: true,
  },
  {
    key: "python", school: "core", span: "span-2", cls: "card-python", icon: "🐍", kicker: "Language",
    title: "Python",
    desc: "The glue for AI work — LangChain pipelines, data prep and API services.",
    chips: ["Python", "LangChain", "REST APIs", "Scripting"],
    code: true,
  },
  {
    key: "n8n", school: "arcane", span: "span-3", cls: "card-n8n", icon: "⚙️", kicker: "Automation",
    title: "n8n Workflow Automation",
    desc: "Event-driven automations connecting webhooks, LLMs, CRMs and messaging — no brittle glue scripts.",
    chips: ["n8n", "Webhooks", "AI Nodes", "API Integrations", "Scheduled Jobs"],
    flow: true,
  },
  {
    key: "vector", school: "arcane", span: "span-3", cls: "card-vector", icon: "🧭", kicker: "Retrieval",
    title: "Vector Databases",
    desc: "Semantic search over documents: embed, index, and fetch the most relevant context for every query.",
    chips: ["Pinecone", "ChromaDB", "pgvector", "Semantic Search", "Similarity Search"],
    vectors: true,
  },
  {
    key: "bot", school: "arcane", span: "span-2", icon: "💬", kicker: "Conversational AI",
    title: "Chatbot Integration",
    desc: "Website chat widgets and support bots with knowledge-base answers and human hand-off.",
    chips: ["Chat Widgets", "Support Bots", "Voice AI", "Whisper"],
  },
  {
    key: "backend", school: "gold", span: "span-2", icon: "🛠️", kicker: "Backend",
    title: "Backend & Messaging",
    desc: "Microservices and real-time systems built to scale.",
    chips: ["Node.js", "NestJS", "Express.js", "Kafka", "Socket.io", "IronMQ"],
  },
  {
    key: "frontend", school: "gold", span: "span-2", icon: "🎨", kicker: "Frontend",
    title: "Frontend",
    desc: "Clean, fast interfaces for AI and SaaS products.",
    chips: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    key: "data", school: "gold", span: "span-3", icon: "🗄️", kicker: "Data",
    title: "Databases",
    desc: "Relational, document and cache layers — tuned for real workloads.",
    chips: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    key: "cloud", school: "gold", span: "span-3", icon: "☁️", kicker: "Cloud & DevOps",
    title: "Cloud & DevOps",
    desc: "Containerised deploys and CI/CD pipelines on AWS and Azure.",
    chips: ["AWS", "Azure", "Docker", "Jenkins", "Ansible"],
  },
];

const PIPELINE = [
  { icon: "💬", title: "Chatbot UI", desc: "Website widget or messaging channel captures the question.", chip: "React · Widget" },
  { icon: "⚙️", title: "n8n Webhook", desc: "Workflow receives the event, enriches it and routes it.", chip: "n8n" },
  { icon: "🐍", title: "LangChain Chain", desc: "Python service embeds the query and orchestrates the chain.", chip: "Python · LangChain" },
  { icon: "🧭", title: "Vector DB", desc: "Top-k similar chunks are retrieved from indexed docs.", chip: "Pinecone · pgvector" },
  { icon: "🧠", title: "LLM Answer", desc: "Grounded answer with sources; escalate to a human if unsure.", chip: "OpenAI" },
];

const AI_CAPS = ["LLM Integration", "AI Agents", "Conversational AI", "RAG Systems", "Workflow Automation", "AI Customer Support", "Voice AI", "AI Sales Assistants"];

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
    name: "AI Customer Support Agent", school: "arcane", icon: "🤖",
    desc: "RAG-powered chatbot with knowledge-base search, automated ticket routing and smart escalation.",
    tech: ["Python", "LangChain", "Vector DB", "OpenAI", "React"],
  },
  {
    name: "AI Objection Handling Assistant", school: "arcane", icon: "🎯",
    desc: "Real-time AI sales assistant that listens to conversations and surfaces instant response suggestions.",
    tech: ["OpenAI", "Whisper", "React", "NestJS", "PostgreSQL"],
  },
  {
    name: "Multi-Tenant Asset Tracker", school: "gold", icon: "📡",
    desc: "Real-time asset monitoring platform with live updates across distributed tenants.",
    tech: ["Node.js", "Socket.io", "Kafka", "Redis"],
  },
  {
    name: "Car Wash SaaS CRM", school: "gold", icon: "🚗",
    desc: "Customer relationship and automation platform powering an entire car wash franchise network.",
    tech: ["NestJS", "PostgreSQL", "Azure"],
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Mehta", role: "CTO, TechLaunch India", avatar: "PM",
    quote: "Abhishek architected our entire event-driven backend from scratch. The system handles 50K+ events/day with zero downtime. Exceptional work.",
  },
  {
    name: "Daniel Krüger", role: "Founder, AutoFlow GmbH", avatar: "DK",
    quote: "His AI integration work transformed our sales process. The objection-handling assistant alone boosted our close rate by 23%.",
  },
  {
    name: "Sneha Kapoor", role: "VP Engineering, Exdera", avatar: "SK",
    quote: "Abhishek delivered the real-time notification microservice ahead of schedule. Clean code, great communication, and solid engineering instincts.",
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
    text: "4+ years: Senior Software Engineer at Appinventiv (Mar 2025–now), previously DLT Labs, Exdera and Zoxima Solutions — SaaS, microservices, Kafka and real-time systems." },
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

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── Hooks & primitives ────────────────────────────────────────
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function SectionHead({ eyebrow, title, lead }) {
  return (
    <Reveal className="section-head">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}

// Mandala-style spell circle. viewBox is centred on 0,0 so each ring
// group can rotate around the origin.
function Sigil({ className = "", runes = true, dusk = false }) {
  const id = useId().replace(/:/g, "");
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  return (
    <svg viewBox="-100 -100 200 200" className={`sigil ${className}`} aria-hidden="true"
      style={dusk ? { "--sg": `url(#dusk-${id})` } : undefined}>
      <defs>
        <linearGradient id={`dusk-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffc46b" />
          <stop offset="0.5" stopColor="#c7a6ff" />
          <stop offset="1" stopColor="#6fa0ff" />
        </linearGradient>
        <path id={`ring-${id}`} d="M -80 0 a 80 80 0 1 1 160 0 a 80 80 0 1 1 -160 0" />
      </defs>
      <g className="sg-outer">
        <circle r="97" strokeWidth="0.6" />
        <circle r="92" strokeWidth="1.4" />
        {ticks.map(a => (
          <line key={a} x1="0" y1="-92" x2="0" y2={a % 30 === 0 ? -85 : -89} transform={`rotate(${a})`} strokeWidth="0.8" />
        ))}
        {runes && (
          <text className="sg-runes">
            <textPath href={`#ring-${id}`} textLength="502" lengthAdjust="spacing">{SIGIL_RUNES}</textPath>
          </text>
        )}
      </g>
      <g className="sg-mid">
        <circle r="72" strokeWidth="1.2" />
        <rect x="-50.9" y="-50.9" width="101.8" height="101.8" strokeWidth="1.1" />
        <rect x="-50.9" y="-50.9" width="101.8" height="101.8" strokeWidth="1.1" transform="rotate(45)" />
      </g>
      <g className="sg-inner">
        <circle r="50.9" strokeWidth="0.9" />
        <polygon points="0,-48 41.6,24 -41.6,24" strokeWidth="0.9" />
        <polygon points="0,48 41.6,-24 -41.6,-24" strokeWidth="0.9" />
        <circle r="22" strokeWidth="1.2" />
        <circle r="5" className="sg-core" />
      </g>
    </svg>
  );
}

// Rising embers across the page, plus sparks that trail the cursor.
function Embers() {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parts = [];
    let w = 0, h = 0, raf = 0;

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    // Left of screen burns gold, right glows arcane blue/violet — like the portrait.
    const hueAt = x => {
      const t = x / w + (Math.random() - 0.5) * 0.25;
      return t < 0.5 ? 30 + Math.random() * 16 : 215 + Math.random() * 50;
    };
    const spawn = (x, y, burst) => parts.push({
      x, y,
      vx: (Math.random() - 0.5) * (burst ? 1.6 : 0.3),
      vy: burst ? (Math.random() - 0.8) * 1.6 : -(0.3 + Math.random() * 0.7),
      life: 0,
      max: burst ? 40 + Math.random() * 30 : 220 + Math.random() * 200,
      size: burst ? 1 + Math.random() * 1.6 : 0.6 + Math.random() * 1.6,
      hue: hueAt(x),
    });
    const onMove = e => { for (let i = 0; i < 2; i++) spawn(e.clientX, e.clientY, true); };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      if (parts.length < 90 && Math.random() < 0.35) spawn(Math.random() * w, h + 10, false);
      ctx.globalCompositeOperation = "lighter";
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        p.x += p.vx + Math.sin((p.life + p.hue) * 0.03) * 0.25;
        p.y += p.vy;
        const t = p.life / p.max;
        if (t >= 1) { parts.splice(i, 1); continue; }
        const a = Math.sin(t * Math.PI);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${a * 0.18})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `hsla(${p.hue + 12}, 100%, 75%, ${a * 0.9})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      }
      if (parts.length > 260) parts.splice(0, parts.length - 260);
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="embers" aria-hidden="true" />;
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
  return (
    <>
      <nav className="nav">
        <a href="#top" className="logo"><Sigil className="logo-sigil" runes={false} dusk /><span className="logo-text">Abhishek<span>.dev</span></span></a>
        <ul className="nav-links">
          {NAV.map(id => (
            <li key={id}><a href={`#${id}`} className={active === id ? "active" : ""}>{NAV_LABELS[id]}</a></li>
          ))}
        </ul>
        <a href="#contact" className="btn btn-primary nav-cta">Open a portal</a>
        <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen(o => !o)}>{open ? "✕" : "☰"}</button>
      </nav>
      {open && (
        <div className="mobile-menu">
          {NAV.map(id => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={() => setOpen(false)}>{NAV_LABELS[id]}</a>
          ))}
        </div>
      )}
    </>
  );
}

// ── Hero ───────────────────────────────────────────────────────
const CYCLE_MS = 3600;

function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(prefersReducedMotion);
  const hand = HANDS[active];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive(i => (i + 1) % HANDS.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  // Picking a hand stops the auto-cycle so the visitor can read it.
  const pick = i => { setActive(i); setPaused(true); };

  return (
    <header id="top" className={`hero school-${hand.school}`}>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="status"><span className="pulse" /> Open to AI & automation projects</div>
          <p className="hero-kicker">Full Stack & AI Engineer · Noida, India</p>
          <h1><span>Abhishek</span><span className="h1-glow">Tiwari</span></h1>
          <p className="hero-lead">
            Two schools, one sorcerer. <em className="gold">Solid engineering</em> in one set of
            hands, <em className="arcane">AI & automation</em> in the other — LLM chatbots, RAG
            pipelines and n8n workflows on backends built to scale.
          </p>

          <div className="spell-panel" aria-live="polite">
            <div className="spell-meta">
              <span>{SCHOOLS[hand.school].name}</span>
              <span className="spell-hint">{ROMAN[active]} / {ROMAN[HANDS.length - 1]}</span>
            </div>
            <div className="spell-body" key={hand.key}>
              <span className="spell-icon">{hand.icon}</span>
              <div>
                <span className="spell-name">{hand.name} · {SCHOOLS[hand.school].sub}</span>
                <h3>{hand.title}</h3>
                <p>{hand.desc}</p>
              </div>
            </div>
            <div className="chips">{hand.chips.map(c => <span key={c} className="chip">{c}</span>)}</div>
            <div className="spell-tabs" role="group" aria-label="Choose a skill">
              {HANDS.map((h, i) => (
                <button key={h.key} className={`school-${h.school} ${i === active ? "on" : ""}`} aria-pressed={i === active} onClick={() => pick(i)}>
                  {i === active && !paused && <i style={{ animationDuration: `${CYCLE_MS}ms` }} />}
                  <span>{h.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">See my work →</a>
            <a href="#ai" className="btn">How I build AI</a>
          </div>
        </div>

        <div className="portrait-wrap">
          <Sigil className="portrait-sigil" dusk />
          <div className="portrait">
            <div className="portrait-img">
              <img src={sorcererImage} alt="Abhishek Tiwari as a sorcerer, casting golden spells with the hands on one side and blue arcane spells with the other" />
            </div>
            {HANDS.map((h, i) => (
              <button
                key={h.key}
                className={`hand school-${h.school} ${i === active ? "active" : ""} ${h.school === "core" || h.x < 12 || h.x > 88 ? "below" : h.x > 50 ? "right" : "left"}`}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                aria-label={`${h.name}: ${h.title}`}
                aria-pressed={i === active}
                onClick={() => pick(i)}
              >
                <span className="hand-ring" />
                {i === active && <Sigil className="hand-sigil" runes={false} />}
                <span className="hand-label">{h.icon} {h.name}</span>
              </button>
            ))}
            <div className="portrait-tag">
              <div><b>Abhishek Tiwari</b>Master of both schools</div>
              <div className="portrait-yrs">4+<small>yrs</small></div>
            </div>
          </div>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>
    </header>
  );
}

// ── About ──────────────────────────────────────────────────────
function About() {
  const stats = [
    { n: "4", sup: "+", label: "Years building production software" },
    { n: "20", sup: "+", label: "Projects shipped" },
    { n: "10K", sup: "+", label: "Daily users served" },
    { n: "6", sup: "", label: "Industries" },
  ];
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <Reveal className="about-text">
          <div className="eyebrow">The Origin</div>
          <h2 className="section-title">Backend engineer who learned to make systems <em>think</em>.</h2>
          <p>I'm a Full Stack Developer with 4+ years designing and shipping <strong>SaaS platforms, microservices and event-driven architectures</strong>.</p>
          <p>Today most of my work sits where that foundation meets AI: <strong>Python & LangChain RAG pipelines, vector search, chatbot integrations and n8n workflow automation</strong> — built to be reliable, observable, and actually useful to the business.</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="stats">
            {stats.map(s => (
              <div key={s.label} className="stat"><b>{s.n}<sup>{s.sup}</sup></b><span>{s.label}</span></div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────
function PythonSnippet() {
  return (
    <div className="code">
      <span className="k">from</span> langchain.chains <span className="k">import</span> RetrievalQA{"\n"}
      {"\n"}
      <span className="c"># ground answers in your docs</span>{"\n"}
      qa = RetrievalQA.<span className="f">from_chain_type</span>({"\n"}
      {"    "}llm=llm, retriever=db.<span className="f">as_retriever</span>(){"\n"}
      ){"\n"}
      qa.<span className="f">invoke</span>(<span className="s">"How do refunds work?"</span>)
    </div>
  );
}

function N8nFlow() {
  const nodes = [["🪝", "Webhook"], ["🧠", "AI Agent"], ["🧭", "Vector Store"], ["📨", "Slack / CRM"]];
  return (
    <div className="flow">
      {nodes.map(([i, label], idx) => (
        <span key={label} style={{ display: "contents" }}>
          <span className="flow-node"><i>{i}</i>{label}</span>
          {idx < nodes.length - 1 && <span className="flow-wire" />}
        </span>
      ))}
    </div>
  );
}

function VectorBars() {
  const rows = [["refund-policy.md #3", 0.92], ["billing-faq.md #1", 0.81], ["shipping.md #7", 0.54]];
  return (
    <div className="vectors">
      {rows.map(([label, score]) => (
        <div key={label} className="vec-row">
          <span>{label}</span><span>{score.toFixed(2)}</span>
          <div className="vec-bar"><div style={{ width: `${score * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead
          eyebrow="The Grimoire"
          title={<>The spells behind <em>intelligent</em> products</>}
          lead="AI and automation up front, backed by the backend, data and cloud experience that keeps it running in production."
        />
        <div className="bento">
          {SKILL_CARDS.map((c, i) => (
            <Reveal key={c.key} className={`card school-${c.school} ${c.span} ${c.cls || ""}`} delay={(i % 3) * 80}>
              <Sigil className="card-sigil" runes={false} />
              <div className="card-head">
                <div className="card-icon">{c.icon}</div>
                <span className="card-kicker">{SCHOOLS[c.school].tag} · {c.kicker}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              {c.code && <PythonSnippet />}
              {c.flow && <N8nFlow />}
              {c.vectors && <VectorBars />}
              <div className="chips">
                {c.chips.map(s => <span key={s} className={`chip ${c.accent ? "chip-accent" : ""}`}>{s}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── AI pipeline ────────────────────────────────────────────────
function AIStack() {
  return (
    <section id="ai" className="section">
      <div className="container">
        <SectionHead
          eyebrow="The Ritual"
          title={<>How a question becomes a <em>grounded</em> answer</>}
          lead="A typical chatbot I build: the UI hands off to an n8n workflow, a Python LangChain service retrieves context from a vector database, and the LLM answers with sources."
        />
        <Reveal>
          <div className="pipeline">
            {PIPELINE.map((s, i) => (
              <div key={s.title} className="stage">
                <div className="stage-orb"><span>{s.icon}</span></div>
                <div className="stage-num">Step {ROMAN[i]}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <span className="chip">{s.chip}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="caps">
          {AI_CAPS.map(c => <span key={c} className="chip">{c}</span>)}
        </Reveal>
      </div>
    </section>
  );
}

// ── Experience ─────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead eyebrow="Timelines" title={<>Every timeline where I've <em>shipped</em></>} />
        <div className="jobs">
          {EXPERIENCE.map((j, i) => (
            <Reveal key={j.company} className={`job ${j.current ? "job-current" : ""}`}>
              <span className="job-orb" />
              <div className="job-period">
                <span className="job-tl">Timeline {ROMAN[EXPERIENCE.length - 1 - i]}</span>
                {j.period}
                {j.current && <span className="now">● current</span>}
              </div>
              <div>
                <h3>{j.role} <span>@ {j.company}</span></h3>
                <ul>{j.highlights.map(h => <li key={h}>{h}</li>)}</ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ───────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead eyebrow="Artifacts" title={<>Things I've <em>built</em></>} />
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} className={`project school-${p.school}`} delay={(i % 2) * 100}>
              <div className="project-top">
                <span className="project-icon"><Sigil className="project-sigil" runes={false} /><i>{p.icon}</i></span>
                <span className="project-idx">Artifact {ROMAN[i]}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="chips">{p.tech.map(t => <span key={t} className="chip">{t}</span>)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ───────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="Testimonials" title={<>What people <em>say</em></>} />
        <div className="quotes">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} className="quote" delay={i * 100}>
              <blockquote>{t.quote}</blockquote>
              <div className="who">
                <div className="avatar">{t.avatar}</div>
                <div><b>{t.name}</b><span>{t.role}</span></div>
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
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="portal">
          <div className="portal-rings" aria-hidden="true">
            <span className="portal-ring" />
            <span className="portal-ring r2" />
            <span className="portal-ring r3" />
          </div>
          <div className="portal-inner">
            <div className="eyebrow">Contact</div>
            <h2>Open a portal.</h2>
            <p>Need a RAG chatbot, an n8n automation, or a backend that scales? I'm open to full-time roles, freelance projects and interesting collaborations.</p>
            <div className="contact-actions">
              <a href={`mailto:${EMAIL}`} className="btn btn-primary">Send an email →</a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
            </div>
            <div className="contact-meta">{EMAIL} · Noida, India</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <div className="container">
      <footer className="footer">
        <span>© {new Date().getFullYear()} Abhishek Tiwari · crafted with many hands</span>
        <nav>{NAV.map(id => <a key={id} href={`#${id}`}>{NAV_LABELS[id]}</a>)}</nav>
      </footer>
    </div>
  );
}

// ── Chatbot demo ───────────────────────────────────────────────
function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Greetings! I'm a tiny RAG-style oracle trained on this portfolio. Ask me about Abhishek's AI stack, n8n, Python, vector DBs or experience." },
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
        <Sigil className="bot-sigil" runes={false} dusk /> Ask the Oracle
      </button>
    );
  }

  return (
    <div className="bot" role="dialog" aria-label="Portfolio chatbot">
      <div className="bot-head">
        <div><b>The Oracle</b><span>retrieval demo · runs in your browser</span></div>
        <button className="bot-close" aria-label="Close chat" onClick={() => setOpen(false)}>✕</button>
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
        <button type="submit" aria-label="Send">↑</button>
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
    NAV.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <div className="cosmos" aria-hidden="true" />
      <Embers />
      <ScrollProgress />
      <NavBar active={active} />
      <Hero />
      <main>
        <About />
        <Skills />
        <AIStack />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
