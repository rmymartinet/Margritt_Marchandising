import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import useOutsideClick from "../../store/useOutsideClick";
import "./Nav.scss";

const Nav = () => {
  const { t } = useTranslation();
  const [isClicked, setIsClicked] = useState(null);
  const [isTiragesDropdown, setIsTiragesDropdown] = useState(false);
  const [isOriginauxDropdown, setIsOriginauxDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const tiragesMenuRef = useRef(null);
  const originauxMenuRef = useRef(null);
  const text1 = useRef(null);
  const text2 = useRef(null);
  const navRef = useRef(null);

  // Utilisation du hook pour détecter les clics en dehors des menus déroulants
  useOutsideClick(navRef, () => {
    setIsTiragesDropdown(false);
    setIsOriginauxDropdown(false);
  });

  const navItems = useMemo(
    () => [
      t("nav.home"),
      t("nav.galleries"),
      t("nav.originaux"),
      t("nav.tirages"),
      t("nav.about"),
      t("nav.contact"),
    ],
    [t]
  );
  const handleNavigate = useCallback(
    (path, index) => {
      setIsClicked(index);
      const homePath = path === "/home" ? "/" : path;

      if (path !== "/tirages" && path !== "/originaux") {
        navigate(homePath);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (isClicked !== null) {
      const isTirages = navItems[isClicked] === t("nav.tirages");
      const isOriginaux = navItems[isClicked] === t("nav.originaux");

      if (!isTirages) {
        setIsTiragesDropdown(false);
      }

      if (!isOriginaux) {
        setIsOriginauxDropdown(false);
      }
    }
  }, [isClicked, navItems, t]);

  const handleTiragesDropdown = useCallback(() => {
    setIsTiragesDropdown((prev) => !prev);
    setIsOriginauxDropdown(false);
  }, []);

  const handleOriginauxDropdown = useCallback(() => {
    setIsOriginauxDropdown((prev) => !prev);
    setIsTiragesDropdown(false);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentIndex = navItems.findIndex(
      (item) => `/${item.toLowerCase().replace(/ /g, "-")}` === currentPath
    );
    setIsClicked(currentIndex !== -1 ? currentIndex : null);
  }, [location.pathname, navItems]);

  useGSAP(() => {
    if (isTiragesDropdown) {
      gsap.fromTo(
        tiragesMenuRef.current,
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 0.5 }
      );

      gsap.fromTo(text1.current, { opacity: 0 }, { opacity: 1, delay: 0.2 });
      gsap.fromTo(text2.current, { opacity: 0 }, { opacity: 1, delay: 0.2 });
    } else {
      gsap.to(tiragesMenuRef.current, {
        scaleY: 0,
        duration: 0.5,
        transformOrigin: "top",
      });

      gsap.to(text1.current, { opacity: 0, duration: 0 });
      gsap.to(text2.current, { opacity: 0, duration: 0 });
    }
  }, [isTiragesDropdown]);

  useGSAP(() => {
    if (isOriginauxDropdown) {
      gsap.fromTo(
        originauxMenuRef.current,
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 0.5 }
      );
      gsap.fromTo(text1.current, { opacity: 0 }, { opacity: 1, delay: 0.2 });
      gsap.fromTo(text2.current, { opacity: 0 }, { opacity: 1, delay: 0.2 });
    } else {
      gsap.to(originauxMenuRef.current, {
        scaleY: 0,
        duration: 0.5,
        transformOrigin: "top",
      });

      gsap.to(text1.current, { opacity: 0, duration: 0 });
      gsap.to(text2.current, { opacity: 0, duration: 0 });
    }
  }, [isOriginauxDropdown]);

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      className="menu"
      ref={navRef}
    >
      <div className="nav-container">
        <div className="nav">
          <div className="links-container">
            {navItems.map((item, index) => {
              const path = `/${item.toLowerCase().replace(/ /g, "-")}`;
              const isTirages = item === t("nav.tirages");
              const isOriginaux = item === t("nav.originaux");

              return (
                <motion.div
                  key={item}
                  onClick={() => {
                    handleNavigate(path, index);
                    if (isTirages) {
                      handleTiragesDropdown();
                    } else if (isOriginaux) {
                      handleOriginauxDropdown();
                    }
                  }}
                  className={`nav-item${
                    isClicked === index ? " background active" : ""
                  }`}
                >
                  <p className="nav-text">{item}</p>
                  {isTirages && isTiragesDropdown && (
                    <div ref={tiragesMenuRef} className="dropdown-menu">
                      <div
                        onClick={() =>
                          handleNavigate(
                            `/${t("nav.grandsFormats")
                              .toLowerCase()
                              .replace(/ /g, "-")}`
                          )
                        }
                        ref={text1}
                        className="dropdown-item"
                      >
                        <p>{t("nav.grandsFormats")}</p>
                      </div>
                      <div
                        onClick={() =>
                          handleNavigate(
                            `/${t("nav.moyensFormats")
                              .toLowerCase()
                              .replace(/ /g, "-")}`
                          )
                        }
                        ref={text2}
                        className="dropdown-item"
                      >
                        <p> {t("nav.moyensFormats")}</p>
                      </div>
                    </div>
                  )}
                  {isTirages && (
                    <IoIosArrowDown
                      className={isTiragesDropdown ? "rotate-active" : "rotate"}
                    />
                  )}

                  {isOriginaux && isOriginauxDropdown && (
                    <div ref={originauxMenuRef} className="dropdown-menu">
                      <div
                        onClick={() =>
                          handleNavigate(
                            `/${t("nav.grandsFormats")
                              .toLowerCase()
                              .replace(/ /g, "-")}`
                          )
                        }
                        ref={text1}
                        className="dropdown-item"
                      >
                        <p>{t("nav.grandsFormats")}</p>
                      </div>
                      <div
                        onClick={() =>
                          handleNavigate(
                            `/${t("nav.moyensFormats")
                              .toLowerCase()
                              .replace(/ /g, "-")}`
                          )
                        }
                        ref={text2}
                        className="dropdown-item"
                      >
                        <p>{t("nav.moyensFormats")}</p>
                      </div>
                    </div>
                  )}
                  {isOriginaux && (
                    <IoIosArrowDown
                      className={
                        isOriginauxDropdown ? "rotate-active" : "rotate"
                      }
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Nav;
