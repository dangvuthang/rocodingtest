import * as React from "react";
import dayjs from "dayjs";
import CreatedTests from "../../../components/interfaces/CreatedTests";
import useAccessToken from "../../../hooks/useAccessToken";
import Router from "next/router";
import { getRequest, patchRequest } from "../../../util/axiosInstance";
import Loadder from "../../../components/dashboard/loadingpage";
import { toast } from "react-toastify";

export default function Dashboard() {
  const accessToken = useAccessToken();
  const [currentTest, setcurrentTest] = React.useState<CreatedTests | any>({});
  const [exam, setExam] = React.useState<CreatedTests | any>({});
  let [startedDate, setstartedDate] = React.useState<string>(``);
  let [endDate, setendDate] = React.useState<string>(``);
  let [duration_value, setduration_value] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<Boolean>(true);
  let [disable, setDisable] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getTest = async () => {
      const path = Router.query.id;
      try {
        const request = await getRequest({
          url: `/tests/${path}`,
          token: accessToken,
        });
        const atest = request.data.data.test;
        setcurrentTest(atest);
        setstartedDate(dayjs(atest.startedDate).format("YYYY-MM-DDTHH:mm:ss"));
        setendDate(dayjs(atest.endDate).format("YYYY-MM-DDTHH:mm:ss"));
        setLoading(false);
      } catch (error) {
        console.log("No test was found here");
      }
    };
    if (accessToken) {
      getTest();
    }
  }, [accessToken]);

  const updateExam = async (
    e: React.FormEvent,
    _id: string,
    updatedTest: CreatedTests
  ) => {
    e.preventDefault();
    setDisable(true);
    const path = Router.query.id;
    patchRequest({
      url: `/tests/${path}`,
      body: updatedTest,
      token: accessToken,
    })
      .then((response) => {
        setDisable(false);
        toast.success("The exam updated successfully !", {
          position: toast.POSITION.TOP_RIGHT,
          icon: "🚀",
        });
        Router.push(`/dashboard`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | null>
  ) => {
    setExam({
      ...exam,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  const handleStartedDate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | null>
  ): void => {
    setExam({
      ...exam,
      ["startedDate"]: e.currentTarget.value.substring(0, 16),
    });
    setstartedDate(e.currentTarget.value.substring(0, 16));
  };
  const handleEndDate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | null>
  ): void => {
    setExam({
      ...exam,
      ["endDate"]: e.currentTarget.value.substring(0, 16),
    });
    setendDate(e.currentTarget.value.substring(0, 16));
  };

  const handleDuration = () => {
    if (duration_value > 0) {
      setExam({
        ...exam,
        ["duration"]: duration_value,
      });
    } else {
      setExam({
        ...exam,
        ["duration"]: duration_value,
      });
    }
  };

  React.useEffect(() => {
    let date1 = dayjs(startedDate);
    let date2 = dayjs(endDate);
    setduration_value(date2.diff(date1, "second", true));
    handleDuration();
  }, [duration_value, startedDate, endDate]);

  const handleDuraionValue = (duraionNum: number) => {
    if (duraionNum <= 3600) {
      return `${duraionNum / 60} mins `;
    } else if (duraionNum > 3600) {
      return `${Math.floor(duraionNum / 3600)} hour `;
    } else {
      return ``;
    }
  };
  return (
    <div>
      {loading ? (
        <Loadder />
      ) : (
        <div className="container mx-auto mt-10 sm:mt-0">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form
              onSubmit={(e) => updateExam(e, currentTest._id, exam)}
              method="post"
              className="Form"
            >
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="mx-4 px-4 py-5 bg-white sm:p-6">
                  <div className="flex flex-col gap-6 divide-y">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Add Examination
                      </h3>
                      <p className="italic pt-2 text-sm text-gray-600">
                        &quot;Education breeds confidence. Confidence breeds
                        hope. Hope breeds peace. ~ Confucius&quot;
                      </p>
                    </div>
                    <div className=" pt-6 flex flex-row space-x-80 ">
                      <label className="block text-sm font-medium text-gray-700">
                        Title of Exam
                      </label>
                      <input
                        defaultValue={currentTest.name}
                        onChange={handleForm}
                        type="text"
                        name="name"
                        id="name"
                        className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/5 sm:text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className=" pt-6 flex flex-row space-x-80 gap-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Question
                      </label>
                      <div className="w-full selection:bg-fuchsia-300 selection:text-fuchsia-900">
                        <textarea
                          defaultValue={currentTest.question}
                          placeholder="Your question details ..."
                          onChange={handleForm}
                          rows={6}
                          id="question"
                          name="question"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-11/12 sm:text-sm border border-gray-300 rounded-md"
                        ></textarea>
                        <p className="mr-8 mt-2 text-sm text-gray-500">
                          Please state your question according to the exam
                          `&aposs purpose.
                          <span>
                            <a
                              className="pl-1 relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              target="_blank"
                              href="https://commonmark.org/help/"
                              rel="noreferrer"
                            >
                              Need help writing in Markdown format?
                            </a>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="pt-6 flex flex-row space-x-80">
                      <label className="block text-sm font-medium text-gray-700">
                        Started Date:
                      </label>
                      <div className="">
                        <input
                          defaultValue={startedDate}
                          onChange={handleStartedDate}
                          type="datetime-local"
                          id="startedDate"
                          name="startedDate"
                        />
                      </div>
                    </div>
                    <div className="pt-6 flex flex-row space-x-80 gap-6">
                      <label className="block text-sm font-medium text-gray-700">
                        End Date:
                      </label>
                      <div className="">
                        <input
                          defaultValue={endDate}
                          onChange={handleEndDate}
                          type="datetime-local"
                          id="endDate"
                          name="endDate"
                        />
                      </div>
                    </div>
                    <div className="pt-6 flex flex-row space-x-80 gap-7">
                      <label className="block text-sm font-medium text-gray-700">
                        Duration
                      </label>
                      <div className="w-full gap-2 flex flex-row selection:bg-fuchsia-300 selection:text-fuchsia-900">
                        <input
                          value={handleDuraionValue(duration_value)}
                          onChange={handleDuration}
                          type="text"
                          name="duration"
                          id="duration"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-2/12 sm:text-sm border border-gray-300 rounded-md"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    disabled={disable}
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
                  >
                    {disable ? "Saving..." : "Update Exam"}
                  </button>
                  <button
                    onClick={() => Router.push("/dashboard")}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
