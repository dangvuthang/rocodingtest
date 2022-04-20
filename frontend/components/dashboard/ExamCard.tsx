import CreatedTests from "../interfaces/CreatedTests";
import * as React from "react";
import dayjs from "dayjs";

type Property = {
  prop: CreatedTests;
  deleteExam: (deleteId: number) => void;
  editRow: (prop: CreatedTests | any) => void;
  showExam: (prop: CreatedTests | any) => void;
};

const ExamCard: React.FC<Property> = ({
  prop,
  deleteExam,
  editRow,
  showExam,
}) => {
  return (
    <div
      key={prop.exam_id}
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
          <h3 className="text-lg">{prop.duration} mins</h3>
        </div>
        <div className="text-[#ACB3C8]">
          {dayjs(prop.startedDate).format("MMMM DD, YYYY hh:mm a")}
        </div>
      </div>
      {/* Button Edit and Delete */}
      <div className="flex mr-4 content-center justify-end gap-2 w-2/6">
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
              deleteExam(prop.exam_id);
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
