import { useState } from "react";
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
        </UserProvider>
       </>
    );
}