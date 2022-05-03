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
import { AttachmentSharp } from "@mui/icons-material";

export interface studentId {
  _id: string;
  fullName: string;
  email: string;
  photoUrl: string;
  role: string;
}

export interface recordId {
  attendanceDate: string;
  evidence: string[];
  numberOfCheats: number;
  testId: string;
  userId: string;
  _id: string;
}
export interface SubmissionDetail {
  _id: string;
  submissionTime: Date;
  content: string;
  testId: string;
  studentId: studentId;
  recordId: recordId;
}

export default function Dashboard() {
  const accessToken = useAccessToken();
  const [currentTest, setcurrentTest] = React.useState<CreatedTests | any>({});
  const [submissions, setSubmissions] = React.useState<SubmissionDetail[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(true);


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

      } catch (error) {
        console.log("No test was found here")
      }
    };
    getTest();
  }, [accessToken]);


  React.useEffect(() => {
    const path = Router.query.id;
    if (accessToken) {
      const data = getRequest({ url: `tests/${path}/submissions`, token: accessToken })
      data.then((result) => {
        setSubmissions(result.data.data.submissions);
        setLoading(false)
      }).catch((err) => console.log("There is no submission for this test!"))
    }

  }, [accessToken])
  console.log(submissions)

  const showSubmission = (id: string): void => {
    Router.push({
      pathname: 'submission/[sid]',
      query: { sid: id, tid: currentTest._id }
    });
  }

  return (
    <div>
      {loading ?
        (
          <Loadder />
        )
        :
        (
          <div>
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
            </div>
            {submissions.length !== 0 ? (<div className="mt-6">
              <div className="w-full mb-6 items-center">
                <div className="w-full text-center font-medium leading-tight text-3xl">
                  <h1 className="">Student Submission</h1>
                </div>
              </div>
              <table className='table-auto text-center min-w-full'>
                <thead>
                  <tr className="border-b">
                    <th className="text-black px-18 ">Student Email</th>
                    <th className="text-black px-18 ">Student Name</th>
                    <th className="text-black px-18 ">Avatar</th>
                    <th className="text-black px-18 ">Content</th>
                    <th className="text-black px-18 ">Submission Time</th>
                    <th className="">
                      <span className="sr-only">View</span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub._id}>
                      <td className="pt-6 px-4">{sub.studentId?.email}</td>
                      <td className="pt-6 px-4">{sub.studentId?.fullName}</td>
                      <td className="pt-6 px-4"><img className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-center object-cover" src={sub.studentId?.photoUrl} /></td>
                      <td className="pt-6 px-4 truncate">{sub.content === "" ? (<p>This content is empty</p>) : sub.content}</td>
                      <td className="pt-6 px-4">{dayjs(sub.submissionTime).format("MMMM DD, YYYY hh:mm a")}</td>
                      <td className="px-6 px-4 pt-5 text-right">
                        <button onClick={() => showSubmission(sub._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>) : (<div className="text-center mt-16 font-medium leading-tight text-3xl">There is no submission for this test yet.</div>)}


          </div>
        )
      }
    </div>
  );
};
