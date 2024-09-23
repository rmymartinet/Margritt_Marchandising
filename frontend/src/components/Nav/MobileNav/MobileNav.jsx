import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CONTACT_INFO } from "../../../data/dataContactInfos";
import {
  menuSlide,
  slide,
  slideNav,
  slideText,
} from "../../Animations/NavAnimation";

import { FiShoppingCart } from "react-icons/fi";
import { useStoreShopping } from "../../../store/useStoreShopping";
import "./MobileNav.scss";

const MobileNav = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(null);
  const [isTiragesDropdown, setIsTiragesDropdown] = useState(false);
  const [isOriginauxDropdown, setIsOriginauxDropdown] = useState(false);
  const [isShoppingClicked, setIsShoppingClicked] = useState(false);
  const tiragesMenuRef = useRef(null);
  const originauxMenuRef = useRef(null);
  const text1 = useRef(null);
  const text2 = useRef(null);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const cart = useStoreShopping((state) => state.cart);

  const totalProducts = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const navItems = useMemo(
    () => [
      "Home",
      "Gallery",
      "Originals",
      "Prints",
      "Exhibitions",
      "Info",
      "Contact",
    ],
    []
  );

  const handleNavigate = useCallback(
    (path, index) => {
      setIsClicked(index);
      const homePath = path === "/home" ? "/" : path;

      if (path !== "/prints" && path !== "/originals") {
        navigate(homePath);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (isClicked !== null) {
      const isTirages = navItems[isClicked] === "Prints";
      const isOriginaux = navItems[isClicked] === "Originals";

      if (!isTirages) {
        setIsTiragesDropdown(false);
      }

      if (!isOriginaux) {
        setIsOriginauxDropdown(false);
      }
    }
  }, [isClicked, navItems]);

  const handleTiragesDropdown = useCallback(() => {
    setIsTiragesDropdown((prev) => !prev);
    setIsOriginauxDropdown(false);
  }, []);

  const handleOriginauxDropdown = useCallback(() => {
    setIsOriginauxDropdown((prev) => !prev);
    setIsTiragesDropdown(false);
  }, []);

  useGSAP(() => {
    if (isTiragesDropdown) {
      gsap.fromTo(
        tiragesMenuRef.current,
        { height: 0, transformOrigin: "top" },
        { height: "auto", duration: 0.5 }
      );

      gsap.fromTo(text1.current, { opacity: 0 }, { opacity: 1, delay: 0.2 });
      gsap.fromTo(text2.current, { opacity: 0 }, { opacity: 1, delay: 0.2 });
    } else {
      gsap.to(tiragesMenuRef.current, {
        height: 0,
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
        { height: 0, transformOrigin: "top" },
        { height: "auto", duration: 0.5 }
      );
      gsap.fromTo(text1.current, { opacity: 0 }, { opacity: 1, delay: 0.2 });
      gsap.fromTo(text2.current, { opacity: 0 }, { opacity: 1, delay: 0.2 });
    } else {
      gsap.to(originauxMenuRef.current, {
        height: 0,
        duration: 0.5,
        transformOrigin: "top",
      });

      gsap.to(text1.current, { opacity: 0, duration: 0 });
      gsap.to(text2.current, { opacity: 0, duration: 0 });
    }
  }, [isOriginauxDropdown]);

  const links = [
    { name: "Tiktok", url: `${CONTACT_INFO.tiktok}` },
    {
      name: "Instagram",
      url: `${CONTACT_INFO.instagram}`,
    },
    {
      name: "LinkedIn",
      url: `${CONTACT_INFO.linkedin}`,
    },
  ];

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="menu-mobile"
    >
      <div className="nav-container">
        <div className="nav">
          <motion.div
            className="nav-header"
            variants={slideNav}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <p>Navigation</p>
          </motion.div>
          <div className="links-container">
            <div className="nav-right">
              <div className="connection">
                <span>Se connecter</span>
              </div>
              <div className="shopping-icon">
                <span
                  onClick={() => {
                    setIsShoppingClicked(true);
                    handleCheckout();
                  }}
                >
                  <FiShoppingCart size={20} />
                  <div className="article-number">{totalProducts}</div>
                </span>
              </div>
            </div>
            {navItems.map((item, index) => {
              const path = `/${item.toLowerCase().replace(/ /g, "-")}`;
              const isTirages = item === "Prints";
              const isOriginaux = item === "Originals";

              return (
                <motion.div
                  variants={slide}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  custom={index}
                  className="nav-item"
                  key={item}
                  onClick={() => {
                    handleNavigate(path, index);
                    if (isTirages) {
                      handleTiragesDropdown();
                    } else if (isOriginaux) {
                      handleOriginauxDropdown();
                    }
                  }}
                >
                  <div className="nav-item-title-content">
                    <p className="nav-text">{item}</p>
                    {item === "Originals" && (
                      <IoIosArrowDown
                        className={
                          isOriginauxDropdown ? "rotate-active" : "rotate"
                        }
                      />
                    )}
                    {item === "Prints" && (
                      <IoIosArrowDown
                        className={
                          isTiragesDropdown ? "rotate-active" : "rotate"
                        }
                      />
                    )}
                  </div>
                  {isOriginaux && isOriginauxDropdown && (
                    <div ref={originauxMenuRef} className="dropdown-menu">
                      <div
                        onClick={() =>
                          handleNavigate("/originals/large-formats")
                        }
                        ref={text1}
                        className="dropdown-item"
                      >
                        <p>large-formats</p>
                      </div>
                      <div
                        onClick={() =>
                          handleNavigate("/originals/medium-formats")
                        }
                        ref={text2}
                        className="dropdown-item"
                      >
                        <p>medium-formats</p>
                      </div>
                    </div>
                  )}
                  {isTirages && isTiragesDropdown && (
                    <div ref={tiragesMenuRef} className="dropdown-menu">
                      <div
                        onClick={() => handleNavigate("/prints/large-formats")}
                        ref={text1}
                        className="dropdown-item"
                      >
                        <p>large-formats</p>
                      </div>
                      <div
                        onClick={() => handleNavigate("/prints/medium-formats")}
                        ref={text2}
                        className="dropdown-item"
                      >
                        <p>medium-formats</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
        <motion.div className="footer">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={slideText}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MobileNav;
