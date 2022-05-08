import { FC } from "react";
import Script from "next/script";

const LoadScript: FC = () => {
  return (
    <Script src="/jeelizGlanceTracker.js" strategy="beforeInteractive"></Script>
  );
};

export default LoadScript;

// https://appstatic.jeeliz.com/glanceTracker/jeelizGlanceTracker.js
