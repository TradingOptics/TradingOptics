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
        <button className="btn-primary">Book a Session</button>
      </div>
    </nav>
  );
}

/** LIVE TradingView Advanced Chart embed */
function TVChartLive({ height = 420 }: { height?: number }) {
  const widgetRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!widgetRef.current) return;

    // Reset any previous render
    widgetRef.current.innerHTML = "";

    // TradingView advanced chart
    const s = document.createElement("script");
    s.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    s.type = "text/javascript";
    s.async = true;

    s.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "BINANCE:BTCUSDT", // change this if you want another market
      interval: "60",            // "1","5","15","60","240","D","W","M"
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      hide_top_toolbar: false,
      hide_legend: true,
      allow_symbol_change: false,
      withdateranges: true,
      calendar: false,
      studies: ["MASimple@tv-basicstudies"], // optional
    });

    widgetRef.current.appendChild(s);

    return () => {
      if (widgetRef.current) widgetRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div className="chart-card">
      <div className="chart-head">
        <span className="muted">Live Chart • BTC/USDT</span>
        <span className="badge">BEGINNER-FRIENDLY</span>
      </div>

      <div className="tradingview-widget-container" style={{ width: "100%" }}>
        <div
          className="tradingview-widget-container__widget"
          ref={widgetRef}
          style={{ width: "100%", height }}
        />
      </div>

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
