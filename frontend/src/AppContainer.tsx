import App from "App";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { SocketService } from "services/SocketSerivice";

export const SocketServiceContext = React.createContext<SocketService>(null as any);

const AppContainer = () => {
  return (
    //<SocketServiceContext.Provider value={new SocketService()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    //</SocketServiceContext.Provider>
  );
};

export default AppContainer;
