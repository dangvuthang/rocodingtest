import * as React from "react";
import ExamCard from "../components/dashboard/ExamCard";
import AddExam from "../components/dashboard/AddExam";
import CreatedTests from "../components/interfaces/CreatedTests";
import EditExam from "../components/dashboard/EditExam";
import { getRequest } from "../util/axiosInstance";
import { useEffect } from "react";
import DashboardNav from "../components/dashboard/Ds_layout/DashboardNav";
import Sidebar from "../components/dashboard/Ds_layout/Sidebar";
import Pagination from "../components/dashboard/Ds_layout/Pagination";
import ExamDetail from "../components/dashboard/ExamDetail";
import useAccessToken from "../hooks/useAccessToken";


export default function Dashboard() {
  const [tests, setTests] = React.useState<CreatedTests[]>([]);

  const [currentUser, setCurrentUser] = React.useState<CreatedTests | {}>();
  const [editing, setEditing] = React.useState(false);
  const [adding, setAdding] = React.useState(false);
  const [viewing, setViewing] = React.useState(false);
  const [inputSearch, setInputSearch] = React.useState("");


  useEffect(() => {
    const testData = getRequest({
      url: "/users/60f6ce0e02f5102cea240400/tests",
    });
    testData
      .then((result) => {
        setTests(result.data.data.tests);
        console.log(tests)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInputSearch(e.target.value.toLowerCase());
  };
  const filteredData = tests.filter((el) => {
    //if no input the return the original
    if (inputSearch === "") {
      return el;
    }
    //return the item which contains the user Search
    else {
      return el.name.toLowerCase().includes(inputSearch);
    }
  });

  const saveExam = async (e: React.FormEvent, formData: CreatedTests) => {
    e.preventDefault();
    const test: CreatedTests = {
      exam_id: Math.random(),
      _id: formData._id,
      name: formData.name,
      question: formData.question,
      startedDate: formData.startedDate,
      endDate: formData.endDate,
      duration: formData.duration,
    };
    setTests([...tests, test]);
  };

  const deleteExam = async (deleteId: number) => {
    const exams: CreatedTests[] = tests.filter(
      (exam: CreatedTests) => exam.exam_id !== deleteId
    );
    setTests(exams);
  };
  const updateExam = (exam_id: number, updatedTest: any) => {
    setTests(
      tests.map((test) => (test.exam_id === exam_id ? updatedTest : test))
    );
  };

  const editRow = async (test: any) => {
    setEditing(true);
    setCurrentUser({
      exam_id: test.exam_id,
      name: test.name,
      duration: test.duration,
      question: test.question,
      startedDate: test.startedDate,
      endDate: test.endDate,
    });
  };
  const showExam = async (test: any) => {
    setViewing(true);
    setCurrentUser({
      exam_id: test.exam_id,
      name: test.name,
      duration: test.duration,
      question: test.question,
      startedDate: test.startedDate,
      endDate: test.endDate,
    });
  };

  return (
    <div className="h-screen bg-white">
      {editing ? (
        <EditExam
          setEditing={setEditing}
          updateExam={updateExam}
          currentUser={currentUser}
        />
      ) : adding ? (
        <AddExam setAdding={setAdding} saveExam={saveExam} />
      ) : viewing ? (
        <ExamDetail setViewing={setViewing} currentUser={currentUser} />
      ) : (
        <div className="h-full flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Content */}
          <div className="w-full h-screen">
            {/* Button Area */}
            <div className="h-20 grid grid-cols-2 content-center justify-items-center border-l border-b border-black">
              <div>
                <button
                  className="flex items-center btn"
                  onClick={() => setAdding(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Exam
                </button>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex border-2 rounded">
                  <input
                    onChange={handleSearch}
                    type="text"
                    className="px-4 py-2 w-80"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            {/* End Button Area */}

            {/* Pagination */}
            <div>
              <div>
                <Pagination />
              </div>
            </div>
            {/* End Pagination */}

            {/* Exam Area */}
            {tests.length > 0 ? (
              filteredData.map((test) => (
                <ExamCard
                  showExam={showExam}
                  editRow={editRow}
                  prop={test}
                  deleteExam={deleteExam}
                />
              ))
            ) : (
              <div className="grid place-items-center h-max">
                <p>
                  There is no any exam at present. Click the button below to
                  create a new exam.
                </p>
                <button
                  className="flex items-center btn"
                  onClick={() => setAdding(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Exam
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
