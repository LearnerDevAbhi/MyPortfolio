import { useState, useEffect, useRef } from "react";
import profileImage from "./assets/image.png";

const C = {
  primary: "#06b6d4",
  secondary: "#0891b2",
  light: "#67e8f9",
  dim: "rgba(6,182,212,0.15)",
  dimBorder: "rgba(6,182,212,0.25)",
};

const TYPING_STRINGS = [
  "Building Scalable Systems",
  "AI-Powered Applications",
  "Event-Driven Architectures",
  "Microservices & SaaS",
  "LLM & RAG Solutions",
];

const SKILLS = {
  Frontend: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "NestJS"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  "Cloud & DevOps": ["AWS", "Azure", "Docker", "Jenkins", "Ansible"],
  "Messaging & Realtime": ["Kafka", "Socket.io", "IronMQ"],
  "AI & Automation": ["OpenAI APIs", "LangChain", "RAG Systems", "AI Agents", "Conversational AI", "Workflow Automation"],
};

const SKILL_COLORS = {
  Frontend: "#06b6d4",
  Backend: "#0891b2",
  Databases: "#67e8f9",
  "Cloud & DevOps": "#22d3ee",
  "Messaging & Realtime": "#a5f3fc",
  "AI & Automation": "#0e7490",
};

const EXPERIENCE = [
  {
    role: "Senior Software Engineer", company: "Appinventiv",
    period: "Mar 2025 – Present", color: C.primary,
    highlights: [
      "Built CRM module for car wash SaaS platform",
      "Designed event-driven notification systems",
      "Developed Azure-hosted NestJS microservices",
      "Improved customer engagement through automation",
    ],
  },
  {
    role: "Software Engineer", company: "DLT Labs",
    period: "Dec 2023 – Mar 2025", color: C.secondary,
    highlights: [
      "Built Kafka-based communication systems",
      "Created CI/CD pipelines with Jenkins & Ansible",
      "Improved deployment reliability significantly",
    ],
  },
  {
    role: "Software Engineer", company: "Exdera",
    period: "Jan 2023 – Dec 2023", color: C.light,
    highlights: [
      "Built real-time notification microservice",
      "Implemented Socket.io for live events",
      "Supported 10K+ daily active users",
    ],
  },
  {
    role: "Software Engineer", company: "Zoxima Solutions",
    period: "Jul 2021 – Dec 2022", color: "#22d3ee",
    highlights: [
      "Built Distributor Management Systems",
      "Kafka integration & MySQL optimization",
      "Enterprise-grade backend services",
    ],
  },
];

const PROJECTS = [
  {
    name: "AI Objection Handling Assistant",
    desc: "Real-time AI sales assistant that listens to conversations and surfaces instant response suggestions.",
    tech: ["OpenAI", "Whisper", "React", "NestJS", "PostgreSQL"],
    icon: "🎯", accent: C.primary,
  },
  {
    name: "Multi-Tenant Asset Tracker",
    desc: "Real-time asset monitoring platform with live updates across distributed tenants.",
    tech: ["Node.js", "Socket.io", "Kafka", "Redis"],
    icon: "📡", accent: C.secondary,
  },
  {
    name: "Car Wash SaaS CRM",
    desc: "Customer relationship and automation platform powering an entire car wash franchise network.",
    tech: ["NestJS", "PostgreSQL", "Azure"],
    icon: "🚗", accent: "#22d3ee",
  },
  {
    name: "AI Customer Support Agent",
    desc: "RAG-powered chatbot with knowledge-base search, automated ticket routing and smart escalation.",
    tech: ["OpenAI", "LangChain", "Vector DB", "React"],
    icon: "🤖", accent: C.light,
  },
];

