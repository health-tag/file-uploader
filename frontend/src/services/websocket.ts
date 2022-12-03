export let socket: WebSocket | null;

export const start = () => {
  let wssURL = `${window.location.protocol === "https:" ? "wss" : "ws"}://${
    window.location.hostname
  }:3000/ws`;
  socket = new WebSocket(wssURL);
};

//start();
