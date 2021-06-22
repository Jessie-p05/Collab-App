import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import Cookies from "universal-cookie";
// import { findUserById } from "../helpers/selectors"

const cookies = new Cookies();

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:5000";

const useChat = (roomId, leadId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const currentUserId = cookies.get("currentUser");
  
  

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: currentUserId,
    });
    
  };

  return { messages, sendMessage };
};

export default useChat;