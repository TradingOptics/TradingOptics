import React from "react";
import { createChart, ColorType, CandlestickData, LineData } from "lightweight-charts";

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="to-badge">{children}</span>;
}
function SectionTitle({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="to-section-title">
      {kicker && (<div style={{ marginBottom: 10 }}><Badge>{kicker}</Badge></div>)}
      <h2 className="to-h2">{title}</h2>
      {subtitle && <p className="to-muted">{subtitle}</p>}
    </div>
  );
}

function HeroRight() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const chart = createChart(ref.current, {
      layout: { background: { type: ColorType.Solid, color: "#0A0A0A" }, textColor: "#D1D5DB" },
      grid: { vertLines: { color: "rgba(255,255,255,0.08)" }, horzLines: { color: "rgba(255,255,255,0.08)" } },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
      autoSize: true,
      crosshair: { mode: 0 },
    });
    const candles = chart.addCandlestickSeries({
      upColor: "#10B981", downColor: "#EF4444",
      wickUpColor: "#10B981", wickDownColor: "#EF4444", borderVisible: false,
    });
    const ma = chart.addLineSeries({ color: "#FACC15", lineWidth: 2 });
    const start = Math.floor(Date.now() / 1000) - 120 * 60;
    let price = 30000;
    const data: CandlestickData[] = [];
    for (let i = 0; i < 120; i++) {
      const t = start + i * 60;
      const drift = Math.sin(i / 10) * 50;
      const noise = (Math.random() - 0.5) * 70;
      const open = price;
      const close = Math.max(50, open + drift + noise);
      const high = Math.max(open, close) + Math.random() * 50;
      const low = Math.min(open, close) - Math.random() * 50;
      data.push({ time: t as any, open, high, low, close });
      price = close;
    }
    candles.setData(data);
    const maData: LineData[] = data.map((c, i) => {
      const s = Math.max(0, i - 11);
      const slice = data.slice(s, i + 1);
      const avg = slice.reduce((sum, x) => sum + x.close, 0) / slice.length;
      return { time: c.time, value: avg };
    });
    ma.setData(maData);
    const ro = new ResizeObserver(() => chart.timeScale().fitContent());
    ro.observe(ref.current!);
    chart.timeScale().fitContent();
    return () => { ro.disconnect(); chart.remove(); };
  }, []);
  return (
    <div className="to-card to-glow">
      <div className="to-row to-between">
        <div className="to-muted">Live Chart • BTC/USDT</div>
        <Badge>BEGINNER-FRIENDLY</Badge>
      </div>
      <div ref={ref} className="to-chart" />
      <p className="to-muted" style={{ marginTop: 12 }}>
        We’ll practice directly on TradingView: drawing tools, indicators, entries/exits, and risk management.
      </p>
    </div>
  );
}

function HeroLeft() {
  return (
    <div>
      <div style={{ marginBottom: 12 }}><Badge>Learn charts the simple, smart way</Badge></div>
      <h1 className="to-hero">
        Master TradingView
        <br />& Technical Analysis
      </h1>
      <p className="to-lead">
        1-on-1 coaching for beginners, a guided bootcamp, and VIP community access. Practical lessons,
        live chart walk-throughs, and a repeatable plan so you stop guessing and start executing.
      </p>
      <div className="to-row" style={{ gap: 12, marginTop: 8 }}>
        <div className="to-badge"><span style={{display:'inline-block',width:8,height:8,borderRadius:999,background:'#10B981'}}/> Step-by-step learning path</div>
        <div className="to-badge"><span style={{display:'inline-block',width:8,height:8,borderRadius:999,background:'#FACC15'}}/> Fit your schedule</div>
      </div>
    </div>
  );
}

