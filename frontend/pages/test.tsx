import { useState } from "react";
import FaceIdentity from "../components/FaceIdentity";
import FaceRecognition from "../components/FaceRecognition";
import LoadScript from "../components/LoadScript";
import UserProvider from "../context/UserProvider";

export default function Test() {
    const [isWatching, setIsWatching] = useState(true);
    return (
       <>
        <LoadScript/>
        <UserProvider>
            <FaceRecognition onChange={setIsWatching}/>
            {/* <FaceIdentity onChange={setIsWatching}/> */}
        </UserProvider>
       </>
    );
}

// import { useMsal } from "@azure/msal-react";
// import { Participant } from "@twilio/conversations";
// import dynamic from "next/dynamic";
// import { FormEvent, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// const SignInButton = dynamic(
//   () => import("../components/layout/SignInButton"),
//   { ssr: false }
// );
// const SignOutButton = dynamic(
//   () => import("../components/layout/SignOutButton"),
//   { ssr: false }
// );
// import useTwilioConversation from "../hooks/useTwilioConversation";

// const Test = () => {
//   const user = useMsal().accounts[0];
//   const { conversation } = useTwilioConversation(
//     "CH2ac3d03db55e43b99ca58dae88044ace"
//   );

//   const [students, setStudents] = useState<Participant[]>([]);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const participants = await conversation!.getParticipants();
//         const students = participants.filter(
//           (p) => p.identity !== user.username
//         );
//         console.log(students);
//         setStudents([...students]);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     if (conversation && user?.username) {
//       getData();
//     }
//   }, [conversation, user?.username]);

//   useEffect(() => {
//     const setUpListener = async () => {
//       conversation!.addListener("messageAdded", (message) => {
//         toast.info(message.body, { position: "bottom-right" });
//       });
//       // conversation!.addListener("participantJoined", (participant) => {
//       //   setStudents((students) => {
//       //     if (students.find((s) => s.identity === participant.identity)) {
//       //       return [...students];
//       //     } else return [...students, participant];
//       //   });
//       //   toast.info(`${participant.identity} joined the exam`, {
//       //     position: "bottom-right",
//       //   });
//       // });
//       conversation!.addListener("participantLeft", (participant) => {
//         toast.info(`${participant.identity} left the exam`, {
//           position: "bottom-right",
//         });
//       });
//     };
//     if (conversation) {
//       setUpListener();
//     }
//     return () => {
//       conversation?.removeAllListeners();
//     };
//   }, [conversation]);

//   console.log(students);
//   return (
//     <div className="container mx-auto">
//       <div className="flex">{user ? <SignOutButton /> : <SignInButton />}</div>
//       <h1>List of students doing tests</h1>

//       {students.map((student) => (
//         <div key={student.identity}>{student.identity}</div>
//       ))}
//     </div>
//   );
// };

// export default Test;
