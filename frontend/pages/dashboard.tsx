import * as React from "react";
import ExamCard from "../components/dashboard/ExamCard";
import CreatedTests from "../components/interfaces/CreatedTests";
import { deleteRequest, getRequest } from "../util/axiosInstance";
import { useEffect } from "react";
import Sidebar from "../components/dashboard/Ds_layout/Sidebar";
import Pagination from "../components/dashboard/Ds_layout/Pagination";
import useAccessToken from "../hooks/useAccessToken";
import Layout from "../components/layout/Layout";
import { useIsAuthenticated } from "@azure/msal-react";
import Router from "next/router";
import { toast } from "react-toastify";
import { useUser } from "../context/UserProvider";

export default function Dashboard() {
  const { user } = useUser();
  const user_id = user?._id;
  const [tests, setTests] = React.useState<CreatedTests[]>([]);
  const [inputSearch, setInputSearch] = React.useState("");

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInputSearch(e.target.value.toLowerCase());
  };

  const isAuthenticated = useIsAuthenticated();
  const accessToken = useAccessToken();

  useEffect(() => {
    if (isAuthenticated === false) {
      Router.push("/")
        .then(() => console.log("DONE"))
        .catch((err) => console.log(err));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const getTests = async () => {
      try {
        const request = await getRequest({
          url: `/users/${user_id}/tests?`,
          token: accessToken,
        });
        const atest = request.data.data.tests;
        const test = atest.reverse();
        setTests(test);
      } catch (error) {
        console.log("No test was found here");
      }
    };
    if (user_id && accessToken) {
      getTests();
    }
  }, [accessToken, user_id]);

  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(4);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tests.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteExam = async (deleteId: string) => {
    deleteRequest({
      url: `/tests/${deleteId}`,
      token: accessToken,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    const exams: CreatedTests[] = tests.filter(
      (exam: CreatedTests) => exam._id !== deleteId
    );
    setTests(exams);
    toast.success("The exam is successfuly deleted!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      icon: "🔥",
    });
  };
  const editRow = async (test: any) => {
    Router.push(`/dashboard/editExam/${test._id}`);
  };
  const showExam = async (test: any) => {
    Router.push(`/dashboard/viewExam/${test._id}`);
  };

  return (
    <Layout>
      <div className="h-screen bg-white">
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
                  onClick={() => {
                    Router.push(`/dashboard/addExam`);
                  }}
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
                  {/* <button className="flex items-center justify-center px-4 border-l">
                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24">
                              <path
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                            </svg>
                          </button> */}
                </div>
              </div>
            </div>
            {/* End Button Area */}

            {/* Pagination */}
            <div>
              <div>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={tests.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
            {/* End Pagination */}

            {/* Exam Area */}
            {tests.length > 0 ? (
              currentPosts
                .filter((el) => {
                  if (inputSearch === "") {
                    return el;
                  }
                  //return the item which contains the user Search
                  else {
                    return el.name.toLowerCase().includes(inputSearch);
                  }
                })
                .map((test, index) => (
                  <ExamCard
                    randomNum={index}
                    key={test._id}
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
                  onClick={() => {
                    Router.push(`/dashboard/addExam`);
                  }}
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
      </div>
    </Layout>
  );
}
