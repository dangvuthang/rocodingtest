import * as faceapi from 'face-api.js';
import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from './models';
import { Dispatch, FC, SetStateAction, useEffect, VFC } from "react";
import React from 'react';

interface Navigator {
  getUserMedia(
      options: { video?: Boolean; audio?: Boolean; }, 
      success: (stream: any) => void, 
      error?: (error: string) => void
      ) : void;
}

const FaceIdentity: FC = () => {

  const video = document.createElement('video') as HTMLVideoElement;
  video.setAttribute("id", "faceIdentity");

  video.autoplay = true;

  if (video) {
    try {

      const startVideo = function(): void {
        navigator.getUserMedia(
          { video: {} },
          stream => video.srcObject = stream,
          err => console.error(err)
        )
      }

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      ]).then(startVideo)

      video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        if (canvas){
          try {
            document.body.append(canvas);
            const displaySize = { width: video.width, height: video.height };
            faceapi.matchDimensions(canvas, displaySize);
            setInterval(async () => {
              const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
              const resizedDetections = faceapi.resizeResults(detections, displaySize)
              canvas!.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
              faceapi.draw.drawDetections(canvas, resizedDetections)
              faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
              if (detections.length > 2) {
                console.log("Cheating");
              }
            }, 100)
          } catch (error) {
            console.error(error);
          }
        }
      })
    } catch (error) {
      console.error(error);
    }
  }
  return <video id="faceIdentity" width="720" height="560" autoPlay muted></video>
}
export default FaceIdentity;