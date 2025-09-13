import React from "react";
import TVChart from "./TVChart";

const navLink =
  "text-sm md:text-base hover:opacity-80 transition-opacity";

const ctaHref = "https://calendly.com/tradingoptics";

export default function TradingOpticsLanding() {
  return (
    <div className="min-h-screen bg-hero-gradient">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-[#0b0c0f]/70 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-semibold tracking-tight text-xl">
            TradingOptics
          </a>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#offerings" className={navLink}>Offerings</a>
            <a href="#syllabus" className={navLink}>Syllabus</a>
            <a href="#pricing" className={navLink}>Pricing</a>
            <a href="#contact" className={navLink}>Contact</a>
          </nav>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl px-4 py-2 text-sm font-medium text-black"
            style={{
              background:
                "linear-gradient(135deg, var(--tw-gradient-from, #23c55e), var(--tw-gradient-to, #f7c948))",
              backgroundImage:
                "linear-gradient(135deg, #23c55e, #f7c948)"
            }}
          >
            Book a Session
          </a>
        </div>
      </header>

      {/* HERO */}
      <main className="mx-auto max-w-7xl px-4">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-14">
          {/* Left copy */}
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/[0.06] border border-white/10 px-4 py-2 text-sm text-white/90">
              Learn charts the simple, smart way
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Master <span className="text-white/90">TradingView</span> &amp;{" "}
              <span className="text-white/90">Technical Analysis</span>
            </h1>

            <p className="mt-6 text-white/80 text-lg">
              1-on-1 coaching for beginners, a guided bootcamp, and VIP community
              access. Practical lessons, live chart walk-throughs, and a repeatable
              plan so you stop guessing and start executing.
            </p>

            <div className="mt-8">
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-2xl px-5 py-3 text-base font-medium text-black"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #23c55e, #f7c948)"
                }}
              >
                Book a Session
              </a>
            </div>
          </div>

          {/* Right: Live chart card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/90 font-medium">
                Live Chart • BTC/USD <span className="text-white/60">(1m)</span>
              </p>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                REAL-TIME
              </span>
            </div>
            <TVChart symbol="BINANCE:BTCUSDT" interval="1" theme="dark" height={420} />
            <p className="mt-4 text-sm text-white/70">
              We’ll practice directly on TradingView: drawing tools, indicators,
              entries/exits, and risk management.
            </p>
          </div>
        </section>

        {/* (Optional) placeholder anchors for nav links */}
        <section id="offerings" className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Offerings</h2>
          <p className="text-white/70">1-on-1 sessions, bootcamp, and VIP community access.</p>
        </section>

        <section id="syllabus" className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Syllabus</h2>
          <p className="text-white/70">From chart basics to execution and risk management.</p>
        </section>

        <section id="pricing" className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
          <p className="text-white/70">Simple, transparent pricing — no surprises.</p>
        </section>

        <section id="contact" className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>
          <p className="text-white/70">
            Email <a href="mailto:support@tradingoptics.org" className="underline">support@tradingoptics.org</a>
            {" "}or book a session any time.
          </p>
        </section>
      </main>

      <footer className="border-t border-white/10 mt-10 py-8 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} TradingOptics. All rights reserved.
      </footer>
    </div>
  );
}
