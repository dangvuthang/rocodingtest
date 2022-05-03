import { useEffect, useState } from "react";

const useDetectTab = () => {
  const [openInAnotherTab, setOpenInAnotherTab] = useState(false);
  useEffect(() => {
    localStorage.openpages = Date.now();
    const onLocalStorageEvent = function (e: StorageEvent) {
      if (e.key === "openpages") {
        localStorage.page_available = Date.now();
        setOpenInAnotherTab(false);
      }
      if (e.key === "page_available") {
        setOpenInAnotherTab(true);
      }
    };
    window.addEventListener("storage", onLocalStorageEvent, false);
  }, []);
  return openInAnotherTab;
};

export default useDetectTab;
