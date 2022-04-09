import { Box, Grid } from "@mui/material";
import Timer from "../components/Timer";
import dynamic from "next/dynamic";
import { useEffect, useState, MouseEvent, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExamButton from "../components/ExamButton";
import useFullScreen from "../hooks/useFullScreen";
import Editor from "../components/Editor";
import InstructionBox from "../components/InstructionBox";
import useWindowFocus from "../hooks/useWindowFocus";
import Warning from "../components/layout/Warning";
import Router from "next/router";
const QuestionArea = dynamic(() => import("../components/QuestionArea"), {
  ssr: false,
});

const Exam = () => {
  const [runCode, setRunCode] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const [remainingTime, setRemainingTime] = useState(3);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(true);

  const isFullscreen = useFullScreen();
  const isFocused = useWindowFocus();
  const count = useRef(0);
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseWarning = async () => {
    if (!isFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
      } catch (error) {
        console.log(error);
      }
    }
    setShowAlertMessage(false);
  };

  useEffect(() => {
    if (open) return;
    if (!isFocused) {
      setAlertMessage("you are trying to navigate outside of the web page");
      setShowAlertMessage(true);
      setRemainingTime((time) => time - 1);
    }
  }, [isFocused, open]);

  useEffect(() => {
    if (open) return;
    if (!isFullscreen) {
      count.current++;
      if (count.current === 1) return;
      setAlertMessage("you are trying to minimize the web page");
      setShowAlertMessage(true);
      setRemainingTime((time) => time - 1);
    }
  }, [isFullscreen, open]);

  useEffect(() => {
    if (remainingTime === 0) {
      Router.push("/")
        .then(() => document.exitFullscreen())
        .then(() => console.log("DONE"))
        .catch((err) => console.log(err));
    }
  }, [remainingTime]);

  return (
    <>
      {open && <InstructionBox open={open} onClose={handleClose} />}
      <Warning
        open={showAlertMessage}
        message={alertMessage}
        onClose={handleCloseWarning}
        remainingTime={remainingTime}
      />
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
