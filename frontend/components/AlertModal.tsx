import { FC, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";

interface AlertModalProps {
  message: string;
  open: boolean;
  remainingTime: number;
  onClose: () => Promise<void>;
}

const AlertModal: FC<AlertModalProps> = ({
  message,
  open,
  remainingTime,
  onClose,
}) => {
  return (
    <Dialog
      as="div"
      className="fixed z-10 inset-0 overflow-y-auto"
      open={open}
      onClose={() => {}}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-xl leading-6 font-semibold text-red-500 flex items-center gap-x-1"
                >
                  <ExclamationIcon className="w-6 h-6" />
                  <span>
                    Cheating Detection (You have {remainingTime} attempts left)
                  </span>
                </Dialog.Title>
                <div className="mt-5">
                  <p className="text-base text-gray-500">
                    We have detected that <strong>{message} </strong> at{" "}
                    <strong>{dayjs().format("HH:mm:ss")}</strong>, and notified
                    your teacher accordingly. You have{" "}
                    <strong>{remainingTime} attempts</strong> left before the
                    exam will be forced to submit.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm uppercase tracking-wide"
              onClick={onClose}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AlertModal;
