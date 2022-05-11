import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useTwilioConversation from "../../../hooks/useTwilioConversation";
import SendMessageModal from "../../../components/SendMessageModal";
interface Student {
  numberOfCheats: number;
  identity: string;
}

const Monitor = () => {
  const user = useMsal().accounts[0];
  const router = useRouter();
  const { conversation, sendMessage } = useTwilioConversation(
    router.query.id as string
  );
  const [students, setStudents] = useState<Student[]>([]);
  const [open, setOpen] = useState(false);
  const [sentTo, setSentTo] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const participants = await conversation!.getParticipants();
        const updatedParticipants = participants.filter(
          (p) => p.identity !== user.username
        );
        const toStudents = updatedParticipants.map((participant) => ({
          numberOfCheats: 0,
          identity: participant.identity!,
        }));
        setStudents(toStudents);
      } catch (error) {
        console.log(error);
      }
    };
    if (conversation && user?.username) {
      getData();
    }
  }, [conversation, user?.username]);

  console.log(user);
  useEffect(() => {
    const setUpListener = async () => {
      conversation!.addListener("messageAdded", (message) => {
        if (message.author === user.username) return;
        toast.info(message.body, { position: "bottom-right" });
        setStudents((students) =>
          [...students].map((student) =>
            student.identity === message.author
              ? { ...student, numberOfCheats: student.numberOfCheats + 1 }
              : { ...student }
          )
        );
      });
      conversation!.addListener("participantJoined", (participant) => {
        setStudents((students) => {
          if (students.find((s) => s.identity === participant.identity)) {
            return [...students];
          } else {
            return [
              ...students,
              { identity: participant.identity!, numberOfCheats: 0 },
            ];
          }
        });
        toast.info(`${participant.identity} joined the exam`, {
          position: "bottom-right",
        });
      });
      conversation!.addListener("participantLeft", (participant) => {
        setStudents((students) =>
          [...students].filter((s) => s.identity !== participant.identity)
        );
        toast.info(`${participant.identity} submitted and left the exam`, {
          position: "bottom-right",
        });
      });
    };
    if (conversation && user?.username) {
      setUpListener();
    }
    return () => {
      conversation?.removeAllListeners();
    };
  }, [conversation, user?.username]);

  const handleSendWarning = async (message: string) => {
    try {
      await sendMessage(`${sentTo}|${message}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto mt-2">
      <h3 className="text-2xl font-semibold tracking-wide">
        List of students doing exam
      </h3>
      <SendMessageModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleSendWarning}
      />
      <p className="text-sm text-gray-500 mt-3">
        Number of students during exam {students.length}
      </p>
      <div className="flex flex-col mt-4">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full border">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Student Number
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Number of cheats
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student.identity}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bf-white"
                      } border-b`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student.identity}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student.numberOfCheats}
                      </td>
                      <td>
                        <button
                          className="bg-red-500 px-4 py-2 text-white rounded-md hover:bg-red-700"
                          onClick={() => {
                            setOpen(true);
                            setSentTo(student.identity);
                          }}
                        >
                          Send warning
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
