// src/App.tsx
import React, { useEffect } from "react";
import TradingOpticsLanding from "./TradingOpticsLanding";

const App: React.FC = () => {
  useEffect(() => {
    document.title = "TradingOptics — Learn TradingView & Technical Analysis";

    // Optional: make the address bar / theme color dark on mobile
    const name = "theme-color";
    let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", name);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "#0b0c0f");
  }, []);

  return <TradingOpticsLanding />;
};

export default App;
