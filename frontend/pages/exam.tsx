import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import Timer from "../components/Timer";
import dynamic from "next/dynamic";
import { useEffect, useState, MouseEvent } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExamButton from "../components/ExamButton";
import useFullScreen from "../hooks/useFullScreen";
import Editor from "../components/Editor";
const QuestionArea = dynamic(() => import("../components/QuestionArea"), {
  ssr: false,
});

const Exam = () => {
  const [runCode, setRunCode] = useState(false);
  const isFullscreen = useFullScreen();
  const [open, setOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState(3);

  useEffect(() => {
    if (!isFullscreen && remainingTime === 3) {
      setOpen(true);
    }
  }, [isFullscreen, remainingTime]);

  const handleClose = (_: {}, reason: string) => {
    if (reason && reason == "backdropClick") return;
    setOpen(false);
  };

  const handleClickOpen = () => setOpen(true);
  const handleOnClick = (e: MouseEvent) => {
    document.documentElement
      .requestFullscreen()
      .then((value) => setOpen(false))
      .catch((err) => console.log("error"));
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ position: "absolute", top: 0, left: 0 }}
      >
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="alert-dialog-title">
          Exam requirement: Fullscreen
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To ensure the quality of the test, you are required to enter
            fullscreen mode. Please ensure that you do not exit or change tab
            during exam time as it will be recorded and sent to your teacher.
            You can only recover 3 times before
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClick} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container>
        <Grid item container direction="column" sx={{ height: "100vh" }} xs={3}>
          <Grid
            item
            sx={{
              width: "100%",
              overflowY: "scroll",
              px: "20px",
              height: "100%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <QuestionArea />
          </Grid>
        </Grid>
        <Grid item container direction="column" sx={{ height: "100vh" }} xs={9}>
          <Grid
            item
            xs={0.5}
            container
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Timer />
          </Grid>
          <Grid
            item
            sx={{
              backgroundColor: "#f7f9fa",
              position: "relative",
            }}
            p={1}
            pr={0}
            xs={10.5}
          >
            <Editor />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "20%",
                backgroundColor: "#fff",
                transition: "all 2s",
                display: runCode ? "flex" : "none",
              }}
            >
              <Grid container direction="column" sx={{ height: "100%" }}>
                <Grid
                  item
                  xs={3}
                  container
                  sx={{
                    backgroundColor: "#9e9e9e4d",
                    color: "#263238",
                    fontSize: "0.8rem",
                  }}
                  justifyContent="space-between"
                >
                  <Box
                    sx={{
                      backgroundColor: "#fff",
                      px: 2,
                      py: 1,
                      border: "2px solid transparent",
                    }}
                  >
                    Run Code Result
                  </Box>
                  <Box px={2} py={1}>
                    <KeyboardArrowDownIcon
                      fontSize="small"
                      sx={{
                        opacity: "0.5",
                        "&:hover": { opacity: "1" },
                        cursor: "pointer",
                        height: "100%",
                      }}
                      onClick={() => setRunCode(false)}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: "90%",
                      margin: "auto",
                      border: "1px solid black",
                      height: "80%",
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            item
            xs={1}
            container
            justifyContent="flex-end"
            alignItems="center"
            sx={{ borderTop: "1px solid #eeeeee" }}
          >
            <ExamButton
              style="outlined"
              onClick={() => setRunCode((state) => !state)}
            >
              Run code
            </ExamButton>
            <ExamButton>Submit</ExamButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Exam;
