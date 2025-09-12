import React from "react";
import "./styles.css";

/** Navigation bar */
function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">TradingOptics</span>
      </div>
      <div className="nav-right">
        <a href="#offerings">Offerings</a>
        <a href="#syllabus">Syllabus</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
        {/* Calendly button (no external Button component) */}
        <a
          href="https://calendly.com/tradingoptics"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Book a Session
        </a>
      </div>
    </nav>
  );
}

/** LIVE TradingView Advanced Chart (1-minute) */
function TVChartLive({ height = 520 }: { height?: number }) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "COINBASE:BTCUSD", // change to "BINANCE:BTCUSDT" if you prefer
      interval: "1",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      hide_top_toolbar: false,
      hide_legend: true,
      withdateranges: true,
      allow_symbol_change: true,
      calendar: false,
      studies: [],
      support_host: "https://www.tradingview.com"
    });

    const widgetHost = document.createElement("div");
    widgetHost.className = "tradingview-widget-container__widget";
    widgetHost.style.width = "100%";
    widgetHost.style.height = `${height}px`;

    const outer = document.createElement("div");
    outer.className = "tradingview-widget-container";
    outer.style.width = "100%";
    outer.appendChild(widgetHost);
    outer.appendChild(script);

    containerRef.current.appendChild(outer);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [height]);

  return (
    <div className="chart-card">
      <div className="chart-head">
        <span className="muted">Live Chart • BTC/USD (1m)</span>
        <span className="badge">REAL-TIME</span>
      </div>
      <div ref={containerRef} style={{ width: "100%", minHeight: height }} />
      <p className="muted mt-12">
        We’ll practice directly on TradingView: drawing tools, indicators,
        entries/exits, and risk management.
      </p>
    </div>
  );
}

/** Hero section */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <span className="tagline">Learn charts the simple, smart way</span>
        <h1>
          Master TradingView & <br /> Technical Analysis
        </h1>
        <p>
          1-on-1 coaching for beginners, a guided bootcamp, and VIP community
          access. Practical lessons, live chart walk-throughs, and a repeatable
          plan so you stop guessing and start executing.
        </p>
        {/* Hero CTA to Calendly */}
        <a
          href="https://calendly.com/tradingoptics"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ marginTop: 16, display: "inline-flex" }}
        >
          Book a Session
        </a>
      </div>
      <div className="hero-chart">
        <TVChartLive />
      </div>
    </section>
  );
}

/** Footer */
function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} TradingOptics.org — Master the Charts.
        Conquer the Market.
      </p>
    </footer>
  );
}

/** Main Landing Page */
export default function TradingOpticsLanding() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
