import { FC, useCallback, useEffect, useRef, useState } from "react";
import Router from "next/router";
import { ChevronDownIcon } from "@heroicons/react/solid";
import CodeArea from "./CodeArea";
import QuestionArea2 from "./QuestionArea2";
import Timer2 from "./Timer2";
import InstructionModal from "./InstructionModal";
import AlertModal from "./AlertModal";
import useFullScreen from "../hooks/useFullScreen";
import useWindowFocus from "../hooks/useWindowFocus";
import GlanceTracker from "./GlanceTracker";
import { Test } from "../pages/exam/[id]";
import { patchRequest, postRequest } from "../util/axiosInstance";
import useAccessToken from "../hooks/useAccessToken";
import { captureScreen, savedToCloudinary } from "../util/captureScreen";
import ConfirmModal from "./ConfirmModal";
import LoadingModal from "./LoadingModal";

interface ExamContentProps {
  test: Test;
  onDone: () => void;
}

const ExamContent: FC<ExamContentProps> = ({ test, onDone }) => {
  const [run, setRun] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [content, setContent] = useState("");
  const [runMessage, setRunMessage] = useState("");
  const [showInstruction, setShowInstruction] = useState(true);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const [showSubmissionConfirm, setShowSubmissionConfirm] = useState(false);
  const [recordId, setRecordId] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(3);
  const [alertMessage, setAlertMessage] = useState("");
  const [isWatching, setIsWatching] = useState(true);

  const accessToken = useAccessToken();
  const isFullscreen = useFullScreen();
  const isFocused = useWindowFocus();
  const count = useRef(0);

  const handleStartExam = async () => {
    setShowInstruction(false);
    try {
      const request = await postRequest({
        url: "/records",
        token: accessToken,
        body: {
          testId: Router.query.id,
        },
      });
      const recordId = request.data.data.record._id;
      setRecordId(recordId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRunCode = async () => {
    setRun(true);
    if (!content) {
      setRunMessage("> Nothing to compile...");
      return;
    }
    setRunMessage(`> Compiling...`);
    try {
      const request = await postRequest({
        url: "/compile",
        token: accessToken,
        body: {
          language,
          source: content,
        },
      });
      const message = request.data.data.output;
      setRunMessage(`> ${message}`);
    } catch (error) {
      if ((error as any)!.response!.data!.msg) {
        setRunMessage((error as any)!.response!.data!.msg);
      }
    }
  };

  const handleSubmitCode = useCallback(async () => {
    if (recordId) {
      setShowSubmissionConfirm(false);
      setLoading(true);
      let request;
      try {
        request = await postRequest({
          url: `/tests/${test._id}/submissions`,
          token: accessToken,
          body: { recordId: recordId, content: content },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        console.log(request);
        if (request?.data?.status === "success") {
          if (isFullscreen) {
            await document.exitFullscreen().catch((err) => console.log(err));
          }
          onDone();
        }
      }
    }
  }, [accessToken, content, isFullscreen, onDone, recordId, test._id]);

  const handleCloseWarning = async () => {
    const image = await captureScreen().catch((err) => console.log(err));
    setShowAlertMessage(false);
    if (!isFullscreen && remainingTime !== 0) {
      await document.documentElement
        .requestFullscreen()
        .catch((err) => console.log(err));
    }
    let evidence;
    if (image) {
      evidence = await savedToCloudinary(image).catch((err) =>
        console.log(err)
      );
    }
    if (recordId) {
      await patchRequest({
        url: `/records/${recordId}`,
        body: { evidence },
        token: accessToken,
      }).catch((err) => console.log(err));
    }
  };

  // Detect navigate outside webste
  useEffect(() => {
    if (showInstruction) return;
    if (!isFocused) {
      setAlertMessage("you are trying to navigate outside of the web page");
      setShowAlertMessage(true);
      setRemainingTime((time) => (time > 0 ? time - 1 : 0));
    }
  }, [isFocused, showInstruction]);

  // Detect minimize fullscreen
  useEffect(() => {
    if (showInstruction) return;
    if (!isFullscreen) {
      count.current++;
      if (count.current === 1) return;
      setAlertMessage("you are trying to minimize the web page");
      setShowAlertMessage(true);
      setRemainingTime((time) => (time > 0 ? time - 1 : 0));
    }
  }, [isFullscreen, showInstruction]);

  // Detect glance tracking
  /*   useEffect(() => {
    if (showInstruction) return;
    if (!isWatching) {
      setAlertMessage("you are not looking at the screen");
      setShowAlertMessage(true);
      setRemainingTime((time) => time - 1);
    }
  }, [isWatching, showInstruction]); */

  useEffect(() => {
    if (remainingTime === 0 && showAlertMessage === false) {
      handleSubmitCode();
    }
  }, [handleSubmitCode, remainingTime, showAlertMessage]);

  return (
    <>
      {/* <GlanceTracker onChange={setIsWatching} /> */}
      <LoadingModal open={loading} />
      <InstructionModal
        open={showInstruction}
        onClose={() => handleStartExam()}
      />
      <AlertModal
        message={alertMessage}
        open={showAlertMessage}
        remainingTime={remainingTime}
        onClose={handleCloseWarning}
      />
      <ConfirmModal
        open={showSubmissionConfirm}
        onClose={() => setShowSubmissionConfirm(false)}
        onConfirm={handleSubmitCode}
      />
      <div className="grid grid-cols-[1fr_3fr] h-screen grid-rows-[4%_4fr_auto]">
        <div className="col-span-2 justify-self-end self-end px-2">
          <Timer2 endDate={test.endDate} />
        </div>
        <div className="row-span-2 overflow-x-auto">
          <QuestionArea2 question={test.question} />
        </div>
        <div className="relative">
          <div className="h-full">
            <CodeArea
              language={language}
              content={content}
              setContent={setContent}
              setLanguage={setLanguage}
            />
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
              <div className="w-[90%] h-[80%] bg-black border border-transparent text-white px-1 font-mono overflow-y-auto">
                {runMessage}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#eee] py-4 relative">
          <div className="flex justify-end items-center pr-8">
            <button
              className="rounded-sm px-4 py-3 border border-[#b0bec5] text-[#455a64] leading-5 bg-transparent min-w-[80px] flex justify-center items-center h-[32px] text-sm hover:border-[#263238] hover:text-[#263238] hover:bg-[#eceff1] transition mr-5"
              onClick={handleRunCode}
            >
              Run code
            </button>
            <button
              className="shadow-sm rounded-sm px-4 py-3 text-white leading-5 bg-[#455a64] min-w-[80px] flex justify-center items-center h-[32px] text-sm hover:text-white hover:bg-[#546e7a] transition"
              onClick={() => setShowSubmissionConfirm(true)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamContent;