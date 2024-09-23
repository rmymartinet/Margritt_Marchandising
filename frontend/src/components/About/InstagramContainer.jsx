import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import CardContainer from "./Card/CardContainer";

gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollTrigger);

const Instagram = () => {
  const START_TRIGGER = "top 40%";
  const END_TRIGGER = "bottom 85%";
  const sliderRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".instagram",
        start: START_TRIGGER,
        end: END_TRIGGER,
        scrub: 1,
      },
    });

    tl.fromTo(
      ".circle",
      {
        scale: 0,
        duration: 1,
        ease: "power2.out",
      },
      {
        scale: 20,
      }
    );
    return () => tl.kill();
  });

  useGSAP(() => {
    gsap.utils.toArray(".card").forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          rotate: 0,
          rotateX: -150,
          y: 1000,
        },
        {
          y: 0,
          rotateX: 0,
          rotate: i % 2 === 0 ? 2 : -2,
          skewY: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".instagram",
            start: START_TRIGGER,
            end: END_TRIGGER,
            scrub: 1,
          },
        }
      );
    });
  });

  return (
    <div className="instagram">
      <div className="circle"></div>
      <div className="instagram-top-banner">
        <div className="instagram-title">Suis moi</div>
        <a
          className="instagram-link"
          href="https://www.instagram.com/maargriitt/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @maargriitt
        </a>
      </div>
      <div className="instagram-content">
        <div className="slider" ref={sliderRef}>
          <CardContainer slider={sliderRef} />
        </div>
      </div>
    </div>
  );
};

export default Instagram;
