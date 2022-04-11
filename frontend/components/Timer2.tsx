import { FC, useEffect, useState } from "react";
import { ClockIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const deadline = dayjs().add(1, "hour");

interface Timer2Props {}

const Timer2: FC<Timer2Props> = () => {
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
    <div className="flex bg-red-600 text-white gap-x-1 items-center opacity-[0.77] px-12 justify-center border rounded-t-xl text-lg">
      <ClockIcon className="h-5 w-5 flex" />
      <span className="flex">Time remaining: {remainingTime}</span>
    </div>
  );
};

export default Timer2;
