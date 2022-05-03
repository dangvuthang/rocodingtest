import Script from "next/script";

const LoadFaceAPI = () => {
  return <Script src="/face-api.min.js" strategy="beforeInteractive"></Script>;
};

export default LoadFaceAPI;
