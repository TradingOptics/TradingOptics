import React, { useEffect, useRef } from "react";

/* =========================
   TradingView Chart (live)
   ========================= */
const TradingViewChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://s3.tradingview.com/tv.js"]'
    );

    const init = () => {
      // @ts-ignore
      if (typeof TradingView !== "undefined" && containerRef.current) {
        containerRef.current.innerHTML = "";
        // @ts-ignore
        new TradingView.widget({
          autosize: true,
          symbol: "BITSTAMP:BTCUSD", // change to BINANCE:BTCUSDT if you prefer
          interval: "1",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: containerRef.current,
          studies: [],
          withdateranges: true,
          details: false,
          hotlist: false,
          calendar: false,
        });
      }
    };

    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://s3.tradingview.com/tv.js";
      s.async = true;
      s.onload = init;
      document.body.appendChild(s);
    } else {
      init();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: 420, // adjust height if you want taller/shorter
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
      }}
    />
  );
};

/* =========================
   Common UI helpers
   ========================= */
const Max: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({
  children,
  style,
}) => (
  <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", ...style }}>
    {children}
  </div>
);

const Pill: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span
    style={{
      display: "inline-block",
      padding: "8px 14px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.05)",
      fontSize: 14,
      color: "#9ca3af",
    }}
  >
    {children}
  </span>
);

const ButtonLink: React.FC<
  React.PropsWithChildren<{ href: string; style?: React.CSSProperties; targetBlank?: boolean }>
> = ({ href, children, style, targetBlank }) => (
  <a
    href={href}
    target={targetBlank ? "_blank" : undefined}
    rel={targetBlank ? "noreferrer" : undefined}
    style={{
      textDecoration: "none",
      display: "inline-block",
      background:
        "linear-gradient(135deg, rgba(30,223,154,1), rgba(255,224,66,1))",
      color: "#0b0c0f",
      padding: "12px 18px",
      borderRadius: 999,
      fontWeight: 800,
      letterSpacing: 0.4,
      ...style,
    }}
  >
    {children}
  </a>
);

const Card: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({
  children,
  style,
}) => (
  <div
    style={{
      border: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.04)",
      borderRadius: 20,
      padding: 20,
      ...style,
    }}
  >
    {children}
  </div>
);

/* =========================
   Main Landing Page
   ========================= */
