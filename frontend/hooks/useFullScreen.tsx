import { useEffect, useState } from "react";

const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    const handleFullScreenChange = (e: Event) => {
      if (document.fullscreenElement) setIsFullScreen(true);
      else setIsFullScreen(false);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);
  return isFullScreen;
};

export default useFullScreen;
