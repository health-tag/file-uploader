import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const dropdownVariants = {
  opened: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 0 },
};

export const LanguageSelector = ({ dark = false }: { dark?: boolean }) => {
  const { t, i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const setLocale = (locale: "auto" | string) => {
    if (locale === "auto") {
      localStorage.removeItem("i18nextLng");
      i18n.changeLanguage();
    } else {
      i18n.changeLanguage(locale);
    }
  };
  return (
    <div
      className="cursor-pointer relative"
      draggable="false"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <a className={`${dark ? "text-white" : ""}`}>
        {i18n.language.startsWith("en") && (
          <div>
            {" "}
            <img
              draggable="false"
              role="img"
              className="h-6 inline"
              alt="🇺🇸"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAASFBMVEVHcEzu7u6yIzSyIzQ8O26yIzTu7u6yIzSyIzSyIzQ8O248O248O248O248O26yIzTu7u5tbJKenbdIR3fn5+15eJv////CwtLh3403AAAADnRSTlMAYBAgIO+vv2DPYL/P78tfW7cAAAC3SURBVHhe7dK9EoQgDIXRq66irpvE//d/0x3pARmoMjlNuq/IXOhlzPylKI5yIzx8FkrghKnznR+VhrhvASxUHmIHzE/gPIkiV9IaPH++j+OmyJW0AU9gv649duUFH1q3bQ3dnFDsPx6/4EOh/2SHQv/JDoX+kx8q35GA6uxI1O7IdmQ7SuMXNIekEs0hrkRbSP+ObEe2o0GqGNBIFQ3guAIHoO25WN8CQDdxoamDh9FxATdCLWP+KPnfX8FNNiYAAAAASUVORK5CYII="
            />
          </div>
        )}
        {i18n.language.startsWith("th") && (
          <div>
            <img
              draggable="false"
              role="img"
              className="h-6 inline"
              alt="th"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAAG1BMVEVHcEztHCTtHCTtHCTtHCTtHCQkHU/u7u7tHCRqPaKTAAAABnRSTlMAIM+/YO8aA/umAAAAZUlEQVR4Xu3VMQ2AQBQE0QEFBAXggeJ6GiSgAAsnAEhWNg74W5BLSP6rp96lvbTq1QIwKjBDtytwD/QKTWwKXRSFTmTwomogIw7Dn6OMMqoGMvpufa2xt27DOiDrypxTtO61ufQAKbdOEPN8YSIAAAAASUVORK5CYII="
            />
          </div>
        )}
      </a>
      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            className={`top-full right-0 w-28 absolute rounded-md overflow-hidden shadow-card flex flex-col gap-2 ${
              dark ? "bg-[#333950]" : "bg-glass"
            }`}
            initial="opened"
            exit="closed"
            variants={dropdownVariants}
          >
            <li
              className={`p-3 cursor-pointer ${
                dark ? "hover:bg-slate-400 text-white" : "hover:bg-white"
              }`}
              onClick={() => setLocale("auto")}
            >
              <img
                draggable="false"
                role="img"
                className="h-6 inline mr-3"
                alt="🇺🇸"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAP1BMVEVHcEw7iMM7iMM7iMM7iMM7iMNHj8c7iMP////O4fB4rda20unz+PvC2uyRvN1Ul8upy+Xn8PiFtdpsptKdxOEkXfsfAAAABnRSTlMAv+9gIM+kpfmZAAABHklEQVR4Xu3Y246DMAwE0KQQ27lBb///ras2u5aAtkZitOpD5qkS0tEATQC7RwbPB+IH1zIGPpgwPp0TH87pIQUGJDg3MCSD8xjIOwalQ5/Sobs8cz8KkfzmayB+BXWIcjzTe4jOMdMuqIrI5fYOul1EpO6BUmuQ6RVEubHJhqhIS0lbKOlBMqEsmkpLiKposgm1QlpKoVZHU0yoNkNL/UG0OmBCFBdSWfzQRDIh5qmIkTLtWyJz/OzEmU1ISxl1bEhLWXVsSEsZdWxISxl1TEhzXZUqV2YcBDw13MUG3n7cHxK4RGCLFraNgDc2/FaL3/zxjyNOWmcLaamEemRDXyK+//2oQ//4CQFIhzqEGrLAxj6oQRRsNIYb1sHGhz+jnZKLb2CrVgAAAABJRU5ErkJggg=="
              />
              Auto
            </li>
            <li
              className={`p-3 cursor-pointer ${
                dark ? "hover:bg-slate-400 text-white" : "hover:bg-white"
              }`}
              onClick={() => setLocale("en")}
            >
              <img
                draggable="false"
                role="img"
                className="h-6 inline mr-3"
                alt="🇺🇸"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAASFBMVEVHcEzu7u6yIzSyIzQ8O26yIzTu7u6yIzSyIzSyIzQ8O248O248O248O248O26yIzTu7u5tbJKenbdIR3fn5+15eJv////CwtLh3403AAAADnRSTlMAYBAgIO+vv2DPYL/P78tfW7cAAAC3SURBVHhe7dK9EoQgDIXRq66irpvE//d/0x3pARmoMjlNuq/IXOhlzPylKI5yIzx8FkrghKnznR+VhrhvASxUHmIHzE/gPIkiV9IaPH++j+OmyJW0AU9gv649duUFH1q3bQ3dnFDsPx6/4EOh/2SHQv/JDoX+kx8q35GA6uxI1O7IdmQ7SuMXNIekEs0hrkRbSP+ObEe2o0GqGNBIFQ3guAIHoO25WN8CQDdxoamDh9FxATdCLWP+KPnfX8FNNiYAAAAASUVORK5CYII="
              />
              en-US
            </li>
            <li
              className={`p-3 cursor-pointer ${
                dark ? "hover:bg-slate-400 text-white" : "hover:bg-white"
              }`}
              onClick={() => setLocale("th")}
            >
              <img
                draggable="false"
                role="img"
                className="h-6 inline mr-3"
                alt="th"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAAG1BMVEVHcEztHCTtHCTtHCTtHCTtHCQkHU/u7u7tHCRqPaKTAAAABnRSTlMAIM+/YO8aA/umAAAAZUlEQVR4Xu3VMQ2AQBQE0QEFBAXggeJ6GiSgAAsnAEhWNg74W5BLSP6rp96lvbTq1QIwKjBDtytwD/QKTWwKXRSFTmTwomogIw7Dn6OMMqoGMvpufa2xt27DOiDrypxTtO61ufQAKbdOEPN8YSIAAAAASUVORK5CYII="
              />
              th-TH
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
