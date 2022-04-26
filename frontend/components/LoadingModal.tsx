import { FC, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingModalProps {
  open: boolean;
}

const LoadingModal: FC<LoadingModalProps> = ({ open }) => {
  return (
    <Dialog
      as="div"
      className="fixed z-10 inset-0 overflow-y-auto"
      onClose={() => {}}
      open={open}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xs sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:pb-4">
            <div className="">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900 flex justify-center items-center"
                >
                  <LoadingSpinner />
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 text-center">
                    Submitting now. Do not reload...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="focus:outline-none invisible"
          onClick={() => {}}
        ></button>
      </div>
    </Dialog>
  );
};

export default LoadingModal;
