import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import React from 'react';
import useWebcam from "../hooks/useWebcam";

const width = 320;
let height = 0;

interface FaceIdentityProps {
  onChange: Dispatch<SetStateAction<boolean>>;
}

const FaceIdentity: FC<FaceIdentityProps> = ({ onChange })  => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stream = useWebcam();

  useEffect(() => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    video.addEventListener(
      "playing",
      function (ev) {
        height = video.videoHeight / (video.videoWidth / width);
        video.setAttribute("width", width.toString());
        video.setAttribute("height", height.toString());
        canvas.setAttribute("width", width.toString());
        canvas.setAttribute("height", height.toString());
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
    const p2 =  faceapi.nets.faceLandmark68Net.loadFromUri('/models')
    const p3 = faceapi.nets.faceRecognitionNet.loadFromUri('./models')
    Promise.all([p1,p2,p3]).then( async () => {
      const canvas = faceapi.createCanvas(video);
          if (canvas){
            try {
              document.body.append(canvas);
              const displaySize = { width: video.width, height: video.height };
              faceapi.matchDimensions(canvas, displaySize);
              setInterval(async () => {
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
                const resizedDetections = faceapi.resizeResults(detections, displaySize)
                canvas!.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
                if (detections.length > 1) {
                  onChange(false)
                } else if (detections.length == 0 ){
                  onChange(false)
                } else {
                  onChange(true)
                  console.log('hi')
                }
              }, 100)
            } catch (error) {
              console.error(error);
            }
          }
    })
  }, [onChange]);

  return <>
    <canvas
      ref={canvasRef}
      className="absolute top-[45px] right-0 w-10 h-10 z-10"
    ></canvas>
    <video ref={videoRef} id="faceIdentity" width="720" height="560" autoPlay muted></video>
  </>
}
export default FaceIdentity;