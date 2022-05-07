import * as faceapi from 'face-api.js';
import { FC, Dispatch, useEffect, useRef, useState, SetStateAction } from "react";
import { canvas, faceDetectionOptions } from './models';
import { getRequest } from "../util/axiosInstance";
import useAccessToken from "../hooks/useAccessToken";
import useWebcam from "../hooks/useWebcam";
import React from "react";

const width = 320;
let height = 0;
export interface User {
  _id: string;
  email: string;
  fullName: string;
  photoUrl: string;
  role: string;
}

interface FaceRecognitionProps {
  onChange: Dispatch<SetStateAction<boolean>>;
}
const FaceRecognition: FC<FaceRecognitionProps> = ({ onChange }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const stream = useWebcam();
  const token = useAccessToken();
  let similarityScore = 1;

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

  const handleImageTaken = async () => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context!.drawImage(video, 0, 0, width, height);
      const data = canvas.toDataURL("image/png");
      setImageUrl(data);
    }
  };

  const handleSendImage = async () => {
    if (imageUrl) {
      let REFERENCE_IMAGE;

      try {
        const request = await getRequest({ url: "/users/me", token });
        const user = request.data.data.user as User;
        REFERENCE_IMAGE = user.photoUrl;
      } catch (error) {
        console.log(error);
      }

      const QUERY_IMAGE = imageUrl

      await faceapi.nets.tinyFaceDetector.loadFromUri('./models')
      await faceapi.nets.faceLandmark68Net.loadFromUri('./models')
      await faceapi.nets.faceRecognitionNet.loadFromUri('./models')

      const referenceImage = await canvas.loadImage(REFERENCE_IMAGE)
      const queryImage = await canvas.loadImage(QUERY_IMAGE)

      const resultsRef = await faceapi.detectAllFaces(referenceImage, faceDetectionOptions)
        .withFaceLandmarks()
        .withFaceDescriptors()

      const resultsQuery = await faceapi.detectAllFaces(queryImage, faceDetectionOptions)
        .withFaceLandmarks()
        .withFaceDescriptors()

      const faceMatcher = new faceapi.FaceMatcher(resultsRef)

      const labels = faceMatcher.labeledDescriptors
        .map(ld => ld.label)
      const refDrawBoxes = resultsRef
        .map(res => res.detection.box)
        .map((box, i) => new faceapi.draw.DrawBox(box, { label: labels[i] }))
      const outRef = faceapi.createCanvasFromMedia(referenceImage)
      refDrawBoxes.forEach(drawBox => drawBox.draw(outRef))

      const queryDrawBoxes = resultsQuery.map(res => {
        const bestMatch = faceMatcher.findBestMatch(res.descriptor)
        if (bestMatch.distance < 0.5){
          similarityScore = bestMatch.distance
        }
        return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })
      })
      const outQuery = faceapi.createCanvasFromMedia(queryImage)
      queryDrawBoxes.forEach(drawBox => drawBox.draw(outQuery))
      if (similarityScore < 0.5){
        onChange(false);
      }
      onChange(true);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col max-w-xs">
          <h3 className="text-xl font-bold text-center">Face photo taken</h3>
          <p className="text-xs text-gray-500 mt-2">
            Please allow webcam to continue and take the image of your face to
            finish the registration process
          </p>
        </div>
        <div className="relative">
          <video id="video" ref={videoRef} className="shadow-md mt-2">
            Video stream not available.
          </video>
          <div className="absolute flex items-center justify-center bottom-1 w-full">
            <button
              onClick={handleImageTaken}
              className="text-white bg-blue-500 text-sm px-2 py-0.5 hover:bg-blue-600"
            >
              Take photo
            </button>
          </div>
        </div>
        <div className="relative shadow-lg mt-5">
          <canvas ref={canvasRef}>
            <img src={imageUrl} alt="Image Taken" />
          </canvas>
          <div className="absolute top-0 left-0 text-sm text-white bg-indigo-500 px-2">
            Preview
          </div>
        </div>
        <button
          className="px-7 py-1 mt-5 bg-indigo-500 text-sm text-white rounded-md hover:bg-indigo-600 disabled:bg-gray-400"
          onClick={handleSendImage}
          disabled={!!!imageUrl || isLoading}
        >
          {isLoading ? "Processing..." : "Done"}
        </button>
      </div>
    </div>
  );
};

export default FaceRecognition;
