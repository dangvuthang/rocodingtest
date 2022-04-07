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
import AddExam from "./addexam";
import Person from "../components/interfaces/Person";
import EditExam from "./editexam";

export default function Dashboard() {
  const usersData = [
		{ id: 1, name: 'Tania', username: 'floppydiskette' },
		{ id: 2, name: 'Craig', username: 'siliconeidolon' },
		{ id: 3, name: 'Ben', username: 'benisphere' },
	]
  const [ users, setUsers ] = React.useState(usersData)
  const [currentUser, setCurrentUser] = React.useState<Person| {}>();
  const [ editing, setEditing ] = React.useState(false)
	const [ adding, setAdding ] = React.useState(false)

  const addExam = async (e: React.FormEvent, formData: Person) => {
    e.preventDefault()
    const user: Person = {
      id: Math.random(),
      name: formData.name,
      username: formData.username,
    }
    setUsers([ ...users, user])
  }

  const deleteExam = async (deleteId: number) => {
    const exams: Person[] = users.filter((exam: Person) => exam.id !== deleteId)
    console.log(exams)
    setUsers(exams)
  }
  const updateExam = (id: number, updatedUser: any) => {

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = async ( user:any ) => {
    setEditing(true)
		setCurrentUser({ id: user.id, name: user.name, username: user.username })
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
                  {users.length > 0 ? (
                    users.map(user => (
                      <ExamCard editRow={editRow} prop={user} deleteExam={deleteExam}/>
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
