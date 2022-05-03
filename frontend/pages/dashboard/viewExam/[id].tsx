import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw'
import dayjs from "dayjs";
import Router from "next/router";
import { getRequest } from "../../../util/axiosInstance";
import useAccessToken from "../../../hooks/useAccessToken";
import CreatedTests from "../../../components/interfaces/CreatedTests";
import Loadder from "../../../components/dashboard/loadingpage";
export default function Dashboard()  {
  const accessToken = useAccessToken();
  const [currentTest, setcurrentTest]= React.useState<CreatedTests | any>({});
  const [loading, setLoading]= React.useState<Boolean>(true);
  React.useEffect(() => {
    const getTest = async () => {
      const path = Router.query.id;
      try {
        const request = await getRequest(
          {
            url: `/tests/${path}`,
            token: accessToken
          });
        const atest = request.data.data.test;
        console.log(atest)
        setcurrentTest(atest);
        setLoading(false)
      } catch (error) {
        console.log("No test was found here")
      }
    };
    getTest();
  }, [accessToken]);

  return (
    <div>
      { loading ? 
    (
      <Loadder/>
    ) 
      : 
    (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="flex justify-between items-center text-sm">
        <div className=" px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Exam Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Exam details and Student submissions.
          </p>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <button
            onClick={() => Router.push("/dashboard")}
            className="shrink inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go Back
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Title of Exam</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {currentTest.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Duration </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {currentTest.duration}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Question</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ReactMarkdown
                children={`${currentTest.question}`}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]} 
              />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Started Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {dayjs(currentTest.startedDate).format("MMMM DD, YYYY hh:mm a")}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">End Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {dayjs(currentTest.endDate).format("MMMM DD, YYYY hh:mm a")}
            </dd>
          </div>
        </dl>
      </div>
    </div>)
      }
    </div>
  );
};
