
import * as React from "react";
import ExamCard from "../components/dashboard/ExamCard";
import Link from "next/link";
import AddExam from "../components/dashboard/AddExam";
import CreatedTests from "../components/interfaces/CreatedTests";
import EditExam from "../components/dashboard/EditExam";
import { getRequest } from "../util/axiosInstance";
import { useEffect } from "react";
import Header from "../components/layout/Header";
import { Typography } from "@mui/material";
import NavDrawer from "../components/dashboard/Ds_layout/NavDrawer";

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

    function Copyright(props: any) {
        return (
            <footer className="w-full h-20 static bottom-0 mt-4 flex justify-center items-center">
                <Typography variant="body2" color="text.secondary" align="center" {...props}>
                    {'Copyright © '}
                    <Link href="https://mui.com/">
                        Your Website
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </footer>
        );
    }


    return (
        <NavDrawer>
            {   
                    editing ? 
                (      
                    <EditExam setEditing={setEditing} updateExam={updateExam} currentUser={currentUser}/>
                ) 
                    : adding ? 
                (      
                    <AddExam setAdding={setAdding} saveExam={addExam} />
                ) 
                    : 
                (
                    <div className="w-full">
                        <div className="h-20 grid grid-cols-4 content-center justify-items-center border-l border-b border-black">
                            <div>
                                <button onClick={ () => setAdding(true) }className="ml-5 px-4 py-2 text-white rounded-md border-solid border bg-blue-400">
                                    Add Exam
                                </button>
                            </div>
                        </div>
                        {/* Exam area */}
                        <div className="h-full">
                                {tests.length > 0 ? (
                                    tests.map(test => (
                                        <ExamCard editRow={editRow} prop={test} deleteExam={deleteExam} />
                                    ))
                                ) : (
                                <tr>
                                    <td colSpan={3}>No users</td>
                                </tr>
                                )}
                        </div>
                    </div>
                )
            }
            <Copyright />
        </NavDrawer>
    );
}

{/* SideBar */}
                {/*<aside className="w-64" aria-label="Sidebar">
                    <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                    <span className="ml-3">Exam List</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Student</span>
                                    <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> 
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                                    <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside> 
            */}
                {/* Content */}
               
                        {/* Exam box */}