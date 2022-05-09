import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import React from 'react';
import useWebcam from "../hooks/useWebcam";

const width = 320;
let height = 0;

interface FaceIdentityProps {
  onChange: Dispatch<SetStateAction<boolean>>;
}

const FaceIdentity: FC<FaceIdentityProps> = ()  => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stream = useWebcam();

  useEffect(() => {
    const video = videoRef.current!;
    video.addEventListener(
      "playing",
      function (ev) {
        height = video.videoHeight / (video.videoWidth / width);
        video.setAttribute("width", width.toString());
        video.setAttribute("height", height.toString());
      },
      false
    );
  }, []);

  useEffect(() => {
    if (stream) {
      const video = videoRef.current!;
      video.srcObject = stream;
      video.play();
    }
  }, [stream]);

  useEffect(() => {
    const video = videoRef.current!;
    const p1 = faceapi.nets.tinyFaceDetector.loadFromUri('/models')
    Promise.all([p1]).then( async () => {
      try {
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
          if (detections.length > 1) {
            console.log("False")
            return false
          } else if (detections.length == 0 ){
            console.log("False")
            return false
          } else {
            console.log("True")
            return true
          }
        }, 1000)
      } catch (error) {
        console.error(error);
      }
    })
  });

  return <>
    <video ref={videoRef} width="720" height="560" id="faceIdentity" className="hidden"></video>
  </>
}
export default FaceIdentity;