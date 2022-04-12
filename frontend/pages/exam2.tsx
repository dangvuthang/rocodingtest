import { useEffect, useReducer, useRef, useState } from "react";
import CodeArea from "../components/CodeArea";
import QuestionArea2 from "../components/QuestionArea2";
import Timer2 from "../components/Timer2";
import { ChevronDownIcon } from "@heroicons/react/solid";
import InstructionModal from "../components/InstructionModal";
import AlertModal from "../components/AlertModal";
import useFullScreen from "../hooks/useFullScreen";
import useWindowFocus from "../hooks/useWindowFocus";
import Router from "next/router";

const Exam2 = () => {
  const [run, setRun] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const [remainingTime, setRemainingTime] = useState(3);
  const [alertMessage, setAlertMessage] = useState("");
  const isFullscreen = useFullScreen();
  const isFocused = useWindowFocus();
  const count = useRef(0);

  const handleCloseWarning = async () => {
    if (!isFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
      } catch (error) {
        console.log(error);
      }
    }
    setShowAlertMessage(false);
  };

  useEffect(() => {
    if (showInstruction) return;
    if (!isFocused) {
      setAlertMessage("you are trying to navigate outside of the web page");
      setShowAlertMessage(true);
      setRemainingTime((time) => time - 1);
    }
  }, [isFocused, showInstruction]);

  useEffect(() => {
    if (showInstruction) return;
    if (!isFullscreen) {
      count.current++;
      if (count.current === 1) return;
      setAlertMessage("you are trying to minimize the web page");
      setShowAlertMessage(true);
      setRemainingTime((time) => time - 1);
    }
  }, [isFullscreen, showInstruction]);

  useEffect(() => {
    console.log(remainingTime);
    if (remainingTime === 0) {
      Router.push("/")
        .then(() => document.exitFullscreen())
        .then(() => console.log("DONE"))
        .catch((err) => console.log(err));
    }
  }, [remainingTime]);

  return (
    <>
      <InstructionModal
        open={showInstruction}
        onClose={() => setShowInstruction(false)}
      />
      <AlertModal
        message={alertMessage}
        open={showAlertMessage}
        remainingTime={remainingTime}
        onClose={handleCloseWarning}
      />
      <div className="grid grid-cols-[1fr_3fr] h-screen grid-rows-[4%_4fr_auto]">
        <div className="col-span-2 justify-self-end self-end px-2">
          <Timer2 />
        </div>
        <div className="row-span-2 overflow-x-auto">
          <QuestionArea2 />
        </div>
        <div className="relative">
          <div className="h-full">
            <CodeArea />
          </div>
          <div
            className={`absolute bottom-0 left-0 w-full ${!run && "hidden"}`}
          >
            <div className="flex bg-[#f7f9fa] border-t border-b border-b-transparent justify-between items-center pr-8">
              <div className="text-sm flex justify-center items-center px-5 py-3 bg-white gap-x-2 border-2 border-transparent text-[#37474f]">
                <div>Run Code Result</div>
              </div>
              <button
                className="self-stretch text-[#9e9e9e] hover:text-[#263238]"
                onClick={() => setRun(false)}
              >
                <ChevronDownIcon className="w-6 h-6 " />
              </button>
            </div>
            <div className="bg-white flex justify-center items-center h-32">
              <div className="w-[90%] h-[80%] bg-black border border-transparent text-white px-1 font-mono">
                {"> Compiling......"}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#eee] py-4 relative">
          <div className="flex justify-end items-center pr-8">
            <button
              className="rounded-sm px-4 py-3 border border-[#b0bec5] text-[#455a64] leading-5 bg-transparent min-w-[80px] flex justify-center items-center h-[32px] text-sm hover:border-[#263238] hover:text-[#263238] hover:bg-[#eceff1] transition mr-5"
              onClick={() => setRun(true)}
            >
              Run code
            </button>
            <button className="shadow-sm rounded-sm px-4 py-3 text-white leading-5 bg-[#455a64] min-w-[80px] flex justify-center items-center h-[32px] text-sm hover:text-white hover:bg-[#546e7a] transition">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Exam2;
