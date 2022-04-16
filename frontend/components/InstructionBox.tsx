import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { FC, MouseEvent, useState } from "react";

interface InstructionBoxProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  "Read before you start",
  "Number of attempts",
  "Procceed to start",
];

const contents = [
  "To ensure the quality of the test, you are required to enter fullscreen mode. Please do not attempt to cheat as it will be recorded.",
  "You only have a maximum of 3 attempts to do the test. If you cheat, you will lose an attempt for each turn and a warning will show up to warn you.",
  "Clicking on the finish will cause the whole screen to enter fullscreen, please make sure you do not accidently press esc or f11 during exam time",
];

const InstructionBox: FC<InstructionBoxProps> = ({ open, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStep = (state: "back" | "next" | "finish") => {
    return (_: MouseEvent) => {
      if (state === "back") {
        setCurrentStep((step) => step - 1);
      } else if (state === "next") {
        setCurrentStep((step) => (step + 1 === 3 ? step : step + 1));
      } else {
        document.documentElement
          .requestFullscreen()
          .then(() => onClose())
          .catch((err) => console.log(err));
      }
    };
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEscapeKeyDown={true}
    >
      <DialogTitle id="alert-dialog-title">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contents[currentStep]}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
          width: "100%",
          justifyContent: currentStep === 0 ? "flex-end" : "space-between",
        }}
      >
        <Button
          color="inherit"
          onClick={handleStep("back")}
          sx={{ display: currentStep === 0 ? "none" : "block" }}
        >
          Back
        </Button>
        <Button
          onClick={handleStep(
            currentStep === steps.length - 1 ? "finish" : "next"
          )}
        >
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstructionBox;
