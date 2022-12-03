import { ConsoleLine } from "@shared/models/console";
import { createContext, useEffect, useState } from "react";

export const SocketContext = createContext<{
  messages: Array<{ event: string; data: any }>;
  isConnected: boolean;
}>(null as any);

const SocketProvider = ({ children }) => {
  // this state will be shared with all components
  const [messages, setMessages] = useState<Array<{ event: string; data: any }>>(
    new Array<{ event: string; data: any }>()
  );
  const [tick, setTick] = useState<number>(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  const start = () => {
    let wssURL = `${window.location.protocol === "https:" ? "wss" : "ws"}://${
      window.location.hostname
    }:3000/ws`;
    setSocket((old) => {
      let socket = new WebSocket(wssURL);
      socket.addEventListener("open", openStateHandler);
      socket.addEventListener("error", errorStateHandler);
      socket.addEventListener("close", closeStateHandler);
      socket.addEventListener("message", messageStateHandler);
      return socket;
    });
  };

  const openStateHandler = () => {
    console.log("Connected");
    setIsConnected(true);
  };
  const errorStateHandler = () => {
    setIsConnected(false);
  };
  const closeStateHandler = () => {
    setIsConnected(false);
  };
  const messageStateHandler = (e: MessageEvent) => {
    let message: { event: string; data: any } = JSON.parse(e.data);
    console.log(message);
    setMessages((prev) => {
      prev.push(message);
      return prev;
    });
    setTick((c) => c + 1);
  };
  
  useEffect(() => {
    start();
    return () => {
      socket?.close();
      socket?.removeEventListener("open", openStateHandler);
      socket?.removeEventListener("error", errorStateHandler);
      socket?.removeEventListener("close", closeStateHandler);
      socket?.removeEventListener("message", messageStateHandler);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ messages: messages, isConnected: isConnected }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
