import React, { useEffect, useState } from "react";

const TailwindDebugWatchdog = () => {
  const [tailwindWorking, setTailwindWorking] = useState(true);

  useEffect(() => {
    const el = document.createElement("div");
    el.className = "hidden bg-green-500 text-white";
    document.body.appendChild(el);

    const computedStyle = getComputedStyle(el);
    const isGreen = computedStyle.backgroundColor === "rgb(34, 197, 94)"; // Tailwind green-500

    if (!isGreen) setTailwindWorking(false);

    document.body.removeChild(el);
  }, []);

  if (tailwindWorking) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-xl text-sm animate-pulse">
      ⚠️ Tailwind CSS is NOT active! Check your index.css, config, or build
      pipeline.
    </div>
  );
};

export default TailwindDebugWatchdog;
