import {
  useLocation,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";

import MainLayout from "@layouts/main";
import { AnimatePresence, motion } from "framer-motion";
import JobsPage from "@pages/JobsPage";
import {
  dropDownMenuAnimationVariant,
  menuHeaderAnimationVariants,
} from "@animations/variants";
import {
  BookOpenIcon,
  ChevronIcon,
  CogIcon,
  HomeIcon,
  HospitalIcon,
  IdentificationIcon,
  KeyIcon,
  MedicationIcon,
  PencilIcon,
  SupportIcon,
} from "@components/Icons";
import { useEffect, useRef, useState } from "react";
import { DataViewer } from "@components/DataViewer";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@components/LanguageSelector";

const ConsolePage = () => {
  const { t } = useTranslation("console");
  const navigate = useNavigate();
  const location = useLocation();
  const profileDropDownRef = useRef<HTMLDivElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const userCookie = localStorage.getItem("user");
    if (userCookie == null) {
      //navigate("/");
    } else {
      const userData = JSON.parse(userCookie);
      setData(userData.patient);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropDownRef.current &&
        !profileDropDownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/logout");
  };

  return (
    <MainLayout
      title={t("title")}
      menu={
        <>
          <hr />
          {/*<motion.h5 variants={menuHeaderAnimationVariants}>ข้อมูล</motion.h5>*/}
          <NavLink to="jobs">
            <>
              <HomeIcon className="h-6" />
              {t("jobs")}
            </>
          </NavLink>
          <hr />
          <motion.h5 variants={menuHeaderAnimationVariants}>
            {t("support")}
          </motion.h5>
          <a href="https://healthtag.io/support" target="_blank">
            <BookOpenIcon />
            {t("manual")}
          </a>
          <hr />
          <motion.h5 variants={menuHeaderAnimationVariants}>
            {t("setting")}
          </motion.h5>
          <NavLink to="setting">
            <>
              <CogIcon />
              {t("interface")}
            </>
          </NavLink>
        </>
      }
      header={
        <header className="h-16 flex justify-end">
          <div
            ref={profileDropDownRef}
            className="relative flex px-3 gap-2"
            style={{ background: `rgba(255,255,255,0.1 )` }}
          >
            <div className="flex items-center">
              <LanguageSelector dark={true} />
            </div>
            <div
              className="py-3 hover:cursor-pointer flex items-center text-white gap-1"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <span>Admin</span>
              <ChevronIcon side={isProfileOpen ? "up" : "down"} />
            </div>
            <AnimatePresence>
              {isProfileOpen ? (
                <motion.nav
                  variants={dropDownMenuAnimationVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="profile-dropdown"
                  className={`dropdown flex flex-col gap-3`}
                >
                  <NavLink to="edit-personal-data">
                    <>
                      <PencilIcon />
                      {t("editPersonalData")}
                    </>
                  </NavLink>
                  <a className="cursor-pointer" onClick={logout}>
                    <KeyIcon /> {t("logout")}
                  </a>
                </motion.nav>
              ) : (
                <></>
              )}
            </AnimatePresence>
          </div>
        </header>
      }
    >
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="" element={<Navigate to="jobs" replace />} />
          <Route path="jobs" element={<JobsPage />} />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
};

export default ConsolePage;
