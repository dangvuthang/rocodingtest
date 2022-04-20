import * as React from "react";
import CreatedTests from "../interfaces/CreatedTests";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dayjs from "dayjs";

type Props = {
  currentUser: CreatedTests | any;
  setViewing: (editing: boolean) => any;
};

const ExamDetail: React.FC<Props> = ({ currentUser, setViewing }) => {
  const [questionDetail, setquestionDetail] = React.useState<string>("");

  React.useEffect(() => {
    setquestionDetail(currentUser.question), console.log(questionDetail);
  }, [currentUser.question]);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="flex justify-between items-center text-sm">
        <div className=" px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Exam Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Exam details and Student submissions.
          </p>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <button
            onClick={() => setViewing(false)}
            className="shrink inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go Back
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Title of Exam</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {currentUser.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Duration </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {currentUser.duration}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Question</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ReactMarkdown
                children={`${questionDetail}`}
                remarkPlugins={[remarkGfm]}
              />
              ,
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Started Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {dayjs(currentUser.startedDate).format("MMMM DD, YYYY hh:mm a")}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">End Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {dayjs(currentUser.startedDate).format("MMMM DD, YYYY hh:mm a")}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
{
  /*  <form className='Form' onSubmit={(e) => {updateExam( exam.exam_id , exam); e.preventDefault(); }}>
            <div>
                <div className='Form--field'>
                <label htmlFor='name'>Name</label>
                <input onChange={handleForm} type='text' id='name' />
                </div>
                <div className='Form--field'>
                <label htmlFor='body'>Question</label>
                <input onChange={handleForm} type='text' id='question' />
                </div>
            </div>
            <button
                className='Form__button'
                disabled={exam === undefined ? true : false}
            >
                Update Exam
            </button>
            <button onClick={() => setEditing(false)} className="button muted-button">
              Cancel
            </button>
        </form> */
}
export default ExamDetail;
