import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import NotifyEmails from "../../components/interfaces/NotifyEmails";
import useAccessToken from "../../hooks/useAccessToken";
import { toast } from "react-toastify";
import { postRequest } from "../../util/axiosInstance";

const NotifyStudent = () => {
  const route = useRouter();
  const token = useAccessToken();
  const [emails, setEmails] = useState<NotifyEmails | {}>({});

  const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | null>): void => {
    setEmails({
      ...emails,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }
  const handleSend = async (e: React.FormEvent, emails: NotifyEmails | any) => {
    e.preventDefault();
    const email: NotifyEmails = {
      emails: emails.studentEmail,
      subject: emails.emailSubject,
      text: emails.emailContent
    };

    if ((email.emails === undefined || (email.text === undefined))) {
      toast.error("Please fill in every form !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 6000,
        icon: "⏳"
      })
    } else {
      postRequest({
        url: '/users/send',
        body: email,
        token: token
      }).then((response) => {
        console.log(response);
      })
        .catch((error) => {
          console.log(error);
        });
      toast.success("Successfully send notify emails !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000,
        icon: "👏"
      })
    }
    route.push({ pathname: "/dashboard" })
  }

  return (
    <div className="container mx-auto w-5/6">
      <div className="text-center font-medium font-bold leading-tight text-3xl my-5">
        <h1 className="">Test Notification</h1>
      </div>

      <div className="border mt-10 md:mt-0 md:col-span-2">
        <form onSubmit={(e) => handleSend(e, emails)} method="post" className="Form">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="mx-4 px-4 py-5 bg-white sm:p-6">
              <div className="flex flex-col gap-6 divide-y">
                <div className="pt-6 flex flex-row space-x-80">
                  <label className="text-center block text-sm font-medium text-gray-700">
                    Student Email
                  </label>
                  <input
                    onChange={handleForm}
                    type="text"
                    name="studentEmail"
                    id="studentEmail"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/5 sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <div className=" pt-6 flex flex-row space-x-80 ">
                  <label className="text-center block text-sm font-medium text-gray-700">
                    Email Subject
                  </label>
                  <input
                    onChange={handleForm}
                    type="text"
                    name="emailSubject"
                    id="emailSubject"
                    className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-2/5 sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <div className=" pt-6 flex flex-row space-x-80 gap-6">
                  <label className="text-center block text-sm font-medium text-gray-700">
                    Email Content
                  </label>
                  <div className="w-full selection:bg-fuchsia-300 selection:text-fuchsia-900">
                    <textarea
                      onChange={handleForm}
                      placeholder="Your email content ..."
                      rows={6}
                      id="emailContent"
                      name="emailContent"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-4/5 sm:text-sm border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"

                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Email
              </button>
              <button
                type="button"
                onClick={() => route.push({ pathname: "/dashboard" })}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotifyStudent;
