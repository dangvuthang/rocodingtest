import { useEffect, useState } from "react";
import useAccessToken from "../../../../hooks/useAccessToken";
import Router, { useRouter, withRouter } from "next/router";
import dayjs from "dayjs";
import Editor from "@monaco-editor/react";
import { getRequest } from "../../../../util/axiosInstance";
import Loadder from "../../../../components/dashboard/loadingpage";
import { SubmissionDetail } from "../../../../components/interfaces/SubmissionDetail";

const Submission = (props: any) => {
  const accessToken = useAccessToken();
  const [submission, setSubmission] = useState<SubmissionDetail>();
  const [evidences, setEvidences]: any = useState<string[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const path = Router.query.id;
    const tid: string = props.router.query.tid;
    if (accessToken) {
      const getSubmission = getRequest({
        url: `/tests/${tid}/submissions/${path}`,
        token: accessToken,
      });
      getSubmission
        .then((data) => {
          const submission = data.data.data.submissions;
          setSubmission(submission);
          setEvidences(submission.recordId.evidence);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [accessToken, props.router.query.tid]);

  return (
    <div>
      {loading ? (
        <Loadder />
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <div className=" px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Submission Detail
              </h3>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <button
                onClick={() => router.back()}
                className="shrink inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go Back
              </button>
            </div>
          </div>
          <div className="border-2 rounded-md mx-auto mb-2 w-5/6">
            <dl>
              <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Student Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {submission?.studentId?.email}
                </dd>
              </div>
              <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Student Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {submission?.studentId?.fullName}
                </dd>
              </div>
              <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Submission Time
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {dayjs(submission?.submissionTime).format(
                    "MMMM DD, YYYY hh:mm a"
                  )}
                </dd>
              </div>
              {submission?.recordId?.numberOfCheats ? (
                <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Number of Cheats
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {submission?.recordId?.numberOfCheats}
                  </dd>
                </div>
              ) : (
                <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Number of Cheats
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    0
                  </dd>
                </div>
              )}

              {submission?.recordId?.numberOfCheats ? (
                <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Evidence
                  </dt>
                  <div className="col-span-2 grid grid-cols-2 gap-3">
                    {evidences?.map((evidence: any) => (
                      <div
                        key={evidence}
                        className="rounded overflow-hidden shadow-lg"
                      >
                        <a href={evidence}>
                          <img
                            className="w-full"
                            src={evidence}
                            alt="evidence"
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Evidence
                  </dt>
                  <div className="col-span-2 grid grid-cols-2 gap-3">
                    {evidences?.map((evidence: any) => (
                      <div
                        key={evidence}
                        className="rounded overflow-hidden shadow-lg"
                      >
                        <p>There is no cheating commitment.</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Student Submission
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 h-[30vh]">
                  <Editor
                    width="100%"
                    height="30vh"
                    theme="vs-dark"
                    value={submission?.content}
                  />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(Submission);
