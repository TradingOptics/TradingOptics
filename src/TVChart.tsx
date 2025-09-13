import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView?: any;
  }
}

const TV_SCRIPT_SRC =
  "https://s3.tradingview.com/tv.js"; // lightweight, no API key required

function loadTVScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.TradingView) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = TV_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load TradingView script"));
    document.head.appendChild(script);
  });
}

type TVChartProps = {
  symbol?: string;      // e.g. "BINANCE:BTCUSDT"
  interval?: string;    // e.g. "1"
  theme?: "dark" | "light";
  height?: number;      // px
};

const TVChart: React.FC<TVChartProps> = ({
  symbol = "BINANCE:BTCUSDT",
  interval = "1",
  theme = "dark",
  height = 420,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let widget: any;

    loadTVScript()
      .then(() => {
        if (!containerRef.current || !window.TradingView) return;

        // Clear container (avoid duplicate widgets on HMR/deploy)
        containerRef.current.innerHTML = "";

        widget = new window.TradingView.widget({
          symbol,
          interval,
          container_id: containerRef.current,
          autosize: true,
          timezone: "Etc/UTC",
          theme,
          style: "1",
          locale: "en",
          toolbar_bg: "rgba(0,0,0,0)",
          enable_publishing: false,
          allow_symbol_change: true,
          hide_side_toolbar: false,
          withdateranges: true,
          save_image: false,
          studies: [],
          calendar: false,
          hide_top_toolbar: false,
          hide_legend: false,
          // Make height responsive to container; container gets minHeight via Tailwind
        });
      })
      .catch((e) => {
        console.error("TradingView init error:", e);
      });

    return () => {
      try {
        if (widget && typeof widget.remove === "function") widget.remove();
      } catch {}
    };
  }, [symbol, interval, theme]);

  return (
    <div
      className="w-full min-h-[360px] md:min-h-[420px] rounded-xl overflow-hidden"
      ref={containerRef}
      style={{ height }}
    />
  );
};

export default TVChart;
