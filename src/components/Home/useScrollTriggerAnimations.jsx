import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const useScrollTriggerAnimations = (refs) => {
  useEffect(() => {
    const infosOeuvres = refs.infosOeuvresRefs.current;

    const createScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: ".scrollDist",
        start: "top 80%",
        end: "bottom bottom",
        onRefresh: (self) => {
          infosOeuvres.forEach((b, i) => {
            gsap.set(b.tl, { progress: self.progress });
          });
        },
        onUpdate: (self) => {
          infosOeuvres.forEach((b, i) => {
            gsap.to(b.tl, { progress: self.progress });
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".flip-container",
        start: "top 30%",
        end: "+=300%",
        id: "flip-container",
        scrub: true,
        pin: true,
      });
    };

    createScrollTrigger();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [refs]);
};

export default useScrollTriggerAnimations;
