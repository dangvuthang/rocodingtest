import { useCallback, useEffect, useState } from "react";
import {
  Client as ConversationsClient,
  Conversation,
} from "@twilio/conversations";
import { useMsal } from "@azure/msal-react";
import useDetectTab from "./useDetectTab";
import axios from "axios";

const useTwilioConversation = (sid: string) => {
  const user = useMsal().accounts[0];
  const [twilioToken, setTwilioToken] = useState("");
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const openInAnotherTab = useDetectTab();

  const sendMessage = useCallback(
    async (message: string) => {
      if (conversation) {
        try {
          await conversation.sendMessage(message);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [conversation]
  );

  useEffect(() => {
    const getTwilioToken = async () => {
      try {
        const request = await axios.post("/api/twilio", {
          identity: openInAnotherTab ? "guestUser1" : user.username,
          sid,
        });
        const token = request.data.data.token;
        setTwilioToken(token);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getTwilioToken();
    }
  }, [user, openInAnotherTab, sid]);

  useEffect(() => {
    let conversationsClient: ConversationsClient | null = null;
    const initConversation = async () => {
      conversationsClient = new ConversationsClient(twilioToken!);
      conversationsClient.on("connectionStateChanged", (state) => {
        if (state === "connecting") {
          console.log("CONNECTING...");
        }
        if (state === "connected") {
          console.log("CONNECTED...");
        }
        if (state === "disconnecting") {
          console.log("DISCONNECTING...");
        }
        if (state === "disconnected") {
          console.log("DISCONNECTed...");
        }
        if (state === "denied") {
          console.log("DENIED...");
        }
      });
      conversationsClient.on("conversationJoined", (conversation) => {
        if (conversation.sid === sid) {
          console.log("JOINED CONVERSATION");
          setConversation(conversation);
        }
      });
      conversationsClient.on("conversationLeft", (conversation) => {
        console.log("LEFT CONVERSATION");
        console.log(conversation);
        setConversation(null);
      });
    };
    if (twilioToken) {
      initConversation();
    }
    return () => {
      conversationsClient?.removeAllListeners();
    };
  }, [twilioToken, sid]);

  return { conversation, sendMessage };
};

export default useTwilioConversation;
