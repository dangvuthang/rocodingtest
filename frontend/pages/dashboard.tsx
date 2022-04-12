import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import Dslayout from "../components/dashboard/Ds_layout/Dslayout";
import ExamCard from "../components/dashboard/ExamCard";
import Link from "next/link";
import AddExam from "../components/dashboard/AddExam";
import CreatedTests from "../components/interfaces/CreatedTests";
import EditExam from "../components/dashboard/EditExam";
import { getRequest } from "../util/axiosInstance";
import { useEffect } from "react";

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
    <Dslayout>
        <Grid>
          <Box
            width="98%"
            sx={{
              py: 1,
              mx: 1,
              my: 1,
              bgcolor: "white",
              borderRadius: 3.5,
            }}
          >
            {/* Page Content */}
            {

            }
            {/*Toggle between Add Page, Edit Page and Test Created List*/}
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
                <Grid>
                    <Grid item>
                      <Box
                        width="98%"
                        sx={{
                          py: 1.5,
                          mx: 2,
                          my: 2,
                          bgcolor: "white",
                          borderRadius: 3.5,
                        }}
                      >
                        <Grid container direction="row" justifyContent="space-around">
                          <Grid item>
                            <Button
                              variant="contained"
                              startIcon={<AddIcon sx={{ color: "white" }} />}
                              onClick={() => { setAdding(true); } }
                            >
                              Add exam
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>

                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                        {tests.length > 0 ? (
                          tests.map(test => (
                            <ExamCard editRow={editRow} prop={test} deleteExam={deleteExam} />
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3}>No users</td>
                          </tr>
                        )}
                      </Grid>
                </Grid>
              )
            }
            {/* exam 2 */}
          </Box>
        </Grid>
    </Dslayout>
  );
}