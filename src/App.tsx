import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import AdminLoginPage from "@pages/Administrator/AdminLoginPage";
import AdminConsolePage from "pages/Administrator/Console/layout";
import UserTermsPage from "@pages/User/UserTermsPage";
import UserPrivacyPage from "@pages/User/UserPrivacyPage";
import UserVerifyCitizenIdPage from "@pages/User/UserVerifyCitizenIdPage";
import UserSetPinPage from "@pages/User/UserSetPinPage";
import UserActivationSuccessfulPage from "@pages/User/UserActivationSuccessfulPage";
import UserLoginPage from "@pages/User/UserLoginPage";
import UserConsolePage from "@pages/User/Console/layout";
import UserAccessDeniedPage from "@pages/User/UserAccessDeniedPage";
import UserSessionTimeoutPage from "@pages/User/UserSessionTimeoutPage";
import AdminRegistrationSelectionPage from "@pages/Administrator/UserRegistration/AdminRegistrationSelectionPage";
import AdminRegisterNewUserPage from "@pages/Administrator/UserRegistration/AdminRegisterNewUserPage";
import AdminRegisterExistingUserPage from "@pages/Administrator/UserRegistration/AdminRegisterExistingUserPage";
import AdminSuccessfullyRegisterPage from "@pages/Administrator/UserRegistration/AdminSuccessfullyRegisterPage";
import DoctorConsolePage from "@pages/Doctor/Console/layout";
import DoctorLoginPage from "@pages/Doctor/DoctorLoginPage";
import UserLogoutPage from "@pages/User/UserLogoutPage";
import UserNoQueryStringPage from "@pages/User/UserNoQueryString";
import DoctorLogoutPage from "@pages/Doctor/DoctorLogoutPage";

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
          <Route path="/" element={<UserLoginPage />} />
          <Route path="/access-denied" element={<UserAccessDeniedPage />} />
          <Route path="/logout" element={<UserLogoutPage />} />
          <Route path="/no-nfc" element={<UserNoQueryStringPage />} />
          <Route path="/timeout" element={<UserSessionTimeoutPage />} />
          <Route
            path="/admin/"
            element={<Navigate to="/admin/login" replace />}
          />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/console/*" element={<AdminConsolePage />} />
          <Route
            path="/admin/user/registration-selection"
            element={<AdminRegistrationSelectionPage />}
          />
          <Route
            path="/admin/user/register/new-user"
            element={<AdminRegisterNewUserPage />}
          />
          <Route
            path="/admin/user/register/existing-user"
            element={<AdminRegisterExistingUserPage />}
          />
          <Route
            path="/admin/user/registration-successful"
            element={<AdminSuccessfullyRegisterPage />}
          />

          <Route path="/doctor/login" element={<DoctorLoginPage />} />
          <Route path="/doctor/logout" element={<DoctorLogoutPage />} />
          <Route path="/doctor/console/*" element={<DoctorConsolePage />} />

          <Route
            path="/user/"
            element={<Navigate to="/user/login" replace />}
          />

          <Route path="/user/terms" element={<UserTermsPage />} />
          <Route path="/user/privacy" element={<UserPrivacyPage />} />
          <Route
            path="/user/verify-citizenid"
            element={<UserVerifyCitizenIdPage />}
          />
          <Route path="/user/set-pin" element={<UserSetPinPage />} />
          <Route
            path="/user/activation-successful"
            element={<UserActivationSuccessfulPage />}
          />
          <Route path="/user/login" element={<UserLoginPage />} />
          <Route path="/user/console/*" element={<UserConsolePage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
