import { useEffect, useState } from "react";
import "./Navbar.scss";

import MobileNav from "./MobileNav.jsx";
import Nav from "./Nav.jsx";

const NavBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 498);

  const handleActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handelRezize = () => {
      setIsMobile(window.innerWidth < 498);
    };

    window.addEventListener("resize", handelRezize);

    return () => {
      window.removeEventListener("resize", handelRezize);
    };
  }, []);

  return (
    <nav>
      {isMobile && (
        <div className="header">
          <div
            onClick={handleActive}
            className={`button ${isActive ? "buttonActive" : ""}`}
          >
            <div className={`buttonName ${isActive ? "buttonNameActive" : ""}`}>
              {isActive ? <p>Close</p> : <p>Menu</p>}
            </div>
            {isActive && <MobileNav isActive={isActive} />}
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="header">
          <Nav />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
