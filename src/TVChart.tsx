// src/TVChart.tsx
import React, { useEffect, useRef } from "react";

/**
 * A thin wrapper around TradingView's tv.js widget.
 * Renders a real-time chart that auto-resizes with its parent.
 *
 * Default symbol: BINANCE:BTCUSDT (high-liquidity, real-time)
 */
type Props = {
  symbol?: string;     // e.g. "BINANCE:BTCUSDT" or "BITSTAMP:BTCUSD"
  interval?: string;   // "1", "5", "15", "60", "240", "D" ...
  height?: number;     // fallback height when autosize can't calculate yet
};

declare global {
  interface Window {
    TradingView?: any;
  }
}

const TVChart: React.FC<Props> = ({ symbol = "BINANCE:BTCUSDT", interval = "1", height = 400 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptId = "tv-script-tag";

  useEffect(() => {
    const ensureScript = () =>
      new Promise<void>((resolve) => {
        if (window.TradingView) return resolve();
        let s = document.getElementById(scriptId) as HTMLScriptElement | null;
        if (!s) {
          s = document.createElement("script");
          s.id = scriptId;
          s.src = "https://s3.tradingview.com/tv.js";
          s.async = true;
          s.onload = () => resolve();
          document.body.appendChild(s);
        } else {
          s.onload ? (s.onload = () => resolve()) : resolve();
        }
      });

    let widget: any;

    ensureScript().then(() => {
      if (!containerRef.current || !window.TradingView) return;

      // Create the widget (real-time by default for supported symbols)
      widget = new window.TradingView.widget({
        // Make it flex with the parent
        autosize: true,
        container_id: containerRef.current.id,
        symbol,
        interval,                     // "1" = 1 minute
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",                   // candles
        locale: "en",
        hide_side_toolbar: false,
        allow_symbol_change: true,
        withdateranges: true,
        studies: [],
        // UI niceties
        toolbar_bg: "#0b0c0f",
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        // Library path is not required when loading from CDN
      });
    });

    // Clean up on unmount
    return () => {
      // TradingView doesn't expose a destroy, but removing the node is fine
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, interval]);

  return (
    <div
      id="tv-advanced-chart"
      ref={containerRef}
      style={{
        width: "100%",
        minHeight: height,
      }}
    />
  );
};

export default TVChart;
