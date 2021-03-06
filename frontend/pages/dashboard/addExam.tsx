import * as React from "react";
import dayjs from "dayjs";
import Router from "next/router";
import CreatedTests from "../../components/interfaces/CreatedTests";
import { toast } from "react-toastify";
import useAccessToken from "../../hooks/useAccessToken";
import { postRequest } from "../../util/axiosInstance";
import Link from "next/link";
const AddExam = () => {
  const accessToken = useAccessToken();
  const [formData, setFormData] = React.useState<CreatedTests | {}>({});
  let [startedDate, setstartedDate] = React.useState("");
  let [endDate, setendDate] = React.useState("");
  let [duration_value, setduration_value] = React.useState<number>(0);
  let [disable, setDisable] = React.useState<boolean>(false);
  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | null>
  ): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  const handleStartedDate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | null>
  ): void => {
    setFormData({
      ...formData,
      ["startedDate"]: e.currentTarget.value.substring(0, 16),
    });
    setstartedDate(e.currentTarget.value.substring(0, 16));
  };
  const handleEndDate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | null>
  ): void => {
    setFormData({
      ...formData,
      ["endDate"]: e.currentTarget.value.substring(0, 16),
    });
    setendDate(e.currentTarget.value.substring(0, 16));
  };
  const handleDuration = (): void => {
    setFormData({
      ...formData,
      ["duration"]: duration_value,
    });
  };
  React.useEffect(() => {
    let date1 = dayjs(startedDate);
    let date2 = dayjs(endDate);
    let durationValid = date2.diff(date1, "second", true);
    setduration_value(durationValid);
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

  const saveExam = async (e: React.FormEvent, formData: CreatedTests | any) => {
    e.preventDefault();
    const test: CreatedTests = {
      _id: formData._id,
      name: formData.name,
      question: formData.question,
      startedDate: formData.startedDate,
      endDate: formData.endDate,
      duration: formData.duration,
    };
    if (
      test.name === undefined ||
      test.question === undefined ||
      test.startedDate === undefined ||
      test.endDate === undefined ||
      test.duration === undefined
    ) {
      toast.error("Please fill in every form !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 6000,
        icon: "???",
      });
    } else {
      setDisable(true);
      postRequest({
        url: `/tests`,
        body: test,
        token: accessToken,
      })
        .then((response) => {
          console.log(response);
          toast.success("Successfully added exam !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
            icon: "????",
          });
          Router.push(`/dashboard`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="mt-10 sm:mt-0">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form
          onSubmit={(e) => saveExam(e, formData)}
          method="post"
          className="Form"
        >
          <div className="container mx-auto shadow overflow-hidden sm:rounded-md">
            <div className="mx-4 px-4 py-5 bg-white sm:p-6">
              <div className="flex flex-col gap-6 divide-y">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Add Examination
                  </h3>
                  <p className="italic pt-2 text-sm text-gray-600">
                    &quot;Education breeds confidence. Confidence breeds hope.
                    Hope breeds peace. ~ Confucius&quot;
                  </p>
                </div>
                <div className=" pt-6 flex flex-row space-x-80 ">
                  <label className="block text-sm font-medium text-gray-700">
                    Title of Exam
                  </label>
                  <input
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
                      placeholder="Your question details ..."
                      onChange={handleForm}
                      rows={6}
                      id="question"
                      name="question"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-11/12 sm:text-sm border border-gray-300 rounded-md"
                    ></textarea>
                    <p className="mr-8 mt-2 text-sm text-gray-500">
                      Please state your question according to the exam&apos;s
                      purpose.
                      <span>
                        <Link href="https://commonmark.org/help/">
                          <a className="pl-1 relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            Need help writing in Markdown format?
                          </a>
                        </Link>
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
                      className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500  block w-1/6 sm:text-sm border border-gray-300 rounded-md"
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
                className="btn disabled:text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {disable ? "Saving..." : "Save Exam"}
              </button>
              <button onClick={() => Router.push(`/dashboard`)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddExam;
