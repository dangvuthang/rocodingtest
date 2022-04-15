
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
