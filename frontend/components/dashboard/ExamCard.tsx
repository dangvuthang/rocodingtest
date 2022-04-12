import { Grid,Box,Paper,IconButton,Typography } from '@mui/material'
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import CreatedTests from "../interfaces/CreatedTests";
import * as React from 'react'
import EditIcon from '@mui/icons-material/Edit';

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
    <Grid item sx={{ width: "90%" }} key={prop.exam_id} mb={2}>
                  <Box mt={3}>
                    <Paper elevation={8}>
                      <Box p={2}>
                        <Grid container spacing={1}>
                          {/* Check Box */}
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
                          {/* Image */}
                          <Grid item xs={2}>
                            <img
                              src="https://picsum.photos/200/200"
                              alt="hehe"
                              width="100%"
                              height="250px"
                            />
                          </Grid>
                          {/* Middle Content */}
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
                          {/* Delete Icon */}
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
  )
}

export default ExamCard