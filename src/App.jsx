import { useState, useEffect, useRef } from "react";
import profileImage from "./assets/image.png";
import "./App.css";

const EMAIL = "tiwariabhishek1348@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/devabhishektiwari/";

const NAV = ["about", "skills", "ai", "experience", "projects", "contact"];
const NAV_LABELS = { about: "About", skills: "Skills", ai: "AI Stack", experience: "Experience", projects: "Work", contact: "Contact" };

const TYPING_STRINGS = [
  "building RAG chatbots with LangChain",
  "automating workflows with n8n",
  "shipping Python + Node.js services",
  "wiring LLMs into real products",
  "designing event-driven systems",
];

const MARQUEE = ["Python", "LangChain", "n8n", "Vector DBs", "OpenAI", "RAG", "NestJS", "React", "Kafka", "PostgreSQL", "AWS", "Azure", "Docker"];

// Headline skill cards (bento). `span` maps to a grid-column class.
const SKILL_CARDS = [
  {
    key: "ai", span: "span-4", cls: "card-ai", icon: "🧠", kicker: "Core focus",
    title: "LLMs, LangChain & RAG",
    desc: "Retrieval-augmented chatbots and agents that answer from your own data — chunking, embeddings, retrieval, prompt design and tool-calling agents.",
    chips: ["LangChain", "OpenAI APIs", "RAG pipelines", "AI Agents", "Embeddings", "Prompt Engineering", "Function Calling"],
    accent: true,
  },
  {
    key: "python", span: "span-2", cls: "card-python", icon: "🐍", kicker: "Language",
    title: "Python",
    desc: "The glue for AI work — LangChain pipelines, data prep and API services.",
    chips: ["Python", "LangChain", "REST APIs", "Scripting"],
    code: true,
  },
  {
    key: "n8n", span: "span-3", cls: "card-n8n", icon: "⚙️", kicker: "Automation",
    title: "n8n Workflow Automation",
    desc: "Event-driven automations connecting webhooks, LLMs, CRMs and messaging — no brittle glue scripts.",
    chips: ["n8n", "Webhooks", "AI Nodes", "API Integrations", "Scheduled Jobs"],
    flow: true,
  },
  {
    key: "vector", span: "span-3", cls: "card-vector", icon: "🧭", kicker: "Retrieval",
    title: "Vector Databases",
    desc: "Semantic search over documents: embed, index, and fetch the most relevant context for every query.",
    chips: ["Pinecone", "ChromaDB", "pgvector", "Semantic Search", "Similarity Search"],
    vectors: true,
  },
  {
    key: "bot", span: "span-2", icon: "💬", kicker: "Conversational AI",
    title: "Chatbot Integration",
    desc: "Website chat widgets and support bots with knowledge-base answers and human hand-off.",
    chips: ["Chat Widgets", "Support Bots", "Voice AI", "Whisper"],
  },
  {
    key: "backend", span: "span-2", icon: "🛠️", kicker: "Backend",
    title: "Backend & Messaging",
    desc: "Microservices and real-time systems built to scale.",
    chips: ["Node.js", "NestJS", "Express.js", "Kafka", "Socket.io", "IronMQ"],
  },
  {
    key: "frontend", span: "span-2", icon: "🎨", kicker: "Frontend",
    title: "Frontend",
    desc: "Clean, fast interfaces for AI and SaaS products.",
    chips: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    key: "data", span: "span-3", icon: "🗄️", kicker: "Data",
    title: "Databases",
    desc: "Relational, document and cache layers — tuned for real workloads.",
    chips: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    key: "cloud", span: "span-3", icon: "☁️", kicker: "Cloud & DevOps",
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
    name: "AI Customer Support Agent", icon: "🤖",
    desc: "RAG-powered chatbot with knowledge-base search, automated ticket routing and smart escalation.",
    tech: ["Python", "LangChain", "Vector DB", "OpenAI", "React"],
  },
  {
    name: "AI Objection Handling Assistant", icon: "🎯",
    desc: "Real-time AI sales assistant that listens to conversations and surfaces instant response suggestions.",
    tech: ["OpenAI", "Whisper", "React", "NestJS", "PostgreSQL"],
  },
  {
    name: "Multi-Tenant Asset Tracker", icon: "📡",
    desc: "Real-time asset monitoring platform with live updates across distributed tenants.",
    tech: ["Node.js", "Socket.io", "Kafka", "Redis"],
  },
  {
    name: "Car Wash SaaS CRM", icon: "🚗",
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

// ── Hooks ─────────────────────────────────────────────────────
function useTyping(strings, speed = 55, pause = 1600) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = strings[idx % strings.length];
    let t;
    if (!deleting && display === current) t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && display === "") t = setTimeout(() => { setDeleting(false); setIdx(i => i + 1); }, 200);
    else t = setTimeout(() => setDisplay(
      deleting ? current.slice(0, display.length - 1) : current.slice(0, display.length + 1)
    ), deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [display, deleting, idx, strings, speed, pause]);
  return display;
}

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
        <a href="#top" className="logo">abhishek<span>.ai</span></a>
        <ul className="nav-links">
          {NAV.map(id => (
            <li key={id}><a href={`#${id}`} className={active === id ? "active" : ""}>{NAV_LABELS[id]}</a></li>
          ))}
        </ul>
        <a href={`mailto:${EMAIL}`} className="btn btn-primary">Let's talk</a>
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
function Hero() {
  const typed = useTyping(TYPING_STRINGS);
  return (
    <header id="top" className="hero">
      <div className="grid-bg" />
      <div className="container hero-grid">
        <div>
          <div className="status"><span className="pulse" /> Open to AI & automation projects</div>
          <h1>Abhishek<br /><span className="outline">Tiwari</span></h1>
          <p className="hero-role"><strong>Full Stack & AI Engineer</strong> — I build LLM chatbots, RAG pipelines and n8n automations on top of solid, scalable backends.</p>
          <p className="typed">&gt; {typed}<span className="caret" /></p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">See my work →</a>
            <a href="#ai" className="btn">How I build AI</a>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div className="portrait">
            <img src={profileImage} alt="Abhishek Tiwari" />
            <div className="portrait-tag">
              <div><b>Abhishek Tiwari</b>Noida, India</div>
              <div>4+ yrs</div>
            </div>
          </div>
          <div className="float-card float-a"><i>🐍</i><div><b>Python</b>LangChain</div></div>
          <div className="float-card float-b"><i>⚙️</i><div><b>n8n</b>automations</div></div>
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
          <div className="eyebrow">About</div>
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
          eyebrow="Skills"
          title={<>The stack behind <em>intelligent</em> products</>}
          lead="AI and automation up front, backed by the backend, data and cloud experience that keeps it running in production."
        />
        <div className="bento">
          {SKILL_CARDS.map((c, i) => (
            <Reveal key={c.key} className={`card ${c.span} ${c.cls || ""}`} delay={(i % 3) * 80}>
              <div className="card-head">
                <div className="card-icon">{c.icon}</div>
                <span className="card-kicker">{c.kicker}</span>
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
          eyebrow="AI Stack"
          title={<>How a question becomes a <em>grounded</em> answer</>}
          lead="A typical chatbot I build: the UI hands off to an n8n workflow, a Python LangChain service retrieves context from a vector database, and the LLM answers with sources."
        />
        <Reveal>
          <div className="pipeline">
            {PIPELINE.map((s, i) => (
              <div key={s.title} className="stage">
                <div className="stage-num">0{i + 1}</div>
                <div className="stage-icon">{s.icon}</div>
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
        <SectionHead eyebrow="Experience" title={<>Where I've <em>shipped</em></>} />
        <div className="jobs">
          {EXPERIENCE.map(j => (
            <Reveal key={j.company} className="job">
              <div className="job-period">{j.period}{j.current && <><br /><span className="now">● current</span></>}</div>
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
        <SectionHead eyebrow="Selected work" title={<>Things I've <em>built</em></>} />
        <div className="projects">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} className="project" delay={(i % 2) * 100}>
              <div className="project-top">
                <span className="project-icon">{p.icon}</span>
                <span className="project-idx">0{i + 1}</span>
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
        <Reveal className="contact-box">
          <div className="eyebrow">Contact</div>
          <h2>Let's build something smart.</h2>
          <p>Need a RAG chatbot, an n8n automation, or a backend that scales? I'm open to full-time roles, freelance projects and interesting collaborations.</p>
          <div className="contact-actions">
            <a href={`mailto:${EMAIL}`} className="btn btn-dark">Send an email →</a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
          </div>
          <div className="contact-meta">{EMAIL} · Noida, India</div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <div className="container">
      <footer className="footer">
        <span>© {new Date().getFullYear()} Abhishek Tiwari</span>
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
    { from: "bot", text: "Hi! I'm a tiny RAG-style bot trained on this portfolio. Ask me about Abhishek's AI stack, n8n, Python, vector DBs or experience." },
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
        <span className="dot">✦</span> Ask my portfolio
      </button>
    );
  }

  return (
    <div className="bot" role="dialog" aria-label="Portfolio chatbot">
      <div className="bot-head">
        <div><b>Portfolio Assistant</b><span>retrieval demo · runs in your browser</span></div>
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
