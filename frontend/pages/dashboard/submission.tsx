import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/dashboard/Ds_layout/Sidebar'
import useAccessToken from '../../hooks/useAccessToken'
import { getRequest } from '../../util/axiosInstance'

type Props = {}

const submission = (props: Props) => {
    const [submission, setSubmission] = useState([]);
    const accessToken = useAccessToken();

    // useEffect(() => {
    //     const data = getRequest({ url: 'tests/60f552932152bb2281277f01/submissions', token: accessToken })
    //     data.then((result) => {
    //         setSubmission(result.data.data.submissions);
    //         console.log(submission);
    //     }).catch((err) => console.log(err))
    // })

    return (
        <div className="h-screen">
            <div className="h-full flex">
                <Sidebar />
                <div className="w-full gap-5 flex flex-col items-center">
                    <div className="w-full border-b text-center">
                        <h1>Submission</h1>
                    </div>
                    <div className="flex items-center justify-end w-full">
                        <div className="flex border-2 rounded">
                            <input
                                // onChange={handleSearch}
                                type="text"
                                className="px-4 py-2 w-80"
                                placeholder="Search..."
                            />
                        </div>
                    </div>
                    {/* Table display submission */}
                    <table className='table-auto text-center w-fit'>
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="text-white">Exam</th>
                                <th className="text-white">Student ID</th>
                                <th className="text-white">Student Name</th>
                                <th className="text-white">Content</th>
                                <th className="text-white">Submission Time</th>
                                <th className="text-white">Record</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="">Coding Test</td>
                                <td className="">s3817872</td>
                                <td className="">Hoang Ngoc Tuan</td>
                                <td className="">THE TEST IS TOO HARD</td>
                                <td className="">27/03/2022</td>
                                <td className="">625e9ae59128b7cb5e510614</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default submission