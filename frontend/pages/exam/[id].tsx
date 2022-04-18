import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMsal } from "@azure/msal-react";
import ExamContent from "../../components/ExamContent";
import useWebcam from "../../hooks/useWebcam";
import SignInButton from "../../components/layout/SignInButton";
import useAccessToken from "../../hooks/useAccessToken";
import { getRequest } from "../../util/axiosInstance";
import Router from "next/router";
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
}

const Exam = () => {
  const user = useMsal().accounts[0];
  const accessToken = useAccessToken();
  const stream = useWebcam();
  const count = useRef(0);
  const [test, setTest] = useState<Test | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    count.current++;
  }, []);

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
        console.log(test);
      } catch (error) {
        setTest(null);
        setMessage("No test found with this given link.");
      }
    };
    if (accessToken && stream) {
      getTest();
    }
  }, [accessToken, stream]);

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
  if (stream && user && test) {
    return <ExamContent test={test} />;
  } else if (message) {
    return (
      <div className="h-screen flex justify-center items-center text-lg">
        {message}
      </div>
    );
  } else {
    return (
      <div className="h-screen flex justify-center items-center text-lg">
        Loading...
      </div>
    );
  }
};

export default Exam;
