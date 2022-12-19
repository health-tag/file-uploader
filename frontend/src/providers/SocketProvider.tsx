import { createContext, useEffect, useState } from "react";
import { socket, start } from "./websocket";

export const SocketContext = createContext<{
  messages: Array<{ event: string; data: any }>;
  isConnected: boolean;
}>(null as any);


const SocketProvider = ({ children }) => {
  // this state will be shared with all components
  const [messages, setMessages] = useState<Array<{ event: string; data: any }>>(
    new Array<{ event: string; data: any }>()
  );
  //const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const attachListener = () => {
    socket?.addEventListener("open", openStateHandler);
    socket?.addEventListener("error", errorStateHandler);
    socket?.addEventListener("close", closeStateHandler);
    socket?.addEventListener("message", messageStateHandler);
  };

  const openStateHandler = () => {
    setIsConnected(true);
  };
  const errorStateHandler = () => {
    setIsConnected(false);
  };
  const closeStateHandler = () => {
    setIsConnected(false);
  };
  const messageStateHandler = (e: MessageEvent) => {
    setIsConnected(true);
    let message: { event: string; data: any } = JSON.parse(e.data);
    setMessages((prev) => {
      return [...prev, message];
    });
  };

  useEffect(() => {
    start();
    attachListener();
    return () => {
      stop();
    };
  }, []);

  const stop = () => {
    socket?.close();
    socket?.removeEventListener("open", openStateHandler);
    socket?.removeEventListener("error", errorStateHandler);
    socket?.removeEventListener("close", closeStateHandler);
    socket?.removeEventListener("message", messageStateHandler);
  };

  //start();
  /*
  useEffect(() => {
    return () => {
      socket?.close();
      socket?.removeEventListener("open", openStateHandler);
      socket?.removeEventListener("error", errorStateHandler);
      socket?.removeEventListener("close", closeStateHandler);
      socket?.removeEventListener("message", messageStateHandler);
    };
  }, []);*/

  return (
    <SocketContext.Provider
      value={{ messages: messages, isConnected: isConnected }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
