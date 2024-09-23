import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import useCountStore from "../../store/useCountStore";
import "./Landing.scss";

const Landing = () => {
  const count = useCountStore((state) => state.count);
  const landindSquareRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      landindSquareRef.current,
      { width: 0 },
      {
        duration: 3.5,
        width: "100%",
        ease: "power4.inOut",
      }
    );
  });

  useEffect(() => {
    if (count === 100) {
      gsap.to(landindSquareRef.current, {
        duration: 2,
        width: "100%",
        height: "100%",
        ease: "power3.inOut",
      });
    }
  }, [count]);

  return (
    <div className="landing-container">
      <div ref={landindSquareRef} className="landing-square">
        <div className="landing-square__inner"></div>
      </div>
      <div className="landing-content">
        <p>2024</p>
        <p>loading {count}%</p>
      </div>
    </div>
  );
};

export default Landing;
