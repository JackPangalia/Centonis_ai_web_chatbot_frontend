import { useState, useEffect } from "react";
import io from "socket.io-client";
import useLocalStorage from "./useLocalStorage";

/**
 * useSocketConnection custom hook manages a Socket.IO connection and handles
 * various socket events for a chat application.
 *
 * @param {object} props - An object containing callback functions for socket events.
 * @param {function} props.onSessionCreated - Callback for 'session_created' event.
 * @param {function} props.onSessionResumed - Callback for 'session_resumed' event.
 * @param {function} props.onTextDelta - Callback for 'textDelta' event.
 * @param {function} props.onResponseComplete - Callback for 'responseComplete' event.
 * @param {function} props.onError - Callback for 'error' event.
 * @param {function} props.onClearChat - Callback for 'clear_chat' event.
 * @param {function} props.onSuggestions - Callback for 'suggestions' event.
 * @returns {object} An object containing the socket instance, sessionId, and setSessionId function.
 */
const useSocketConnection = ({
  onSessionCreated,
  onSessionResumed,
  onTextDelta,
  onResponseComplete,
  onError,
  onClearChat,
  onSuggestions,
}) => {
  const [socket, setSocket] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    console.log("Connecting to Socket.IO server...");
    const newSocket = io("https://centonis-web-chatbot-17aa4380f2a7.herokuapp.com/", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket', 'polling'],
      withCredentials: true,
      extraHeaders: {
        "Origin": "https://jackpangalia.github.io"
      }
    });

    // Debug connection status
    newSocket.on('connect', () => {
      console.log('Socket connected successfully:', newSocket.id);
      const savedSessionId = getItem("chatSessionId");
      if (savedSessionId) {
        console.log('Resuming session with ID:', savedSessionId);
        newSocket.emit("resume_session", { sessionId: savedSessionId });
      } else {
        console.log('Initializing new session');
        newSocket.emit("init_session");
      }
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    setSocket(newSocket);

    // Event listeners
    newSocket.on("session_created", (data) => {
      console.log('Session created:', data);
      setSessionId(data.sessionId);
      onSessionCreated && onSessionCreated(data);
    });

    newSocket.on("session_resumed", (data) => {
      console.log('Session resumed:', data);
      setSessionId(data.sessionId);
      onSessionResumed && onSessionResumed(data);
    });

    newSocket.on("textDelta", (data) => {
      onTextDelta && onTextDelta(data);
    });

    newSocket.on("responseComplete", () => {
      onResponseComplete && onResponseComplete();
    });

    newSocket.on("error", (error) => {
      console.error('Socket error:', error);
      onError && onError(error);
    });

    newSocket.on("clear_chat", (data) => {
      onClearChat && onClearChat(data);
    });

    newSocket.on("suggestions", (data) => {
      onSuggestions && onSuggestions(data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return { socket, sessionId, setSessionId };
};

export default useSocketConnection;