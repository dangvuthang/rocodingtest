import { useEffect, useState } from "react";
import useAccessToken from "../../../hooks/useAccessToken";
import { getRequest } from "../../../util/axiosInstance";
import Router from "next/router";
import { SubmissionDetail } from "../submission";
import dayjs from "dayjs";
import Link from 'next/link'
import Editor from "@monaco-editor/react";


const Submission = () => {
    const accessToken = useAccessToken();
    const [submission, setSubmission] = useState<SubmissionDetail>();

    useEffect(() => {
        console.log("hehe")
        const path = Router.query.id;
        console.log(path)
        if (accessToken) {
            const getSubmission = getRequest({
                url: `/tests/60f552932152bb2281277f01/submissions/${path}`,
                token: accessToken,
            });
            getSubmission.then((data) => {
                setSubmission(data.data.data.submissions);
            }).catch((err) => console.log(err));
        }
    }, [accessToken])
    console.log(submission);
    return (
        <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="flex justify-between items-center text-sm">
                    <div className=" px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Submission Detail
                        </h3>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                        <Link href="/dashboard/submission">
                            <button
                                className="shrink inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Go Back
                            </button>
                        </Link>
                    </div>
                </div>
                <div className=" border-gray-200">
                    <dl>
                        <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Student ID</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {submission?.studentId._id}
                            </dd>
                        </div>
                        <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Student Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {submission?.studentId.fullName}
                            </dd>
                        </div>
                        <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Title of Exam</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {submission?.testId}
                            </dd>
                        </div>
                        <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Submission Time</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {dayjs(submission?.submissionTime).format("MMMM DD, YYYY hh:mm a")}
                            </dd>
                        </div>
                        <div className="bg-white border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Student Submission</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <Editor
                                    width="100%"
                                    height="100%"
                                    theme="vs-dark"
                                    value={submission?.content}
                                />
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default Submission;