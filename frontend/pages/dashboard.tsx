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
import * as React from "react";
import Dslayout from "../components/dashboard/Dslayout/Dslayout";

export default function Dashboard() {
  const [check, setCheck] = React.useState(false);
  const handleCheckBox = () => {
    setCheck(!check);
    console.log(check);
  };
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
                <Button variant="contained" startIcon={<AddIcon />}>
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
              height: "80vh",
            }}
          >
            {/* Page Content */}
            <Grid
              container
              spacing={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sx={{ width: "90%" }}>
                <Box mb={3}>
                  <Paper>
                    <Box p={2}>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item>
                          {check === false ? (
                            <IconButton onClick={handleCheckBox}>
                              <CheckBoxOutlineBlankIcon />
                            </IconButton>
                          ) : (
                            <IconButton onClick={handleCheckBox}>
                              <CheckBoxIcon />
                            </IconButton>
                          )}
                        </Grid>
                        <Grid item>
                          <img
                            src="https://picsum.photos/200/200"
                            alt="hehe"
                            width="100%"
                          />
                        </Grid>
                        <Grid item>
                          <Grid container direction="column" spacing={6}>
                            <Grid item>
                              <Typography variant="h2">Test</Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body2">hehe </Typography>
                              <Typography variant="body2">hehe</Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body2">hehe</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Dslayout>
  );
}
