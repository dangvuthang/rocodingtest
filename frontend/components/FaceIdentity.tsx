import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import React from "react";
import useWebcam from "../hooks/useWebcam";

interface FaceIdentityProps {
  onChange: Dispatch<SetStateAction<number>>;
}

const FaceIdentity: FC<FaceIdentityProps> = ({ onChange }) => {
  // Hidden video => do not need to set width and height
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stream = useWebcam();

  useEffect(() => {
    if (stream) {
      const video = videoRef.current!;
      video.srcObject = stream;
      video.play();
    }
  }, [stream]);

  useEffect(() => {
    const video = videoRef.current!;
    const faceapi = (window as any).faceapi;
    let id: NodeJS.Timer;
    const detectFace = async () => {
      try {
        const detections = await faceapi.detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions()
        );
        // differentiate between user disappear on the webcam cases and another person appear next to him/her
        if (detections.length === 1) {
          onChange(1);
          console.log("Acceptable");
        } else if (detections.length === 0) {
          onChange(0);
          console.log("No Face");
        } else if (detections.length > 1) {
          onChange(2);
          console.log("TWO MORE FACES");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (faceapi) {
      console.log("RERUN");
      // save id for later cleanup after component unmount
      id = setInterval(async () => await detectFace(), 3000);
    }
    return () => {
      // Remove the interval to avoid memory leak
      return clearInterval(id);
    };
  }, [onChange]);

  return <video ref={videoRef} className="hidden"></video>;
};
export default FaceIdentity;
