import App from "App";
import { BrowserRouter } from "react-router-dom";
import SocketProvider from "services/SocketProvider";

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
