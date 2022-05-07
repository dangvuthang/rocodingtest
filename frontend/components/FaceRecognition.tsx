import { FC, Dispatch, useEffect, useRef, useState, SetStateAction } from "react";
import { canvas, faceDetectionOptions } from './models';
import useWebcam from "../hooks/useWebcam";
import React from "react";
import { useUser } from '../context/UserProvider';

const width = 320;
let height = 0;

interface FaceRecognitionProps {
  onChange: Dispatch<SetStateAction<boolean>>;
}

const FaceRecognition: FC<FaceRecognitionProps> = ({ onChange }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const stream = useWebcam();
  const {user} = useUser();
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


  const handleSendImage = () => {

    const loadModel = async () => {
      const FACEAPI = (window as any).FACEAPI;
      if(!FACEAPI){
        try {
          const p1 = faceapi.nets.tinyFaceDetector.loadFromUri('/models')
          const p2 =  faceapi.nets.faceLandmark68Net.loadFromUri('/models')
          const p3 = faceapi.nets.faceRecognitionNet.loadFromUri('./models')
          await Promise.all([p1,p2, p3]).then(async () => {
            if(imageUrl){
              const REFERENCE_IMAGE = 'https://www2.deloitte.com/content/dam/Deloitte/nl/Images/promo_images/deloitte-nl-cm-digital-human-promo.jpg';
              const QUERY_IMAGE = imageUrl;
              const tyniOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: 128, scoreThreshold: 0.5 })
  
              const referenceImage = await canvas.loadImage(REFERENCE_IMAGE)
              const queryImage = await canvas.loadImage(QUERY_IMAGE)

              referenceImage.setAttribute('crossOrigin', 'anonymous')
              queryImage.setAttribute('crossOrigin', 'anonymous')
  
              const resultsQuery = await faceapi.detectAllFaces(queryImage, tyniOptions)
              .withFaceLandmarks()
              .withFaceDescriptors()
  
              const resultsRef = await faceapi.detectAllFaces(referenceImage, tyniOptions)
              .withFaceLandmarks()
              .withFaceDescriptors()
  
              const faceMatcher = new faceapi.FaceMatcher(resultsRef)

              console.log(faceMatcher)

              const queryDrawBoxes = resultsQuery.map((res: { descriptor: any; }) => {
                const bestMatch = faceMatcher.findBestMatch(res.descriptor)
                similarityScore = bestMatch.distance
              })
              if (similarityScore < 0.5){
                console.log("Similarity")
                onChange(false);
              }
              onChange(true);
              console.log("Not Similarity")
            }
          })
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadModel();
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