function Offerings({ calendly }: { calendly: string }) {
  const items = [
    { title: "1-on-1 Coaching", desc: "Personalized lessons at your pace. We focus on your goals and build a clean workflow.", bullets: ["TradingView fundamentals", "Simple indicator stack", "Risk & journaling"] },
    { title: "Beginner Bootcamp", desc: "Four-week small-group cohort with weekly live sessions and assignments.", bullets: ["Group practice labs", "Live Q&A each week", "Certificate of completion"] },
    { title: "VIP Discord Access", desc: "Private community, chart reviews, and ongoing accountability.", bullets: ["Weekly chart threads", "Setups & feedback", "Member resources"] },
  ];
  return (
    <section id="offerings" className="to-section">
      <SectionTitle kicker="Programs" title="Learn by doing — pick your path" subtitle="Templates, checklists, and session recordings included." />
      <div className="to-grid-3">
        {items.map((c, i) => (
          <div key={i} className="to-card">
            <h3 className="to-h2" style={{fontSize:'22px'}}>{c.title}</h3>
            <p className="to-muted">{c.desc}</p>
            <ul className="to-list">
              {c.bullets.map((b, j) => (<li key={j}><span className="to-check">✓</span> {b}</li>))}
            </ul>
            <a className="to-btn to-btn-primary to-block" href={calendly} target="_blank" rel="noreferrer">Learn more</a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Syllabus() {
  const modules = [
    { w: "Week 1", t: "TradingView Fundamentals", topics: ["Layout & Workspaces", "Drawing Tools 101", "Clean Charting Rules"] },
    { w: "Week 2", t: "Indicators & Confluence", topics: ["MA / RSI / Volume", "Finding Confluence", "Entry/Exit Criteria"] },
    { w: "Week 3", t: "Risk Management", topics: ["Stops & Targets", "Position Sizing", "Journaling Template"] },
    { w: "Week 4", t: "Playbook & Repetition", topics: ["Setup Checklist", "A/B Review", "Next-step Roadmap"] },
  ];
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section id="syllabus" className="to-section">
      <SectionTitle kicker="Curriculum" title="Bootcamp Syllabus" subtitle="Four focused weeks to build a clean, repeatable process." />
      <div className="to-stack">
        {modules.map((m, i) => (
          <div key={i} className="to-card">
            <button className="to-row to-between" onClick={() => setOpen(open === i ? null : i)} style={{width:'100%'}}>
              <div>
                <div className="to-strong">{m.w} — {m.t}</div>
                {open !== i && <div className="to-muted to-small">{m.topics.join(" · ")}</div>}
              </div>
              <span className="to-muted">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div style={{marginTop:8}}>
                <ul className="to-grid-3 to-list">
                  {m.topics.map((t, j) => (<li key={j}><span className="to-check">✓</span> {t}</li>))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function useCheckout() {
  const KEY = "to_payment_link_";
  return (key: "starter" | "bootcamp" | "vip") => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(KEY + key) : null;
    const link = stored && /^https?:\/\//i.test(stored)
      ? stored
      : window.prompt(`Paste your Stripe Payment Link for "${key}"`, "https://buy.stripe.com/...");
    if (link && /^https?:\/\//i.test(link)) {
      try { localStorage.setItem(KEY + key, link); } catch {}
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      alert("No Payment Link set.");
    }
  };
}
function Pricing() {
  const buy = useCheckout();
  const tiers = [
    { key: "starter" as const, name: "Starter 1-on-1", price: "$99", cadence: "/ 60-min session", features: ["Personalized roadmap", "Session recording", "Homework checklist"], highlight: false },
    { key: "bootcamp" as const, name: "Bootcamp Cohort", price: "$349", cadence: "/ 4 weeks", features: ["Weekly live lessons", "Practice labs", "Certificate"], highlight: true },
    { key: "vip" as const, name: "VIP Discord", price: "$19", cadence: "/ month", features: ["Private channels", "Weekly reviews", "Resources library"], highlight: false },
  ];
  return (
    <section id="pricing" className="to-section">
      <SectionTitle kicker="Pricing" title="Straightforward pricing — real value" subtitle="Ask for custom bundles if you want 1-on-1 + Bootcamp + VIP." />
      <div className="to-grid-3">
        {tiers.map((t, i) => (
          <div key={i} className={`to-card ${t.highlight ? "to-card-highlight" : ""}`}>
            <div className="to-row to-between">
              <h3 className="to-h2" style={{fontSize:'22px'}}>{t.name}</h3>
              {t.highlight && <Badge>Most Popular</Badge>}
            </div>
            <div className="to-row" style={{ gap: 8, marginTop: 8 }}>
              <div className="to-price">{t.price}</div>
              <div className="to-muted">{t.cadence}</div>
            </div>
            <ul className="to-list">
              {t.features.map((f, j) => (<li key={j}><span className="to-check">✓</span> {f}</li>))}
            </ul>
            <button className="to-btn to-btn-primary to-block" onClick={() => buy(t.key)}>Select plan</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [purpose, setPurpose] = React.useState("General");
  const [message, setMessage] = React.useState("");
  const [note, setNote] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const hp = React.useRef<HTMLInputElement | null>(null);
  const okEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setNote(null); setErr(null);
    if (hp.current?.value) return setErr("Spam blocked.");
    if (!name.trim()) return setErr("Please enter your name.");
    if (!okEmail(email)) return setErr("Please enter a valid email.");
    if (message.trim().length < 10) return setErr("Message is too short — add more detail.");
    const subject = encodeURIComponent(`[TradingOptics] ${purpose} — ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}\nPurpose: ${purpose}`);
    const mailto = `mailto:support@tradingoptics.org?subject=${subject}&body=${body}`;
    setNote("Opening your email app…");
    window.open(mailto, "_blank");
    setName(""); setEmail(""); setMessage("");
  };
  return (
    <section id="contact" className="to-section">
      <SectionTitle kicker="Contact" title="Tell me what you need" subtitle="No spam. I reply within 24 hours on weekdays." />
      <form onSubmit={onSubmit} className="to-card to-form">
        <div className="to-grid-3" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div>
            <label className="to-small">Name</label>
            <input className="to-input" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <label className="to-small">Email</label>
            <input className="to-input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <label className="to-small">Purpose</label>
            <select className="to-input" value={purpose} onChange={e=>setPurpose(e.target.value)}>
              {["General","1-on-1 Coaching","Bootcamp","VIP Discord"].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="to-small">Message</label>
            <textarea className="to-textarea" value={message} onChange={e=>setMessage(e.target.value)} placeholder="How can I help?" />
          </div>
          <input ref={hp} className="to-sr" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="to-row" style={{ gap: 12 }}>
          <button className="to-btn to-btn-primary" type="submit">Send Message</button>
          {note && <span className="to-ok">{note}</span>}
          {err && <span className="to-warn">{err}</span>}
        </div>
      </form>
    </section>
  );
}

export default function TradingOpticsLanding() {
  const CALENDLY_URL = "https://calendly.com/your-handle/tradingoptics-1on1";
  return (
    <div className="to-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@600;700;800;900&display=swap');
      `}</style>
      <header className="to-header">
        <div className="to-container to-row to-between">
          <a href="#top" className="to-brand">TradingOptics</a>
          <nav className="to-nav">
            <a href="#offerings">Offerings</a>
            <a href="#syllabus">Syllabus</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="to-btn to-btn-primary">Book a Session</a>
        </div>
      </header>
      <main id="top" className="to-container to-hero">
        <div className="to-grid-2">
          <HeroLeft />
          <HeroRight />
        </div>
      </main>
      <Offerings calendly={CALENDLY_URL} />
      <Syllabus />
      <Pricing />
      <Contact />
      <footer className="to-footer">
        <div className="to-container to-row to-between to-wrap">
          <div className="to-muted">© {new Date().getFullYear()} TradingOptics. All rights reserved.</div>
          <div className="to-muted">support@tradingoptics.org</div>
        </div>
      </footer>
    </div>
  );
}
