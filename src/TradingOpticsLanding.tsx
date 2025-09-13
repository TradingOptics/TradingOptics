// src/TradingOpticsLanding.tsx
import React from "react";
import TVChart from "./TVChart";

const TradingOpticsLanding: React.FC = () => {
  return (
    <main className="relative bg-[#0b0c0f] text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold">TradingOptics</h1>
        <nav className="space-x-8 text-gray-300 font-medium">
          <a href="#offerings" className="hover:text-green-400">Offerings</a>
          <a href="#syllabus" className="hover:text-green-400">Syllabus</a>
          <a href="#pricing" className="hover:text-green-400">Pricing</a>
          <a href="#contact" className="hover:text-green-400">Contact</a>
        </nav>
        <a
          href="https://calendly.com/tradingoptics"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-6 bg-gradient-to-r from-green-400 to-yellow-400 text-black font-semibold px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          Book a Session
        </a>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-20 py-16 gap-12 flex-grow">
        {/* Left Text */}
        <div className="flex-1">
          <span className="inline-block mb-4 px-4 py-1 rounded-full border border-green-500 text-green-300 text-sm font-medium">
            Learn charts the simple, smart way
          </span>
          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Master <br /> TradingView & <br /> Technical Analysis
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            1-on-1 coaching for beginners, a guided bootcamp, and VIP community access. 
            Practical lessons, live chart walk-throughs, and a repeatable plan 
            so you stop guessing and start executing.
          </p>
          <a
            href="https://calendly.com/tradingoptics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-green-400 to-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow hover:opacity-90 transition"
          >
            Book a Session
          </a>
        </div>

        {/* Right Live Chart */}
        <div
          className="flex-1 rounded-xl border border-white/10 shadow-lg p-5"
          style={{
            background:
              "radial-gradient(1200px 600px at 75% 0%, rgba(90,120,20,0.15), transparent 70%)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="text-lg font-semibold text-gray-200">
              Live Chart • BTC/USDT (1m)
            </div>
            <span className="ml-auto text-xs font-bold text-gray-900 bg-gradient-to-r from-green-400 to-emerald-500 px-3 py-1 rounded-full">
              REAL-TIME
            </span>
          </div>

          {/* LIVE TradingView chart */}
          <div style={{ height: 420 }}>
            <TVChart symbol="BINANCE:BTCUSDT" interval="1" height={420} />
          </div>

          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            We’ll practice directly on TradingView: drawing tools, indicators, 
            entries/exits, and risk management.
          </p>
        </div>
      </section>
    </main>
  );
};

export default TradingOpticsLanding;
