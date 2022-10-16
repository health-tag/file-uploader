import { ConsoleLine } from "@shared/models/console";

export class SocketService {
  constructor() {}
  socket: WebSocket | null = null;

  start = () => {
    let wssURL = `${window.location.protocol === "https:" ? "wss" : "ws"}://${
      window.location.host
    }`;
    this.socket = new WebSocket(wssURL);
  };

  stop = () => {
    this.socket?.close();
  };

  logs: Array<ConsoleLine> = new Array<ConsoleLine>();
}
