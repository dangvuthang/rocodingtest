/* eslint-disable @next/next/no-img-element */
import {
  FC,
  Dispatch,
  useEffect,
  useRef,
  SetStateAction,
  useState,
} from "react";
import useWebcam from "../hooks/useWebcam";
import React from "react";
import { toast } from "react-toastify";

const width = 320;
let height = 0;
interface FaceRecognitionProps {
  onCompare: Dispatch<SetStateAction<boolean>>;
  photoUrl: string;
}

const FaceRecognition: FC<FaceRecognitionProps> = ({ onCompare, photoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const stream = useWebcam();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const video = videoRef.current!;
    video.addEventListener(
      "playing",
      function (ev) {
        // Set width and height to match the img from cloundinary
        height = video.videoHeight / (video.videoWidth / width);
        video.setAttribute("width", width.toString());
        video.setAttribute("height", height.toString());
      },
      false
    );
  }, []);

  useEffect(() => {
    const video = videoRef?.current;
    if (stream && video) {
      video.srcObject = stream;
      video.play();
    }
  }, [stream]);

  // Convert to <img /> tag without using canvas
  useEffect(() => {
    const img = imgRef.current!;
    img.src = photoUrl;
    img.crossOrigin = "anonymous";
  }, [photoUrl]);

  const handleSendImage = async () => {
    const faceapi = (window as any).faceapi;
    try {
      if (photoUrl) {
        setIsLoading(true);
        const tyniOptions = new faceapi.TinyFaceDetectorOptions();
        const useTinyModel = true;
        const video = videoRef.current;
        const img = imgRef.current;

        // Get from video stream directly
        const resultsQuery = await faceapi
          .detectSingleFace(video, tyniOptions)
          .withFaceLandmarks(useTinyModel)
          .withFaceDescriptor();

        // Get from img tag conversion above
        const resultsRef = await faceapi
          .detectSingleFace(img, tyniOptions)
          .withFaceLandmarks(useTinyModel)
          .withFaceDescriptor();

        const faceMatcher = new faceapi.FaceMatcher(resultsRef);
        if (faceMatcher && resultsQuery && resultsRef) {
          const bestMatch = faceMatcher.findBestMatch(resultsQuery.descriptor);
          const similarityScore = bestMatch._distance;
          console.log(similarityScore);
          if (similarityScore < 0.4) {
            toast.success("Same person", {
              autoClose: 500,
              hideProgressBar: true,
              onClose: () => onCompare(true),
            });
          } else {
            setIsLoading(false);
            toast.warn(
              "Not the same person... Please try again if you think there is some error"
            );
          }
        } else {
          setIsLoading(false);
          toast.info("Cannot compare the image, please try again");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center mt-2">
      <h3 className="text-xl tracking-wide font-bold">
        Comparing Faces before proceed
      </h3>
      <p className="text-sm text-gray-400 max-w-xs text-center">
        We need to ensure that you are the same person that register the account
      </p>
      <div className="relative overflow-hidden mt-3">
        <p className="text-sm absolute right-0 bg-indigo-500 text-white px-2 py-1 rounded-sm">
          Webcam
        </p>
        <video id="video" ref={videoRef} className="mb-3">
          Video stream not available.
        </video>
      </div>
      <div className="relative overflow-hidden mt-3">
        <p className="text-sm absolute right-0 bg-indigo-500 text-white px-2 py-1 rounded-sm">
          Photo in Database
        </p>
        <img
          ref={imgRef}
          alt="User face saved in db"
          className={`${photoUrl ? "block" : "hidden"}`}
        />
      </div>
      <button
        onClick={handleSendImage}
        className="px-3 py-1 bg-blue-500 rounded-sm text-white mt-3
          disabled:bg-gray-400 disabled:text-white
        "
        disabled={isLoading}
      >
        {isLoading ? "Checking..." : "Compare"}
      </button>
    </div>
  );
};

export default FaceRecognition;
