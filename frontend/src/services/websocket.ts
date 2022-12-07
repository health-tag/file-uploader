import { WEBSOCKET_URL } from "configuration";

export let socket: WebSocket | null;

export const start = () => {
  let wssURL = WEBSOCKET_URL;
  socket = new WebSocket(wssURL);
};