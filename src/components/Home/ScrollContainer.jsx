import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { originauxData } from "../../data/data";
import useWindow from "../Common/UseWindows";
import useHoverEvents from "./useHoverEvents";
import useInitialAnimations from "./useInitialAnimation";
import useScrollTriggerAnimations from "./useScrollTriggerAnimations";

const ScrollContainer = () => {
  const { dimension } = useWindow();
  let navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/originaux/${id}`);
  };
  const oeuvresData = originauxData;

  const flipContainerRef = useRef(null);
  const infosOeuvresRefs = useRef([]);

  useEffect(() => {
    infosOeuvresRefs.current = infosOeuvresRefs.current.slice(
      0,
      oeuvresData.length
    );
  }, [oeuvresData.length]);

  useInitialAnimations({ flipContainerRef, infosOeuvresRefs }, 200);
  useHoverEvents({ infosOeuvresRefs });
  useScrollTriggerAnimations({ infosOeuvresRefs });

  useGSAP(
    () => {
      if (dimension.width > 468) {
        const items = document.querySelectorAll(".oeuvres-grid");

        items.forEach((item) => {
          const image = item.querySelector("img");

          const handleMouseEnter = () => {
            gsap.to(image, {
              opacity: 1,
              ease: "power3.inOut",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(image, {
              opacity: 0,
            });
          };

          const handleMouseMove = (e) => {
            gsap.to(image, { x: e.offsetX - 400, y: e.offsetY });
          };

          item.addEventListener("mouseenter", handleMouseEnter);
          item.addEventListener("mouseleave", handleMouseLeave);
          item.addEventListener("mousemove", handleMouseMove);

          return () => {
            item.removeEventListener("mouseenter", handleMouseEnter);
            item.removeEventListener("mouseleave", handleMouseLeave);
            item.removeEventListener("mousemove", handleMouseMove);
          };
        });
      }
    },
    { scope: flipContainerRef, dependencies: [dimension.width, oeuvresData] }
  );

  return (
    <div className="wrapper">
      <div ref={flipContainerRef} className="flip-container">
        {oeuvresData.map((oeuvres, index) => {
          return (
            <div
              ref={(el) => (infosOeuvresRefs.current[index] = el)}
              key={index}
              className="oeuvres-grid"
            >
              <div className="oeuvres" onClick={() => handleNavigate(index)}>
                <p>{oeuvres.title}</p>
              </div>
              <img src={oeuvres.imgWebp} alt="" />
            </div>
          );
        })}
      </div>
      <div className="scrollDist"></div>
    </div>
  );
};

export default ScrollContainer;
