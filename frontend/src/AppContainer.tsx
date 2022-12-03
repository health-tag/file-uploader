import App from "App";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import SocketProvider from "services/SocketSerivice";

const AppContainer = () => {
  return (
    <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketProvider>
  );
};

export default AppContainer;
