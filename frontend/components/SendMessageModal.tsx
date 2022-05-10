import { FC, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (message: string) => Promise<void>;
}

const SendMessageModal: FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const cancelButtonRef = useRef(null);
  const [warning, setWarning] = useState("");

  const handleConfirm = async () => {
    if (warning) {
      try {
        await onConfirm(warning);
        onClose();
        setWarning("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Dialog
      as="div"
      className="fixed z-10 inset-0 overflow-y-auto"
      initialFocus={cancelButtonRef}
      onClose={onClose}
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
        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div className="bg-white px-4 pt-5">
            <div className="">
              <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Input message to send
                </Dialog.Title>
                <div className="mt-4 w-full">
                  <textarea
                    className="w-full"
                    value={warning}
                    onChange={(e) => setWarning(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mt-4">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleConfirm}
            >
              Send Warning
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SendMessageModal;