const AI_CAPS = [
  { label: "LLM Integration", icon: "🧠" },
  { label: "AI Agents", icon: "⚡" },
  { label: "Conversational AI", icon: "💬" },
  { label: "RAG Systems", icon: "📚" },
  { label: "Workflow Automation", icon: "🔄" },
  { label: "AI Customer Support", icon: "🎧" },
  { label: "Voice AI", icon: "🎤" },
  { label: "AI Sales Assistants", icon: "💰" },
];

const TESTIMONIALS = [
  {
    name: "Priya Mehta", role: "CTO, TechLaunch India", avatar: "PM", color: C.primary,
    quote: "Abhishek architected our entire event-driven backend from scratch. The system handles 50K+ events/day with zero downtime. Exceptional work.",
  },
  {
    name: "Daniel Krüger", role: "Founder, AutoFlow GmbH", avatar: "DK", color: C.secondary,
    quote: "His AI integration work transformed our sales process. The objection-handling assistant alone boosted our close rate by 23%.",
  },
  {
    name: "Sneha Kapoor", role: "VP Engineering, Exdera", avatar: "SK", color: C.light,
    quote: "Abhishek delivered the real-time notification microservice ahead of schedule. Clean code, great communication, and solid engineering instincts.",
  },
];

// ── Hooks ─────────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

function useTyping(strings, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = strings[idx % strings.length];
    let t;
    if (!deleting && display === current)
      t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && display === "") {
      setDeleting(false); setIdx(i => i + 1); return;
    } else
      t = setTimeout(() => setDisplay(
        deleting ? current.slice(0, display.length - 1) : current.slice(0, display.length + 1)
      ), deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [display, deleting, idx, strings, speed, pause]);
  return display;
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Shared UI ─────────────────────────────────────────────────
function Fade({ children }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.6s ease, transform 0.6s ease",
    }}>{children}</div>
  );
}

function Label({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem" }}>
      <div style={{ width: "24px", height: "1px", background: C.primary }} />
      <span style={{ color: C.primary, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "monospace" }}>{children}</span>
    </div>
  );
}

