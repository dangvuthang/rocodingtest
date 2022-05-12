import { FC, useEffect, useState } from "react";
import Script from "next/script";

const LoadScript: FC = () => {
  useEffect(() => {
    const faceapi = (window as any).faceapi;
    const initializeModel = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    };
    if (faceapi) {
      initializeModel();
    }
  }, []);
  return (
    <>
      <Script
        src="/jeelizGlanceTracker.js"
        strategy="beforeInteractive"
      ></Script>
      <Script src="/face-api.js" strategy="beforeInteractive"></Script>
    </>
  );
};

export default LoadScript;

// https://appstatic.jeeliz.com/glanceTracker/jeelizGlanceTracker.js
