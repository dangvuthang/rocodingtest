import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/dashboard/Ds_layout/Sidebar'
import useAccessToken from '../../hooks/useAccessToken'
import { getRequest } from '../../util/axiosInstance'
import dayjs from 'dayjs'
import CreatedTests from '../../components/interfaces/CreatedTests'


type Props = {}

export interface studentId {
    _id: string;
    fullName: string;
    email: string;
    photoUrl: string;
    role: string;
}
export interface SubmissionDetail {
    _id: string;
    submissionTime: Date;
    content: string;
    testId: string;
    studentId: studentId;
    recordId: string;
}

const Submissions = (props: Props) => {
    const lgStyle = {
        flexGrow: 1,
        background: "-webkit-linear-gradient(180deg, rgba(230, 0, 40, 0.723958) 0%, #F4B30B 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        TextFillColor: 'transparent',
        letterSpacing: '0.1rem',
        fontSize: 33,
        fontWeight: 800,
        fontStyle: 'normal',
        fontFamily: 'Caveat Brush',
    } as const;

    const [submissions, setSubmissions] = useState<SubmissionDetail[]>([]);
    const [tests, setTests] = useState<CreatedTests>()
    const [inputSearch, setInputSearch] = React.useState("");
    const accessToken = useAccessToken();

    useEffect(() => {
        console.log("hehe");
        if (accessToken) {
            const data = getRequest({ url: 'tests/60f552932152bb2281277f01/submissions', token: accessToken })
            data.then((result) => {
                setSubmissions(result.data.data.submissions);

            }).catch((err) => console.log(err))
        }
    }, [accessToken])

    useEffect(() => {
        if (accessToken) {
            const test = getRequest({ url: '/users/60f6ce0e02f5102cea240400/tests', token: accessToken })
            test.then((result) => {
                setTests(result.data.data.tests);
                console.log(tests);
            }).catch((err) => console.log(err))
        }
    }, [accessToken])

    const handleSearch = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setInputSearch(e.target.value.toLowerCase());
    };
    const filteredData = submissions.filter((el) => {
        if (!inputSearch) {
            return el;
        } else {
            return el.studentId.fullName.toLowerCase().includes(inputSearch);
        }
    });

    return (
        <div className="h-screen">
            <div className="h-full flex">
                <Sidebar />
                <div className="w-full gap-5 flex flex-col items-center">
                    <div className="w-full text-center">
                        <h1 style={lgStyle}>Submission</h1>
                    </div>
                    <div className="flex items-center justify-end w-full">
                        <div className="flex border-2 rounded">
                            <input
                                onChange={handleSearch}
                                type="text"
                                className="px-4 py-2 w-80"
                                placeholder="Search..."
                            />
                        </div>
                    </div>
                    {/* Table display submission */}
                    <table className='table-auto text-center min-w-full'>
                        <thead>
                            <tr className="border-b">
                                <th className="text-black px-18 ">Student Email</th>
                                <th className="text-black px-18 ">Student Name</th>
                                <th className="text-black px-18 ">Avatar</th>
                                <th className="text-black px-18 ">Exam</th>
                                <th className="text-black px-18 ">Content</th>
                                <th className="text-black px-18 ">Submission Time</th>
                                <th className="">
                                    <span className="sr-only">View</span>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((sub) => (
                                <tr key={sub._id}>
                                    <td className="pt-6 px-4">{sub.studentId.email}</td>
                                    <td className="pt-6 px-4">{sub.studentId.fullName}</td>
                                    <td className="pt-6 px-4"><img className="inline-block h-12 w-12 rounded-full ring-2 ring-white object-center object-cover" src={sub.studentId.photoUrl} /></td>
                                    <td className="pt-6 px-4">{sub.testId}</td>
                                    <td className="pt-6 px-4 truncate">{sub.content}</td>
                                    <td className="pt-6 px-4">{dayjs(sub.submissionTime).format("MMMM DD, YYYY hh:mm a")}</td>
                                    <td className="px-6 px-4 pt-5 text-right">
                                        <a href={`submission/${sub._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Submissions