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
        <a
  href="https://calendly.com/tradingoptics" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <Button className="bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold px-6 py-3 rounded-full">
    Book a Session
  </Button>
</a>

      </div>
    </nav>
  );
}

function TVChartIframe({ height = 520 }: { height?: number }) {
  const src =
    "https://s.tradingview.com/widgetembed/?frameElementId=tv_iframe&symbol=COINBASE%3ABTCUSD&interval=1&hidesidetoolbar=0&symboledit=1&hidetoptoolbar=0&saveimage=1&theme=dark&style=1&timezone=Etc%2FUTC&studies=&hideideas=1&withdateranges=1&support_host=https%3A%2F%2Fwww.tradingview.com";
  return (
    <div className="chart-card">
      <div className="chart-head">
        <span className="muted">Live Chart • BTC/USD (1m)</span>
        <span className="badge">REAL-TIME</span>
      </div>
      <iframe
        title="TradingView Live BTC"
        src={src}
        style={{ width: "100%", height, border: 0 }}
        allowTransparency
        scrolling="no"
        loading="eager"
      />
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
        <TVChartIframe />
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
