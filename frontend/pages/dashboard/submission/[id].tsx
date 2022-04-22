import { useEffect, useState } from "react";
import useAccessToken from "../../../hooks/useAccessToken";
import { getRequest } from "../../../util/axiosInstance";
import Router from "next/router";

interface Submission {
    submissionTime: Date;
    content: string;
    testId: object;
    studentId: object;
    recordId: object;
}

const submission = () => {
    const accessToken = useAccessToken();
    const [submission, setSubmission] = useState<Submission | {}>();

    useEffect(() => {
        const path = Router.query.id;
        const request = getRequest({
            url: `/tests/60f552932152bb2281277f01/submissions/${path}`,
            token: accessToken,
        });
        request.then((data) => {
            setSubmission(data.data.data.submissions);
            console.log(submission);
        }).catch((err) => console.log(err));
    })
    console.log(submission)
    return (
        <div>

        </div>
    )
}

export default submission;