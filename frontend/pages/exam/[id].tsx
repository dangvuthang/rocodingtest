import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMsal } from "@azure/msal-react";
import ExamContent from "../../components/ExamContent";
import useWebcam from "../../hooks/useWebcam";
import SignInButton from "../../components/layout/SignInButton";
import useAccessToken from "../../hooks/useAccessToken";
import { getRequest, postRequest } from "../../util/axiosInstance";
import Router from "next/router";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useUser } from "../../context/UserProvider";
import FaceRecognition from "../../components/FaceRecognition";
import LoadingSpinner from "../../components/LoadingSpinner";
dayjs.extend(isBetween);
const LoadScript = dynamic(() => import("../../components/LoadScript"), {
  loading: () => <p>Loading Model...</p>,
});

export interface Test {
  _id: string;
  name: string;
  startedDate: string;
  endDate: string;
  link: string;
  duration: number;
  question: string;
  conversationSid: string;
}

const Exam = () => {
  const user = useMsal().accounts[0];
  const { user: userInfo } = useUser();
  const photoUrl = userInfo?.photoUrl;
  const accessToken = useAccessToken();
  const stream = useWebcam();
  const count = useRef(0);
  const [test, setTest] = useState<Test | null>(null);
  const [message, setMessage] = useState("");
  const [permission, setPermission] = useState(false);
  const [done, setDone] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSameFace, setIsSameFace] = useState(false);

  useEffect(() => {
    count.current++;
  }, []);

  useEffect(() => {
    const enterExamBefore = async () => {
      const path = Router.query.id;
      try {
        const request = await postRequest({
          url: `/records/check`,
          token: accessToken,
          body: { testId: path },
        });
        if (request.data.status === "allowed") setPermission(true);
      } catch (error) {
        const response = (error as any)?.response;
        if (response.data.status === "disallowed") setPermission(false);
      }
    };
    if (accessToken) {
      enterExamBefore();
    }
  }, [accessToken]);

  useEffect(() => {
    const getTest = async () => {
      const path = Router.query.id;
      try {
        const request = await getRequest({
          url: `/tests/${path}`,
          token: accessToken,
        });
        const test = request.data.data.test as Test;
        setTest(test);
        const isAvailable = dayjs().isBetween(
          dayjs(new Date(test.startedDate)),
          dayjs(new Date(test.endDate))
        );
        console.log({
          now: dayjs(),
          start: dayjs(new Date(test.startedDate)),
          end: dayjs(new Date(test.endDate)),
        });
        console.log(isAvailable);
        setIsRunning(isAvailable);
      } catch (error) {
        setTest(null);
        setMessage("No test found with this given link.");
      }
    };
    if (accessToken && stream) {
      getTest();
    }
  }, [accessToken, stream]);

  const handleOnDone = async () => {
    setDone(true);
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch((err) => console.log(err));
    }
  };

  if (count.current === 0) return <LoadScript />;
  if (!user) {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-lg gap-y-3">
        <SignInButton />
        <p className="text-gray-400 text-sm">Please login to continue...</p>
      </div>
    );
  }
  if (!stream) {
    return (
      <div className="h-screen flex justify-center items-center text-lg">
        The application required webcam to work correctly. Please enable webcam
        to continue...{" "}
      </div>
    );
  }
  if (
    stream &&
    user &&
    test &&
    permission &&
    !done &&
    isRunning &&
    isSameFace
  ) {
    return <ExamContent test={test} onDone={handleOnDone} />;
  } else if (done) {
    return (
      <div className="h-screen flex justify-center items-center text-lg">
        You have successfully submitted your code.
      </div>
    );
  } else if (message) {
    return (
      <div className="h-screen flex justify-center items-center text-lg">
        {message}
      </div>
    );
  } else if (!permission && test) {
    return (
      <div className="h-screen flex justify-center items-center text-lg">
        You have already joined or finished the exam...
      </div>
    );
  } else if (!isRunning && test) {
    return (
      <div className="h-screen flex justify-center items-center text-lg">
        The exam is not available at the moment or has already finished...
      </div>
    );
  } else if (permission && isRunning && user && !isSameFace) {
    return <FaceRecognition onCompare={setIsSameFace} photoUrl={photoUrl!} />;
  } else {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-lg">
        <span className="mb-3">Loading...</span>
        <LoadingSpinner />
      </div>
    );
  }
};

export default Exam;