function Btn({ href, children, primary }) {
  const base = {
    padding: "11px 24px", borderRadius: "6px", textDecoration: "none",
    fontWeight: 600, fontSize: "13px", fontFamily: "monospace",
    cursor: "pointer", transition: "all 0.2s", display: "inline-block",
  };
  const s = primary
    ? { ...base, background: `linear-gradient(135deg,${C.primary},${C.secondary})`, color: "#000", border: "none" }
    : { ...base, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" };
  return (
    <a href={href} style={s}
      onMouseEnter={e => {
        if (primary) { e.currentTarget.style.boxShadow = `0 8px 28px ${C.dim}`; e.currentTarget.style.transform = "translateY(-2px)"; }
        else { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = "";
        if (!primary) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }
      }}
    >{children}</a>
  );
}

// ── ScrollProgress ─────────────────────────────────────────────
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => { const d = document.documentElement; setP((window.scrollY / (d.scrollHeight - d.clientHeight)) * 100); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div style={{ position: "fixed", top: 0, left: 0, height: "2px", zIndex: 200, background: `linear-gradient(90deg,${C.primary},${C.light})`, width: `${p}%`, transition: "width 0.1s" }} />;
}

// ── NavBar ─────────────────────────────────────────────────────
function NavBar({ active }) {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["about", "skills", "experience", "projects", "ai", "contact"];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? "rgba(9,9,11,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
        borderBottom: scrolled || menuOpen ? `1px solid ${C.dimBorder}` : "none",
        transition: "all 0.3s",
        padding: isMobile ? "0 1.5rem" : "0 4rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px",
      }}>
        <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "18px", color: "#fff" }}>
          AT<span style={{ color: C.primary }}>.</span>
        </span>

        {isMobile ? (
          <button onClick={() => setMenuOpen(o => !o)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#fff", fontSize: "22px", padding: "4px",
          }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        ) : (
          <div style={{ display: "flex", gap: "2.5rem" }}>
            {links.map(l => (
              <a key={l} href={`#${l}`} style={{
                color: active === l ? C.primary : "#fff",
                textDecoration: "none", fontSize: "13px", fontWeight: 500,
                textTransform: "capitalize", transition: "color 0.2s", fontFamily: "monospace",
              }}
                onMouseEnter={e => { if (active !== l) e.target.style.color = C.light; }}
                onMouseLeave={e => { if (active !== l) e.target.style.color = "#fff"; }}
              >{l}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99,
          background: "rgba(9,9,11,0.97)", borderBottom: `1px solid ${C.dimBorder}`,
          display: "flex", flexDirection: "column", padding: "1rem 1.5rem 1.5rem",
          gap: "0",
        }}>
          {links.map(l => (
            <a key={l} href={`#${l}`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: active === l ? C.primary : "rgba(255,255,255,0.7)",
                textDecoration: "none", fontSize: "15px", fontWeight: 500,
                textTransform: "capitalize", fontFamily: "monospace",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >{l}</a>
          ))}
        </div>
      )}
    </>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function HeroSection() {
  const isMobile = useIsMobile();
  const typed = useTyping(TYPING_STRINGS);

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: isMobile ? "100px 1.5rem 4rem" : "0 6rem",
      position: "relative",
      overflow: "hidden",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: isMobile ? "center" : "flex-start",
      textAlign: isMobile ? "center" : "left",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at ${isMobile ? "50% 30%" : "70% 50%"}, ${C.dim} 0%, transparent 60%)`,
        pointerEvents: "none",
      }} />

      {/* Left / Top content */}
      <div style={{ flex: 1, zIndex: 1, width: "100%" }}>
        {/* <div style={{
          width: isMobile ? "120px" : "160px",
          height: isMobile ? "120px" : "160px",
          borderRadius: "50%",
          border: `2px solid ${C.dimBorder}`,
          overflow: "hidden",
          margin: isMobile ? "0 auto 1.5rem" : "0 0 2rem",
          background: C.dim,
          boxShadow: `0 0 50px ${C.dim}`,
        }}>
          <img src="/abhishek.jpg" alt="Abhishek Tiwari"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;font-weight:800;color:${C.primary}">AT</div>`;
            }}
          />
        </div> */}

        <h1 style={{
          fontSize: isMobile ? "clamp(3rem,14vw,4.5rem)" : "clamp(3.5rem,8vw,7rem)",
          fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.0,
          color: "#fff", margin: "0 0 1.5rem",
        }}>
          Abhishek<br />Tiwari
        </h1>

        <p style={{
          fontFamily: "monospace",
          fontSize: isMobile ? "13px" : "clamp(0.8rem,1.4vw,0.95rem)",
          color: "rgba(255,255,255,0.45)", lineHeight: 2.0,
          margin: isMobile ? "0 auto 1.5rem" : "0 0 1.5rem",
          maxWidth: isMobile ? "320px" : "400px",
        }}>
          Full Stack Developer &amp; AI Integration Specialist.<br />
          Building scalable systems and intelligent AI-powered solutions.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2rem", justifyContent: isMobile ? "center" : "flex-start" }}>
          <span style={{ color: C.primary, fontFamily: "monospace" }}>&gt; _</span>
          <span style={{ color: C.primary, fontFamily: "monospace", fontSize: isMobile ? "13px" : "15px" }}>{typed}</span>
          <span style={{ color: C.primary, animation: "blink 1s step-end infinite", fontFamily: "monospace" }}>|</span>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
          <Btn href="#projects" primary>View Projects</Btn>
          <Btn href="mailto:tiwariabhishek1348@gmail.com">Contact Me</Btn>
        </div>
      </div>

      {/* Ghost initials — hidden on mobile */}
      {/* {!isMobile && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", zIndex: 1, userSelect: "none" }}>
          <div style={{
            fontSize: "clamp(10rem,20vw,20rem)", fontWeight: 900,
            letterSpacing: "-0.05em", lineHeight: 1,
            background: `linear-gradient(160deg,rgba(255,255,255,0.1) 0%,rgba(6,182,212,0.06) 50%,rgba(6,182,212,0.12) 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 10px 40px ${C.dim})`,
          }}>AT</div>
        </div>
      )} */}
      {!isMobile && (
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          justifyContent: "flex-end", zIndex: 1,
        }}>
          <div style={{
            width: "480px", height: "580px",
            borderRadius: "20px",
            overflow: "hidden",
            border: `1px solid ${C.dimBorder}`,
            boxShadow: `0 0 80px ${C.dim}, 0 40px 80px rgba(0,0,0,0.4)`,
            position: "relative",
          }}>
            <img
              src={profileImage}
              alt="Abhishek Tiwari"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              onError={e => {
                e.target.style.display = "none";
                e.target.parentNode.style.background = C.dim;
                e.target.parentNode.innerHTML += `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem;font-weight:800;color:${C.primary}">AT</div>`;
              }}
            />
            {/* subtle bottom fade */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
              background: "linear-gradient(to top, #09090b 0%, transparent 100%)",
              pointerEvents: "none",
            }} />
          </div>
        </div>
      )}
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────
function AboutSection() {
  const isMobile = useIsMobile();
  const stats = [
    { n: "4+", label: "Years Experience" },
    { n: "20+", label: "Projects Shipped" },
    { n: "10K+", label: "Users Served" },
    { n: "6", label: "Industries" },
  ];
  return (
    <section id="about" style={{ padding: isMobile ? "5rem 1.5rem" : "7rem 6rem" }}>
      <Fade>
        <Label>About Me</Label>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "2.5rem" : "5rem",
          alignItems: "center", marginTop: "2.5rem",
        }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: 300, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 1.5rem", lineHeight: 1.2 }}>
              Engineering systems that<br />
              <span style={{ color: C.primary }}>scale and think</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.9, fontSize: "14px", marginBottom: "1rem", fontFamily: "monospace" }}>
              I'm a Full Stack Developer with 4+ years designing and shipping scalable SaaS platforms, microservices, event-driven architectures, and AI-powered products.
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.9, fontSize: "14px", fontFamily: "monospace" }}>
              My work spans from high-throughput Kafka systems to LangChain RAG pipelines — always with a focus on reliability, developer experience, and real business impact.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {stats.map(s => (
              <div key={s.label} style={{
                padding: "1.5rem", borderRadius: "10px",
                background: C.dim, border: `1px solid ${C.dimBorder}`,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.18)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.dim; e.currentTarget.style.transform = ""; }}
              >
                <div style={{ fontSize: "2rem", fontWeight: 700, color: C.primary, fontFamily: "monospace", letterSpacing: "-0.04em" }}>{s.n}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px", fontFamily: "monospace" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────
function SkillsSection() {
  const isMobile = useIsMobile();
  return (
    <section id="skills" style={{ padding: isMobile ? "5rem 1.5rem" : "7rem 6rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <Fade>
        <Label>Tech Stack</Label>
        <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: 300, color: "#fff", letterSpacing: "-0.03em", margin: "0.5rem 0 2.5rem" }}>
          Tools I build with
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px,1fr))", gap: "1rem" }}>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} style={{
              padding: "1.25rem", borderRadius: "10px",
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.dimBorder; e.currentTarget.style.background = C.dim; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.75rem" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: SKILL_COLORS[cat] }} />
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "monospace" }}>{cat}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {items.map(s => (
                  <span key={s} style={{
                    padding: "4px 10px", borderRadius: "4px", fontSize: "12px",
                    background: `${SKILL_COLORS[cat]}15`, color: SKILL_COLORS[cat],
                    border: `1px solid ${SKILL_COLORS[cat]}30`, fontFamily: "monospace",
                  }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Fade>
    </section>
  );
}

// ── Experience ─────────────────────────────────────────────────
function ExperienceSection() {
  const isMobile = useIsMobile();
  return (
    <section id="experience" style={{ padding: isMobile ? "5rem 1.5rem" : "7rem 6rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <Fade>
        <Label>Experience</Label>
        <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: 300, color: "#fff", letterSpacing: "-0.03em", margin: "0.5rem 0 2.5rem" }}>
          Where I've built things
        </h2>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "10px", top: "8px", bottom: "8px", width: "1px", background: C.dimBorder }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} style={{ display: "flex", gap: isMobile ? "1rem" : "2rem" }}>
                <div style={{ flexShrink: 0, paddingTop: "4px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: `${exp.color}20`, border: `2px solid ${exp.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: exp.color }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "6px", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ color: "#fff", fontWeight: 600, fontSize: isMobile ? "15px" : "16px", margin: 0 }}>{exp.role}</h3>
                      <span style={{ color: exp.color, fontSize: "13px", fontFamily: "monospace" }}>{exp.company}</span>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", fontFamily: "monospace", background: C.dim, padding: "3px 10px", borderRadius: "20px", border: `1px solid ${C.dimBorder}` }}>{exp.period}</span>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "5px" }}>
                    {exp.highlights.map((h, j) => (
                      <li key={j} style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", display: "flex", gap: "8px", fontFamily: "monospace" }}>
                        <span style={{ color: C.primary, flexShrink: 0 }}>›</span>{h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
}

// ── Projects ───────────────────────────────────────────────────
function ProjectsSection() {
  const isMobile = useIsMobile();
  return (
    <section id="projects" style={{ padding: isMobile ? "5rem 1.5rem" : "7rem 6rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <Fade>
        <Label>Featured Projects</Label>
        <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: 300, color: "#fff", letterSpacing: "-0.03em", margin: "0.5rem 0 2.5rem" }}>
          Things I've shipped
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(280px,1fr))",
          gap: "1px", background: "rgba(255,255,255,0.06)",
          borderRadius: "12px", overflow: "hidden",
        }}>
          {PROJECTS.map((p, i) => (
            <div key={i} style={{ padding: isMobile ? "1.5rem" : "2rem", background: "#09090b", transition: "background 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.background = C.dim}
              onMouseLeave={e => e.currentTarget.style.background = "#09090b"}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{p.icon}</div>
              <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "15px", margin: "0 0 0.5rem" }}>{p.name}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", lineHeight: 1.8, margin: "0 0 1rem", fontFamily: "monospace" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    padding: "3px 9px", borderRadius: "4px",
                    background: `${p.accent}12`, color: p.accent,
                    fontSize: "11px", fontWeight: 500, fontFamily: "monospace",
                    border: `1px solid ${p.accent}25`,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Fade>
    </section>
  );
}

// ── AI Section ─────────────────────────────────────────────────
function AISection() {
  const isMobile = useIsMobile();
  return (
    <section id="ai" style={{
      padding: isMobile ? "5rem 1.5rem" : "7rem 6rem",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      background: `linear-gradient(180deg,transparent,${C.dim},transparent)`,
    }}>
      <Fade>
        <Label>AI Expertise</Label>
        <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: 300, color: "#fff", letterSpacing: "-0.03em", margin: "0.5rem 0 0.75rem" }}>
          Engineering the future with AI
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", fontFamily: "monospace", maxWidth: "480px", marginBottom: "2.5rem", lineHeight: 1.9 }}>
          From LLM integrations to production-grade RAG pipelines — I build AI systems that solve real problems.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit,minmax(200px,1fr))",
          gap: "1px", background: C.dimBorder, borderRadius: "10px", overflow: "hidden",
        }}>
          {AI_CAPS.map((cap, i) => (
            <div key={i} style={{
              padding: isMobile ? "1rem" : "1.5rem", background: "#09090b",
              display: "flex", alignItems: "center", gap: "10px",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = C.dim}
              onMouseLeave={e => e.currentTarget.style.background = "#09090b"}
            >
              <span style={{ fontSize: "1.1rem" }}>{cap.icon}</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: isMobile ? "12px" : "13px", fontFamily: "monospace" }}>{cap.label}</span>
            </div>
          ))}
        </div>
      </Fade>
    </section>
  );
}

// ── Testimonials ───────────────────────────────────────────────
function TestimonialsSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? "5rem 1.5rem" : "7rem 6rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <Fade>
        <Label>Testimonials</Label>
        <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", fontWeight: 300, color: "#fff", letterSpacing: "-0.03em", margin: "0.5rem 0 2.5rem" }}>
          What people say
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(260px,1fr))", gap: "1rem" }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              padding: "1.5rem", borderRadius: "10px",
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              display: "flex", flexDirection: "column", gap: "1rem", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.dimBorder; e.currentTarget.style.background = C.dim; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
            >
              <div style={{ color: C.primary, fontSize: "2rem", lineHeight: 1, fontFamily: "monospace" }}>"</div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", lineHeight: 1.9, margin: 0, flex: 1, fontFamily: "monospace" }}>{t.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", borderTop: `1px solid ${C.dimBorder}`, paddingTop: "1rem" }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  background: `${t.color}20`, border: `1px solid ${t.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "10px", fontWeight: 700, color: t.color, fontFamily: "monospace", flexShrink: 0,
                }}>{t.avatar}</div>
                <div>
                  <div style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>{t.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", fontFamily: "monospace" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fade>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────
function ContactSection() {
  const isMobile = useIsMobile();
  return (
    <section id="contact" style={{
      padding: isMobile ? "5rem 1.5rem" : "7rem 6rem",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      background: `linear-gradient(180deg,transparent,${C.dim})`,
    }}>
      <Fade>
        <div style={{ maxWidth: "560px" }}>
          <Label>Contact</Label>
          <h2 style={{ fontSize: "clamp(1.8rem,4.5vw,3rem)", fontWeight: 300, color: "#fff", letterSpacing: "-0.04em", margin: "0.5rem 0 1rem", lineHeight: 1.1 }}>
            Let's build something<br />
            <span style={{ color: C.primary }}>amazing together</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", fontFamily: "monospace", marginBottom: "2rem", lineHeight: 1.9 }}>
            Open to full-time roles, freelance projects, and interesting collaborations.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <Btn href="mailto:tiwariabhishek1348@gmail.com" primary>Send an Email</Btn>
            <Btn href="https://www.linkedin.com/in/devabhishektiwari/">LinkedIn Profile</Btn>
          </div>
          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", fontFamily: "monospace" }}>
            tiwariabhishek1348@gmail.com · Noida, India
          </div>
        </div>
      </Fade>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ borderTop: `1px solid ${C.dimBorder}`, padding: isMobile ? "1.5rem" : "2rem 6rem" }}>
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center",
        gap: "1rem",
      }}>
        <span style={{ fontFamily: "monospace", fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>
          AT<span style={{ color: C.primary }}>.</span>
        </span>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", fontFamily: "monospace" }}>© 2025 Abhishek Tiwari</span>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {["about", "skills", "experience", "projects", "ai", "contact"].map(l => (
            <a key={l} href={`#${l}`} style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: "12px", textTransform: "capitalize", fontFamily: "monospace", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.primary}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Root ───────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const ids = ["hero", "about", "skills", "experience", "projects", "ai", "contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.2 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "#09090b", minHeight: "100vh", fontFamily: "'Inter',-apple-system,sans-serif", color: "#fff", overflowX: "hidden", width: "100%" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{margin:0;padding:0;overflow-x:hidden}
        html{scroll-behavior:smooth}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#09090b}
        ::-webkit-scrollbar-thumb{background:${C.primary}44;border-radius:2px}
      `}</style>
      <ScrollProgress />
      <NavBar active={active} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <AISection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
