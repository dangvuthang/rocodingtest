import Script from "next/script";
import ExamContent from "../../components/ExamContent";
import useWebcam from "../../hooks/useWebcam";

const Exam = () => {
  const stream = useWebcam();
  return (
    <>
      <Script
        src="/jeelizGlanceTracker.js"
        strategy="beforeInteractive"
      ></Script>
      {!stream ? (
        <div className="h-screen flex justify-center items-center">
          The application required webcam to work correctly. Please enable
          webcam to continue...{" "}
        </div>
      ) : (
        <ExamContent />
      )}
    </>
  );
};

export default Exam;