const TradingOpticsLanding: React.FC = () => {
  return (
    <main
      style={{
        background:
          "radial-gradient(1200px 700px at 75% 10%, rgba(24, 232, 153, 0.12), transparent 60%), #0b0c0f",
        color: "#e5e7eb",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
      }}
    >
      {/* Sticky Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(8px)",
          background: "rgba(11,12,15,0.65)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Max
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ fontWeight: 900, letterSpacing: 0.5 }}>TradingOptics</div>
          <nav style={{ display: "flex", gap: 20, fontSize: 14, opacity: 0.95 }}>
            <a href="#offerings" style={{ color: "inherit", textDecoration: "none" }}>
              Offerings
            </a>
            <a href="#syllabus" style={{ color: "inherit", textDecoration: "none" }}>
              Syllabus
            </a>
            <a href="#pricing" style={{ color: "inherit", textDecoration: "none" }}>
              Pricing
            </a>
            <a href="#contact" style={{ color: "inherit", textDecoration: "none" }}>
              Contact
            </a>
          </nav>
          <ButtonLink
            href="https://calendly.com/tradingoptics"
            targetBlank
            style={{ padding: "10px 14px" }}
          >
            Book a Session
          </ButtonLink>
        </Max>
      </header>

      {/* HERO + CHART */}
      <section style={{ padding: "42px 0 32px" }}>
        <Max
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: 24,
          }}
        >
          <div>
            <div style={{ marginBottom: 16 }}>
              <Pill>Learn charts the simple, smart way</Pill>
            </div>

            <h1
              style={{
                fontFamily:
                  "Montserrat, ui-sans-serif, system-ui, -apple-system",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: -1.2,
                margin: "0 0 16px",
                fontSize: "clamp(36px, 6vw, 72px)",
              }}
            >
              Master TradingView &<br />
              Technical Analysis
            </h1>

            <p style={{ color: "#a1a1aa", fontSize: 18, maxWidth: 750 }}>
              1-on-1 coaching for beginners, a guided bootcamp, and VIP community
              access. Practical lessons, live chart walk-throughs, and a repeatable
              plan so you stop guessing and start executing.
            </p>

            <div style={{ marginTop: 20 }}>
              <ButtonLink href="https://calendly.com/tradingoptics" targetBlank>
                Book a Session
              </ButtonLink>
            </div>
          </div>

          <Card>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div style={{ color: "#cbd5e1", fontWeight: 600 }}>
                Live Chart • BTC/USD (1m)
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#16a34a",
                  background: "rgba(22, 163, 74, 0.15)",
                  border: "1px solid rgba(22,163,74,0.4)",
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                REAL-TIME
              </div>
            </div>
            <TradingViewChart />
            <p style={{ color: "#9ca3af", fontSize: 14, marginTop: 12 }}>
              We’ll practice directly on TradingView: drawing tools, indicators,
              entries/exits, and risk management.
            </p>
          </Card>
        </Max>
      </section>

      {/* OFFERINGS */}
      <section id="offerings" style={{ padding: "48px 0" }}>
        <Max>
          <h2
            style={{
              fontFamily: "Montserrat",
              fontWeight: 800,
              margin: "0 0 16px",
              fontSize: "clamp(28px, 4.5vw, 44px)",
            }}
          >
            Offerings
          </h2>
          <p style={{ color: "#a1a1aa", marginBottom: 18 }}>
            Choose the learning format that fits you best.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            <Card>
              <h3 style={{ marginTop: 0 }}>1-on-1 Coaching</h3>
              <p style={{ color: "#a1a1aa" }}>
                Private, personalized sessions to build confidence on TradingView
                and trade execution.
              </p>
              <ButtonLink
                href="https://calendly.com/tradingoptics"
                targetBlank
                style={{ marginTop: 8 }}
              >
                Book 1-on-1
              </ButtonLink>
            </Card>

            <Card>
              <h3 style={{ marginTop: 0 }}>Bootcamp</h3>
              <p style={{ color: "#a1a1aa" }}>
                A guided multi-week program covering chart basics, indicators, entries,
                exits, and risk management.
              </p>
              <ButtonLink
                href="https://calendly.com/tradingoptics"
                targetBlank
                style={{ marginTop: 8 }}
              >
                Join the Bootcamp
              </ButtonLink>
            </Card>

            <Card>
              <h3 style={{ marginTop: 0 }}>VIP Community</h3>
              <p style={{ color: "#a1a1aa" }}>
                Ongoing accountability, chart reviews, and strategy refinement with
                a private community.
              </p>
              <ButtonLink
                href="https://calendly.com/tradingoptics"
                targetBlank
                style={{ marginTop: 8 }}
              >
                Apply for VIP
              </ButtonLink>
            </Card>
          </div>
        </Max>
      </section>

      {/* SYLLABUS */}
      <section id="syllabus" style={{ padding: "48px 0" }}>
        <Max>
          <h2
            style={{
              fontFamily: "Montserrat",
              fontWeight: 800,
              margin: "0 0 16px",
              fontSize: "clamp(28px, 4.5vw, 44px)",
            }}
          >
            Syllabus
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            <Card>
              <h4 style={{ marginTop: 0 }}>Week 1 • Foundations</h4>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#a1a1aa" }}>
                <li>TradingView setup & workspace</li>
                <li>Candles, trends, support/resistance</li>
                <li>Chart hygiene & drawing tools</li>
              </ul>
            </Card>
            <Card>
              <h4 style={{ marginTop: 0 }}>Week 2 • Indicators</h4>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#a1a1aa" }}>
                <li>Moving averages, RSI, volume</li>
                <li>Confluence & signal filtering</li>
                <li>Backtesting basics</li>
              </ul>
            </Card>
            <Card>
              <h4 style={{ marginTop: 0 }}>Week 3 • Execution</h4>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#a1a1aa" }}>
                <li>Entry criteria & confirmations</li>
                <li>Stop/targets, R:R planning</li>
                <li>Live chart walk-throughs</li>
              </ul>
            </Card>
            <Card>
              <h4 style={{ marginTop: 0 }}>Week 4 • Your Playbook</h4>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#a1a1aa" }}>
                <li>System rules & journaling</li>
                <li>Scaling plans & routine</li>
                <li>Q&A / next steps</li>
              </ul>
            </Card>
          </div>
        </Max>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "48px 0" }}>
        <Max>
          <h2
            style={{
              fontFamily: "Montserrat",
              fontWeight: 800,
              margin: "0 0 16px",
              fontSize: "clamp(28px, 4.5vw, 44px)",
            }}
          >
            Pricing
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            <Card>
              <h3 style={{ marginTop: 0 }}>Starter</h3>
              <p style={{ color: "#a1a1aa" }}>Perfect for total beginners.</p>
              <ul style={{ margin: "12px 0", paddingLeft: 18, color: "#cbd5e1" }}>
                <li>2× 60-min coaching calls</li>
                <li>TradingView setup</li>
                <li>Basic indicator pack</li>
              </ul>
              <div style={{ fontSize: 28, fontWeight: 800, margin: "8px 0" }}>$199</div>
              <ButtonLink href="https://calendly.com/tradingoptics" targetBlank>
                Book Starter
              </ButtonLink>
            </Card>

            <Card style={{ outline: "2px solid rgba(255,224,66,0.35)" }}>
              <h3 style={{ marginTop: 0 }}>Bootcamp</h3>
              <p style={{ color: "#a1a1aa" }}>Our most popular guided program.</p>
              <ul style={{ margin: "12px 0", paddingLeft: 18, color: "#cbd5e1" }}>
                <li>4 weeks • 1 live call / week</li>
                <li>Homework & reviews</li>
                <li>Community access</li>
              </ul>
              <div style={{ fontSize: 28, fontWeight: 800, margin: "8px 0" }}>$499</div>
              <ButtonLink href="https://calendly.com/tradingoptics" targetBlank>
                Join Bootcamp
              </ButtonLink>
            </Card>

            <Card>
              <h3 style={{ marginTop: 0 }}>VIP</h3>
              <p style={{ color: "#a1a1aa" }}>Accountability & custom playbook.</p>
              <ul style={{ margin: "12px 0", paddingLeft: 18, color: "#cbd5e1" }}>
                <li>8× 60-min sessions</li>
                <li>Personal strategy build-out</li>
                <li>Priority DMs</li>
              </ul>
              <div style={{ fontSize: 28, fontWeight: 800, margin: "8px 0" }}>$1299</div>
              <ButtonLink href="https://calendly.com/tradingoptics" targetBlank>
                Apply for VIP
              </ButtonLink>
            </Card>
          </div>
        </Max>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "48px 0" }}>
        <Max>
          <h2
            style={{
              fontFamily: "Montserrat",
              fontWeight: 800,
              margin: "0 0 16px",
              fontSize: "clamp(28px, 4.5vw, 44px)",
            }}
          >
            Contact
          </h2>

          <Card>
            <p style={{ color: "#a1a1aa", marginTop: 0 }}>
              Questions? Want help choosing a plan? I’d love to hear from you.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <ButtonLink href="mailto:support@tradingoptics.org">Email Support</ButtonLink>
              <ButtonLink href="https://calendly.com/tradingoptics" targetBlank>
                Book a Quick Intro Call
              </ButtonLink>
            </div>
          </Card>
        </Max>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "18px 0",
          color: "#9ca3af",
          fontSize: 14,
        }}
      >
        <Max style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span>© {new Date().getFullYear()} TradingOptics. All rights reserved.</span>
          <span>Made simple. Trade smart.</span>
        </Max>
      </footer>
    </main>
  );
};

export default TradingOpticsLanding;
