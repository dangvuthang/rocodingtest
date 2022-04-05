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

export default function Dashboard() {
  const [data, setData] = React.useState([1, 2, 3, 4, 5]);
  const [check, setCheck]: any = React.useState([]);
  const handleCheckBox = (index: any) => {
    const foundExam = check.find((x: any) => x === index);
    if (foundExam >= 0) {
      setCheck(check.filter((x: any) => x !== foundExam));
    } else {
      setCheck([...check, index]);
    }
  };
  console.log(check);
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
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {data.map((exam, index) => (
                <Grid item sx={{ width: "90%" }} key={index} mb={2}>
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
                            {!check.includes(index) ? (
                              <IconButton onClick={() => handleCheckBox(index)}>
                                <CheckBoxOutlineBlankIcon />
                              </IconButton>
                            ) : (
                              <IconButton onClick={() => handleCheckBox(index)}>
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
                                <Typography variant="h3" textAlign="left" p={1}>
                                  Test
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
                                    System Admin
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
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Box>
                </Grid>
              ))}
            </Grid>
            {/* exam 2 */}
          </Box>
        </Grid>
      </Grid>
    </Dslayout>
  );
}
