import CreatedTests from "../interfaces/CreatedTests";
import * as React from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Router from "next/router";
dayjs.extend(isBetween);

type Property = {
  prop: CreatedTests | any;
  deleteExam: (deleteId: string) => void;
  editRow: (prop: CreatedTests | any) => void;
  showExam: (prop: CreatedTests | any) => void;
};

const handleDuraionValue = (duraionNum: number) => {
  if (duraionNum <= 3600) {
    return `${duraionNum / 60} mins `;
  } else if (duraionNum > 3600) {
    return `${Math.floor(duraionNum / 3600)} hour `;
  } else {
    return ``;
  }
};

const ExamCard: React.FC<Property> = ({
  prop,
  deleteExam,
  editRow,
  showExam,
}) => {
  const handleNoti = () => {
    Router.push("/dashboard/notify");
  };
  console.log(prop);
  const handleMonitor = () => {
    Router.push(`/dashboard/monitor/${prop.conversationSid}`);
  };

  const isAvailable = dayjs().isBetween(
    dayjs(new Date(prop.startedDate)),
    dayjs(new Date(prop.endDate))
  );

  return (
    <div
      key={prop._id}
      className="mt-4 ml-4 mr-4 h-32  border border-black flex gap-3 items-center"
    >
      <div className="">
        <img src="https://picsum.photos/200/150" />
      </div>
      {/* Exam details */}
      <div className="grid justify-between items-center h-full w-4/6 gap-3">
        <div>
          <h2
            onClick={() => {
              showExam(prop);
            }}
            className="hover:cursor-pointer hover:text-sky-500 active:text-opacity-50 text-3xl"
          >
            {prop.name}
          </h2>
        </div>
        <div>
          <h3 className="text-lg">{handleDuraionValue(prop.duration)}</h3>
        </div>
        <div className="text-[#ACB3C8]">
          Exam started at {dayjs(prop.startedDate).format("HH:MM MM/DD/YYYY")}
        </div>
      </div>
      {/* Button Edit and Delete */}
      <div className="flex mr-4 content-center justify-end gap-1 w-2/6">
        <div>
          <button
            className="btn disabled:cursor-not-allowed disabled:bg-slate-400"
            onClick={handleMonitor}
            disabled={!!!isAvailable}
          >
            Monitor
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              handleNoti();
            }}
            className="btn"
          >
            Notify
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              editRow(prop);
            }}
            className="btn"
          >
            Edit
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              deleteExam(prop._id);
              console.log(prop._id);
            }}
            className="btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
