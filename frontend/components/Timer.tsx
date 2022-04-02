import { FC, useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import { Box } from "@mui/material";
import { Timer as Time } from "@mui/icons-material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const deadline = dayjs().add(1, "hour");

interface TimerProps {}

const Timer: FC<TimerProps> = () => {
  const [remainingTime, setRemainingTime] = useState("Loading...");

  useEffect(() => {
    const id = setInterval(() => {
      const currentTime = dayjs();
      const timeLeft = dayjs.duration(deadline.diff(currentTime));
      setRemainingTime(timeLeft.format("HH:mm:ss"));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Box
      px={6}
      sx={{
        marginRight: "10px",
        backgroundColor: red[600],
        opacity: "0.8",
        color: red[50],
        overflow: "hidden",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Time fontSize="small" sx={{ display: "inline-block", mr: "2px" }} />
      Time remaining: {remainingTime}
    </Box>
  );
};

export default Timer;
