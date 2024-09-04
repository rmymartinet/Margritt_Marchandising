import { useEffect, useState } from "react";
import useWindow from "../../Common/UseWindows.jsx";
import MobileNav from "../MobileNav/MobileNav.jsx";
import Nav from "../Nav.jsx";
import "./Navbar.scss";

const MOBILE_WIDTH = 498;

const NavBar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 498);
  const { dimension } = useWindow();
  const handleActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    setIsMobile(dimension.width < MOBILE_WIDTH);
  }, [dimension.width]);

  return (
    <>
      {isMobile && (
        <>
          <div className="header-mobile">
            <div
              onClick={handleActive}
              className={`button ${isActive ? "buttonActive" : ""}`}
            >
              <div
                className={`buttonName ${isActive ? "buttonNameActive" : ""}`}
              >
                {isActive ? <p>Close</p> : <p>Menu</p>}
              </div>
            </div>
          </div>
          {isActive && <MobileNav />}
        </>
      )}

      {!isMobile && (
        <div className="header">
          <Nav />
        </div>
      )}
    </>
  );
};

export default NavBar;
