import Router from "next/router";
import { FC, useRef, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAccessToken from "../hooks/useAccessToken";
import useWebcam from "../hooks/useWebcam";
import { postRequest } from "../util/axiosInstance";
import { savedToCloudinary } from "../util/captureScreen";

interface ImageTakenProps {
  className?: string;
}

const width = 320;
let height = 0;

const ImageTaken: FC<ImageTakenProps> = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const stream = useWebcam();
  const token = useAccessToken();

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
      setIsLoading(true);
      let link;
      try {
        link = await savedToCloudinary(imageUrl);
      } catch (error) {
        console.log(link);
      }
      if (link && token) {
        let request;
        try {
          request = await postRequest({
            url: "/users/register",
            token,
            body: { photoUrl: link },
          });
          console.log(request);
        } catch (error) {
          console.log(error);
        } finally {
          if (request) {
            setIsLoading(false);
            toast.success("Successfully registered");
            setTimeout(() => {
              Router.push("/");
            }, 0);
          }
        }
      }
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
          {isLoading ? "Saving..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ImageTaken;
