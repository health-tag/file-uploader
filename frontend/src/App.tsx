import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import ConsolePage from "@pages/Console";

export const AppStateContext = React.createContext({
  isSideBarOpen: window.matchMedia("(min-width: 768px)").matches,
  theme: localStorage.getItem("SelectedTheme") ?? "healthtag",
  switchTheme: (themeKey: string) => {},
});

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/*" element={<ConsolePage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;

export const BASE_API_URL =
  process.env.NODE_ENV != "development"
    ? `${process.env.PUBLIC_URL}/api`
    : "http://localhost:3000/api";
