import { FC, useRef, useState } from "react";
import { useEffect } from "react";
import { savedToCloudinary } from "../util/captureScreen";
interface ImageTakenProps {
  className?: string;
}

const width = 320;
let height = 0;
const ImageTaken: FC<ImageTakenProps> = ({ className }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const faceapi = (window as any).faceapi;

    const loadModel = async () => {
      await faceapi.loadTinyFaceDetectorModel();
      await faceapi.loadFaceLandmarkTinyModel();
      await faceapi.loadFaceRecognitionModel();
    };
    if (faceapi) {
      loadModel();
    }
  }, []);

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
    const requestWebcamAccess = async () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(function (stream) {
          videoRef.current!.srcObject = stream;
          videoRef.current!.play();
        })
        .catch(function (err) {
          console.log("An error occurred: " + err);
        });
    };
    requestWebcamAccess().catch((err) => console.log(err));
  }, []);

  const handleImageTaken = async () => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d");
    // if (width && height) {
    //   canvas.width = width;
    //   canvas.height = height;
    //   // context!.drawImage(video, 0, 0, width, height);

    //   // const data = canvas.toDataURL("image/png");
    //   // setImageUrl(data);
    //   // console.log(data);
    // }
    const faceapi = (window as any).faceapi;
    try {
      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks(true)
        .withFaceDescriptor();
      console.log(detection);
      const resizedDetections = faceapi.resizeResults(detection, {
        width: canvas.width,
        height: canvas.height,
      });
      context!.drawImage(video, 0, 0, width, height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      const region = [new faceapi.Rect(0, 0, 100, 100)];
      // let region = new faceapi.Rect(
      //   detection.alignedRect._box._x,
      //   detection.alignedRect._box._y,
      //   detection.alignedRect._box._width,
      //   detection.alignedRect._box._height
      // );
      let face = await faceapi.extractFaces(canvas, [region]);

      const data = face[0].toDataURL("image/png");
      setImageUrl(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTest = async () => {
    if (imageUrl) {
      savedToCloudinary(imageUrl).catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex flex-col">
      <div className="camera">
        <video id="video" ref={videoRef}>
          Video stream not available.
        </video>
        <button onClick={handleImageTaken}>Take photo</button>
        <button onClick={handleTest}>Send</button>
      </div>
      <canvas ref={canvasRef}>
        <div className="output">
          <img src={imageUrl} alt="Image Taken" />
        </div>
      </canvas>
    </div>
  );
};

export default ImageTaken;
