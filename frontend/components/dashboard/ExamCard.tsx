import CreatedTests from "../interfaces/CreatedTests";
import * as React from "react";
import dayjs from "dayjs";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from "react-toastify";
import isBetween from "dayjs/plugin/isBetween";
import Router from "next/router";
dayjs.extend(isBetween);

type Property = {
  randomNum: number;
  prop?: CreatedTests | any;
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
  randomNum,
  prop,
  deleteExam,
  editRow,
  showExam,
}) => {
  const [copy, setCopy] = React.useState(false);

  const handleNoti = () => {
    Router.push("/dashboard/notify");
  }
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
      className="mt-4 ml-4 mr-4 h-32 lg:h-44  border border-black flex gap-3 items-center"
    >
      <div className="">
        <img src={`https://picsum.photos/200/200?random=${randomNum}`} />
      </div>
      {/* Exam details */}
      <div className="grid justify-between items-center h-full w-4/6 gap-3">
        <div>
          <h2
            onClick={() => {
              showExam(prop);
            }}
            className="hover:cursor-pointer hover:text-sky-500 active:text-opacity-50 text-3xl mr-2"
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
      <div className="flex mr-4 justify-end gap-4 w-2/6">
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
          {copy ?
            (<button className="cursor-not-allowed inline-flex justify-center py-2 px-7 border border-transparent shadow-sm text-sm rounded-md text-white bg-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>)
            :
            (<CopyToClipboard text={`http://localhost:3000/exam/${prop._id}`} onCopy={() => toast.success("Copied exam link to clipboard", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 4000,
              icon: "🔥",
              onOpen: () => setCopy(!copy)
            })}>
              <button
                className="btn"
              >
                Share Exam
              </button>
            </CopyToClipboard>)}


        </div>
        <div>
          <button
            onClick={() => {
              handleNoti()
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
