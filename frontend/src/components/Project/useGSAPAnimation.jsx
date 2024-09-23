import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useGSAPAnimation = (dataRef, triggerRef) => {
  console.log(dataRef);
  console.log(triggerRef);
  useGSAP(
    () => {
      gsap.fromTo(
        dataRef.current.map((ref) => ref.current),
        { opacity: 1, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 75%",
            end: "bottom 60%",
          },
        }
      );
    },
    { dependencies: [dataRef.current, triggerRef.current] }
  );
};

export default useGSAPAnimation;
