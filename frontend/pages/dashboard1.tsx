
import * as React from "react";
import ExamCard from "../components/dashboard/ExamCard";
import AddExam from "../components/dashboard/AddExam";
import CreatedTests from "../components/interfaces/CreatedTests";
import EditExam from "../components/dashboard/EditExam";
import { getRequest } from "../util/axiosInstance";
import { useEffect } from "react";
import DashboardNav from "../components/dashboard/Ds_layout/DashboardNav";
import Sidebar from "../components/dashboard/Ds_layout/Sidebar";
import Pagination from "../components/dashboard/Ds_layout/Pagination";



export default function Dashboard() {

    const [tests, setTests] = React.useState<CreatedTests[]>([])

    const [currentUser, setCurrentUser] = React.useState<CreatedTests | {}>()
    const [editing, setEditing] = React.useState(false)
    const [adding, setAdding] = React.useState(false)

    useEffect(() => {
        const testData = getRequest({ url: "/users/60f6ce0e02f5102cea240400/tests" })
        testData.then(result => {
            setTests(result.data.data.tests)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    console.log(tests);

    const addExam = async (e: React.FormEvent, formData: CreatedTests) => {
        e.preventDefault()
        const test: CreatedTests = {
            exam_id: Math.random(),
            _id: formData._id,
            name: formData.name,
            question: formData.question,
        }
        setTests([...tests, test])
    }

    const deleteExam = async (deleteId: number) => {
        const exams: CreatedTests[] = tests.filter((exam: CreatedTests) => exam.exam_id !== deleteId)
        console.log(exams)
        setTests(exams)
    }
    const updateExam = (exam_id: number, updatedTest: any) => {

        setTests(tests.map(test => (test.exam_id === exam_id ? updatedTest : test)))
    }

    const editRow = async (test: any) => {
        setEditing(true)
        setCurrentUser({ exam_id: test.exam_id, name: test.name, question: test.question, })
        console.log(currentUser)
    }


    return (
        <div className="h-screen">
            <DashboardNav />
            <div className="h-full flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Content */}
                <div className="w-full h-screen">
                    {/* Button Area */}
                    <div className="h-20 grid grid-cols-2 content-center justify-items-center border-l border-b border-black">
                        <div>
                            <button className="flex items-center btn" onClick={() => setAdding(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Exam
                            </button>
                        </div>
                        <div>
                            <button className="btn">
                                Delete Button
                            </button>
                        </div>
                    </div>
                    {/* End Button Area */}

                    {/* Pagination */}
                    <div>
                        <div>
                            <Pagination />
                        </div>
                    </div>
                    {/* End Pagination */}

                    {/* Exam Area */}
                    <div className="mt-4 ml-4 mr-4 h-32  border border-black flex gap-3 items-center">
                        <div className="w-10">
                            <input className="ml-2" type="checkbox" />
                        </div>
                        <div className="">
                            <img src="https://picsum.photos/200/120" />
                        </div>
                        {/* Exam details */}
                        <div className="grid justify-between items-center h-full w-4/6">
                            <div>
                                <h2 className="text-3xl">Test</h2>
                            </div>
                            <div>
                                45 mins
                            </div>
                            <div>
                                System Admin
                            </div>
                        </div>
                        {/* Button Edit and Delete */}
                        <div className="flex mr-4 content-center justify-end gap-2 w-2/6">
                            <div>
                                <button className="ml-5 px-4 py-2 text-white rounded-md border-solid border bg-blue-400 hover:bg-blue-500 active:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">Edit</button>
                            </div>
                            <div>
                                <button className="ml-5 px-4 py-2 text-white rounded-md border-solid border bg-blue-400 hover:bg-blue-500 active:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
