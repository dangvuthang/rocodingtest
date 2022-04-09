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
  
  const [ tests, setTests] = React.useState<CreatedTests[]>([])

  const [currentUser, setCurrentUser] = React.useState<CreatedTests| {}>()
  const [ editing, setEditing ] = React.useState(false)
	const [ adding, setAdding ] = React.useState(false)

  useEffect (() => {
    const testData = getRequest({url: "/users/60f6ce0e02f5102cea240400/tests"})
    testData.then(result => {
      setTests(result.data.data.tests)
    }).catch(err => {
      console.log(err)
    })
  },[])
  console.log(tests);

  const addExam = async (e: React.FormEvent, formData: CreatedTests) => {
    e.preventDefault()
    const test: CreatedTests = {
      _id: formData._id,
      name: formData.name,
      question: formData.question,
    }
    setTests([ ...tests, test])
  }

  const deleteExam = async (deleteId: string) => {
    const exams: CreatedTests[] = tests.filter((exam: CreatedTests) => exam._id !== deleteId)
    console.log(exams)
    setTests(exams)
  }
  const updateExam = (_id: string, updatedTest: any) => {

		setTests(tests.map(test => (test._id === "_id" ? updatedTest : test)))
	}

	const editRow = async ( test:any ) => {
    setEditing(true)
		setCurrentUser({ id: test._id, name: test.name, })
    console.log(currentUser)
	}

  return (
    <Dslayout>
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
                    onClick={()=>{setAdding(true)}}
                  >
                    Add exam
                  </Button>
              </Grid>
              <Grid item>
                <Button variant="contained">Weekly Details</Button>
              </Grid>
              <Grid item>
                <Button variant="contained">Move to category</Button>
              </Grid>
              <Grid item>
                <Button variant="contained">Move to archiev</Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <Box
            width="98%"
            sx={{
              py: 1,
              mx: 2,
              my: 2,
              bgcolor: "white",
              borderRadius: 3.5,
            }}
          >
            {/* Page Content */}
            {

            }
            {/*Toggle between Add Page, Edit Page and Test Created List*/ }
            {
                editing ? 
              (      
                <EditExam editing={editing} setEditing={setEditing} updateExam={updateExam} currentUser={currentUser}/>
              ) 
                : adding ? 
              (      
                <AddExam adding={adding} setAdding={setAdding} saveExam={addExam} />
              ) 
                : 
              (
                <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                  {tests.length > 0 ? (
                    tests.map(test => (
                      <ExamCard editRow={editRow} prop={test} deleteExam={deleteExam}/>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No users</td>
                    </tr>
                  )}
                </Grid>
              )
            }
            {/* exam 2 */}
          </Box>
        </Grid>
      </Grid>
    </Dslayout>
  );
}
