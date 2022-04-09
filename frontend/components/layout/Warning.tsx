import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";
import { red } from "@mui/material/colors";
import { WarningAmber } from "@mui/icons-material";
import dayjs from "dayjs";
interface WarningProps {
  message: string;
  open: boolean;
  remainingTime: number;
  onClose: () => Promise<void>;
}

const Warning: FC<WarningProps> = ({
  open,
  onClose,
  message,
  remainingTime,
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ color: red[500] }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <WarningAmber fontSize="small" sx={{ marginRight: "3px" }} />
          <span>
            Cheating Detection (You have {remainingTime} attempts left)
          </span>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          We have detected that {message} at{" "}
          <strong>{dayjs().format("HH:mm:ss")}</strong>, and notified your
          teacher accordingly. You have{" "}
          <strong>{remainingTime} attempts</strong> left before the exam will be
          forced to submit.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: red[500] }} onClick={onClose}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Warning;
