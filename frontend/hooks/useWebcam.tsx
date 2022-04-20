import { useEffect, useState } from "react";

const useWebcam = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    if (!stream) {
      const getMedia = async () => {
        try {
          const currentStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          setStream(currentStream);
        } catch (err) {
          console.log(err);
        }
      };
      getMedia();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);
  return stream;
};

export default useWebcam;
