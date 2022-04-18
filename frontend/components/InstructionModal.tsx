import { FC, Fragment, useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import source from "../images/fullscreen.jpg";

interface InstructionModal {
  open: boolean;
  onClose: () => void;
}

const InstructionModal: FC<InstructionModal> = ({ open, onClose }) => {
  const handleStartExam = () => {
    document.documentElement
      .requestFullscreen()
      .then(() => onClose())
      .catch((err) => console.log(err));
  };

  return (
    <Dialog
      as="div"
      className="fixed z-10 inset-0 overflow-y-auto"
      onClose={() => {}}
      open={open}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-bold text-gray-900 text-center"
                >
                  <div>
                    <Image src={source} alt="Fullscreen" />
                  </div>
                  <div>
                    <span className="text-blue-400">
                      Anti screen switching{" "}
                    </span>
                    is turning on and
                    <span className="text-blue-400">
                      {" "}
                      will enter the full screen mode
                    </span>
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    (Please don&apos;t quit the full screen otherwise it will be
                    judged as switching screen once)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex sm:flex-row-reverse items-center justify-center">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm focus:outline-none"
              onClick={handleStartExam}
            >
              Start the Exam Now
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default InstructionModal;
