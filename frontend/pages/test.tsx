import {
  Client as ConversationsClient,
  Conversation,
} from "@twilio/conversations";
import { FormEvent, useEffect, useState } from "react";
import useTwilioConversation from "../hooks/useTwilioConversation";

const Test = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const { conversation } = useTwilioConversation(
    "CHa6c18a50cedc4515a556a730e35d4100"
  );

  useEffect(() => {
    if (conversation) {
      conversation.on("messageAdded", (message) => {
        setMessages((msg) => [...msg, `${message.author} :${message.body}`]);
      });
      conversation.on("participantJoined", (participant) => {
        console.log("PARTICIPANT JOINED");
        console.log(participant);
      });
      conversation.on("participantLeft", (participant) => {
        console.log("PARTICIPANT LEFT");
        console.log(participant);
      });
    }
    return () => {
      conversation?.removeAllListeners();
    };
  }, [conversation]);

  return (
    <div className="container mx-auto">
      <div className="flex"></div>
    </div>
  );
};

export default Test;
