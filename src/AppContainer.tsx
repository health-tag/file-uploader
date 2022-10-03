import App from "App";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

const AppContainer = () => {

  return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
  );
};

export default AppContainer;
