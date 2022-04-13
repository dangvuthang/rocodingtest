import { Grid,Box,Paper,IconButton,Typography } from '@mui/material'
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import CreatedTests from "../interfaces/CreatedTests";
import * as React from 'react'

type Property = {
  prop: CreatedTests;
  deleteExam: (deleteId: number) => void
  editRow: ( prop: CreatedTests| any) =>void
}

const ExamCard: React.FC<Property> =  ({ prop , deleteExam, editRow }) => {
    const [check, setCheck]: any = React.useState([]);
    const handleCheckBox = (index: any) => {
        const foundExam = check.find((x: any) => x === index);
        if (foundExam >= 0) {
        setCheck(check.filter((x: any) => x !== foundExam));
        } else {
        setCheck([...check, index]);
        }
    };
  return (
      <div key={prop.exam_id} className="mt-4 ml-4 mr-4 h-32  border border-black flex gap-3 items-center">
        <div className="w-10">
            <input className="ml-2" type="checkbox" />
        </div>
        <div className="">
            <img src="https://picsum.photos/200/120" />
        </div>
        {/* Exam details */}
        <div className="grid justify-between items-center h-full w-4/6">
            <div>
                <h2 className="text-3xl">{prop.name}</h2>
            </div>
            <div>
                {prop.question}
            </div>
            <div>
                System Admin
            </div>
        </div>
        {/* Button Edit and Delete */}
        <div className="flex mr-4 content-center justify-end gap-2 w-2/6">
            <div>
                <button onClick={ () =>{ editRow(prop)} } className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Edit</button>
            </div>
            <div>
                <button onClick={ () =>{ deleteExam(prop.exam_id)} } className="px-4 py-2 text-white rounded-md border-solid border bg-blue-400 ml-5">Delete</button>
            </div>
        </div>
      </div>
  )
}

export default ExamCard

{/*
  <Grid item sx={{ width: "90%" }} key={prop.exam_id} mb={2}>
                  <Box mt={3}>
                    <Paper elevation={8}>
                      <Box p={2}>
                        <Grid container spacing={1}>
                          <Grid
                            item
                            xs={1}
                            sx={{ display: "flex" }}
                            alignItems="center"
                          >
                            {!check.includes(prop.exam_id) ? (
                              <IconButton onClick={() => handleCheckBox(prop.exam_id)}>
                                <CheckBoxOutlineBlankIcon />
                              </IconButton>
                            ) : (
                              <IconButton onClick={() => handleCheckBox(prop.exam_id)}>
                                <CheckBoxIcon />
                              </IconButton>
                            )}
                          </Grid>
                          <Grid item xs={2}>
                            <img
                              src="https://picsum.photos/200/200"
                              alt="hehe"
                              width="100%"
                              height="250px"
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <Grid
                              container
                              direction="column"
                              justifyContent="space-between"
                              sx={{ height: "100%" }}
                            >
                              <Grid item>
                                <Typography variant="h2" textAlign="left" p={1}>
                                    {prop.name}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Typography variant="body2" p={1}>
                                    Defaut Category{" "}
                                  </Typography>
                                  <Typography>|</Typography>
                                  <Typography variant="body2" p={1}>
                                    huhu{" "}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item>
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Typography variant="body2" p={1}>
                                    {prop.question}
                                  </Typography>
                                  <Typography variant="body2" p={1}>
                                    Created Time: 28/02/2022
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            sx={{ display: "flex" }}
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <IconButton>
                              <DeleteIcon 
                              onClick={ () =>{
                                deleteExam(prop.exam_id)
                              }
                              }/>
                            </IconButton>
                            <IconButton>
                              <EditIcon 
                             onClick={ () =>{
                              editRow(prop)
                            }}
                              />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Box>
                </Grid>
  */}