import React from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    TradingView?: any;
  }
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge">{children}</span>;
}

function SectionTitle({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="section-title">
      {kicker && <div className="mb-8"><Badge>{kicker}</Badge></div>}
      <h2 className="h2">{title}</h2>
      {subtitle && <p className="muted mt-12">{subtitle}</p>}
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <a href="#top" className="logo">
          <svg width="28" height="28" viewBox="0 0 64 64" fill="none" aria-hidden>
            <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#10B981" /><stop offset="100%" stopColor="#FACC15" /></linearGradient></defs>
            <circle cx="32" cy="32" r="28" stroke="url(#g)" strokeWidth="4" />
            <path d="M16 44 C24 38 32 36 48 40" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div>
            <div className="logo-word">TradingOptics</div>
            <div className="logo-tag">Charts as Art · Profits by Design</div>
          </div>
        </a>
        <nav className="nav">
          <a href="#offerings">Offerings</a>
          <a href="#syllabus">Syllabus</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a className="btn" href="https://calendly.com/your-handle/tradingoptics-1on1" target="_blank" rel="noreferrer">Book a Session</a>
        </nav>
      </div>
    </header>
  );
}

/** Live TradingView widget with graceful fallback */
function TVChartLive({ height = 280 }: { height?: number }) {
  const idRef = React.useRef("tv_" + Math.random().toString(36).slice(2));
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    // TradingView script is loaded globally in index.html
    if (!window.TradingView) return;
    try {
      setReady(true);
      // @ts-ignore - TradingView types not installed
      new window.TradingView.widget({
        container_id: idRef.current,
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "60",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1", // candles
        locale: "en",
        toolbar_bg: "#0b0b0b",
        hide_legend: true,
        withdateranges: true,
        allow_symbol_change: true,
        studies: ["MASimple@tv-basicstudies"],
        hide_side_toolbar: false,
        details: false,
        calendar: false,
        // IMPORTANT: render as a widget inside our hero card only
        container: idRef.current
      });
    } catch {
      // If TradingView fails, we just stay with fallback
    }
  }, []);

  if (!ready) {
    // Fallback (same styled card you had, so the UI never looks empty)
    return (
      <div className="chart-card">
        <div className="chart-head">
          <span className="muted">Live Chart • BTC/USDT</span>
          <Badge>BEGINNER-FRIENDLY</Badge>
        </div>
        <div className="chart-area">
          <div className="tag tag-green" style={{ left: 28, bottom: 54 }}>MA Cross ↑</div>
          <div className="tag tag-gold" style={{ right: 28, top: 26 }}>Breakout Zone</div>
          <svg viewBox="0 0 600 260" className="svg-chart" aria-hidden>
            <defs>
              <linearGradient id="gg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#FACC15" />
              </linearGradient>
            </defs>
            <g opacity="0.15">
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={"h"+i} x1="0" y1={i*26} x2="600" y2={i*26} stroke="white" strokeWidth="1"/>
              ))}
            </g>
            {Array.from({ length: 30 }).map((_, i) => {
              const x = 15 + i * 19;
              const h = 40 + Math.floor(100 * Math.abs(Math.sin(i*0.45)));
              const y = 200 - h;
              const up = i % 3 !== 0;
              return (<rect key={i} x={x} y={y} width="10" height={h} rx="2" fill={up ? "#10B981" : "#E11D48"} />);
            })}
            <path d="M0,180 C120,120 240,220 360,150 480,120 540,140 600,110" fill="none" stroke="url(#gg)" strokeWidth="3"/>
          </svg>
        </div>
        <p className="muted mt-12">We’ll practice directly on TradingView: drawing tools, indicators, entries/exits, and risk management.</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <div className="chart-head">
        <span className="muted">Live Chart • BTC/USDT</span>
        <Badge>BEGINNER-FRIENDLY</Badge>
      </div>
      <div id={idRef.current} style={{ height, width: "100%", borderRadius: 12, overflow: "hidden" }} />
      <p className="muted mt-12">We’ll practice directly on TradingView: drawing tools, indicators, entries/exits, and risk management.</p>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero wrap">
      <motion.div variants={container} initial="hidden" animate="show" className="grid2">
        <motion.div variants={item}>
          <Badge>Learn charts the simple, smart way</Badge>
          <h1 className="display">Master TradingView & Technical Analysis</h1>
          <p className="lead">
            1-on-1 coaching for beginners, a guided bootcamp, and VIP community access. Practical lessons, live chart
            walk-throughs, and a repeatable plan so you stop guessing and start executing.
          </p>
          <div className="row gap">
            <a className="btn" href="https://calendly.com/your-handle/tradingoptics-1on1" target="_blank" rel="noreferrer">Start 1-on-1 Coaching</a>
            <a className="btn-outline" href="#syllabus">See Syllabus</a>
          </div>
          <div className="bullets">
            <span>✅ Step-by-step learning path</span>
            <span>⏱️ Fit your schedule</span>
          </div>
        </motion.div>

        <motion.div variants={item}>
          {/* Live TV chart with automatic fallback */}
          <TVChartLive height={280} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Offerings() {
  const cards = [
    {
      t: "1-on-1 Coaching",
      d: "Personalized lessons at your pace. We focus on your goals and build a clean workflow.",
      b: ["TradingView fundamentals", "Simple indicator stack", "Risk & journaling"]
    },
    {
      t: "Beginner Bootcamp",
      d: "Four-week small-group cohort with weekly live sessions and assignments.",
      b: ["Group practice labs", "Live Q&A each week", "Certificate of completion"]
    },
    {
      t: "VIP Discord Access",
      d: "Private community, chart reviews, and ongoing accountability.",
      b: ["Weekly chart threads", "Setups & feedback", "Member resources"]
    }
  ];
  return (
    <section id="offerings" className="wrap section">
      <SectionTitle
        kicker="Programs"
        title="Learn by doing — pick your path"
        subtitle="Every option includes templates, checklists, and session recordings you can review anytime."
      />
      <div className="grid3 mt-24">
        {cards.map((c, i) => (
          <div key={i} className="card">
            <h3 className="h3">{c.t}</h3>
            <p className="mt-12">{c.d}</p>
            <ul className="list mt-16">
              {c.b.map((x, j) => <li key={j}>✔️ {x}</li>)}
            </ul>
            <a className="btn block mt-20" target="_blank" rel="noreferrer" href="https://calendly.com/your-handle/tradingoptics-1on1">Learn more</a>
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
    { w: "Week 4", t: "Playbook & Repetition", topics: ["Setup Checklist", "A/B Review", "Next-step Roadmap"] }
  ];
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section id="syllabus" className="wrap section">
      <SectionTitle kicker="Curriculum" title="Bootcamp Syllabus" subtitle="Four focused weeks to build a clean, repeatable process." />
      <div className="mt-20 column gap">
        {modules.map((m, i) => (
          <div key={i} className="accordion">
            <button className="acc-head" onClick={() => setOpen(open === i ? null : i)}>
              <div><b>{m.w}</b> — {m.t}</div>
              <span className="muted">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div className="acc-body">
                <ul className="list grid3">
                  {m.topics.map((t, j) => <li key={j}>✔️ {t}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Starter 1-on-1", price: "$99", cadence: "/ 60-min session", features: ["Personalized roadmap", "Session recording", "Homework checklist"], key: "starter" },
    { name: "Bootcamp Cohort", price: "$349", cadence: "/ 4 weeks", features: ["Weekly live lessons", "Practice labs", "Certificate"], key: "bootcamp", highlight: true },
    { name: "VIP Discord", price: "$19", cadence: "/ month", features: ["Private channels", "Weekly reviews", "Resources library"], key: "vip" }
  ];
  return (
    <section id="pricing" className="wrap section">
      <SectionTitle kicker="Pricing" title="Straightforward pricing — real value" subtitle="Transparent rates with no fluff. Ask for bundles if you want 1-on-1 + Bootcamp + VIP." />
      <div className="grid3 mt-24">
        {tiers.map((t, i) => (
          <div key={i} className={`card ${t.highlight ? "card-highlight" : ""}`}>
            <div className="between">
              <h3 className="h3">{t.name}</h3>
              {t.highlight && <Badge>Most Popular</Badge>}
            </div>
            <div className="price"><span className="big">{t.price}</span> <span className="muted">{t.cadence}</span></div>
            <ul className="list mt-12">{t.features.map((f, j) => <li key={j}>✔️ {f}</li>)}</ul>
            <a className="btn block mt-20" target="_blank" rel="noreferrer" href="https://calendly.com/your-handle/tradingoptics-1on1">Select plan</a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "Domingo keeps it simple. I finally understand entries, stops, and take-profits without overthinking.", n: "Nora — Student" },
    { q: "The playbook gave me structure. My charts actually look clean now.", n: "Alex — Bootcamp Grad" },
    { q: "VIP feedback threads are gold. Faster improvement than months on my own.", n: "Sam — VIP Member" }
  ];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % items.length), 4500);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="wrap section">
      <SectionTitle kicker="Social Proof" title="What students say" subtitle="Real words from real learners." />
      <div className="card mt-24">
        <div className="stars">★★★★★</div>
        <p className="lead">“{items[i].q}”</p>
        <div className="muted mt-12">— {items[i].n}</div>
        <div className="dots mt-20">
          {items.map((_, j) => <button key={j} className={`dot ${j === i ? "on" : ""}`} onClick={() => setI(j)} aria-label={`Go to ${j+1}`} />)}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Do I need any experience?", a: "Nope. We start from zero and build your skills step by step on real charts." },
    { q: "What tools do we use?", a: "TradingView for charting, plus a simple journaling template. No paid indicators required." },
    { q: "Can I reschedule a session?", a: "Yes—48-hour notice is perfect. We’ll find a time that fits your schedule." },
    { q: "Is this financial advice?", a: "No. This is education only. You’re responsible for your own decisions and outcomes." }
  ];
  return (
    <section id="faq" className="wrap section">
      <SectionTitle kicker="FAQ" title="Quick answers" subtitle="" />
      <div className="grid2 mt-24">
        {faqs.map((f, i) => (
          <div key={i} className="card">
            <h3 className="h3">{f.q}</h3>
            <p className="mt-12">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap between column-sm">
        <div>
          <h3 className="h3">Ready to get started?</h3>
          <p className="muted mt-8">Book a session or join the next bootcamp. We’ll email you a quick questionnaire to tailor your plan.</p>
          <div className="row gap mt-16">
            <a className="btn" target="_blank" rel="noreferrer" href="https://calendly.com/your-handle/tradingoptics-1on1">Book 1-on-1</a>
            <a className="btn-outline" target="_blank" rel="noreferrer" href="mailto:support@tradingoptics.org?subject=TradingOptics%20Inquiry&body=Hi%20Domingo%2C%0A%0AI'm%20interested%20in...">Email Support</a>
          </div>
        </div>
        <div className="card">
          <div className="muted">Contact</div>
          <div className="mt-8">support@tradingoptics.org</div>
          <div className="muted mt-16">Legal</div>
          <p className="muted mt-8 small">Educational content only. Nothing here is financial advice. Markets are risky—manage risk and never trade more than you can afford to lose.</p>
        </div>
      </div>
      <div className="wrap between mt-24 small column-sm">
        <div className="muted">© {new Date().getFullYear()} TradingOptics. All rights reserved.</div>
        <div className="muted">Made with ❤️ by Domingo</div>
      </div>
    </footer>
  );
}

export default function TradingOpticsLanding() {
  return (
    <div className="site">
      <Header />
      <Hero />
      <Offerings />
      <Syllabus />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
