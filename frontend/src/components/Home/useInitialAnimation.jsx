import { gsap } from "gsap";
import { useEffect } from "react";

const useInitialAnimations = (
  { flipContainerRef, infosOeuvresRefs },
  perspectiveValue
) => {
  useEffect(() => {
    const c = flipContainerRef.current;
    const infosOeuvres = infosOeuvresRefs.current;

    gsap.to(c, { duration: 0.4, perspective: perspectiveValue });

    infosOeuvres.forEach((b, i) => {
      gsap.set(b, {
        position: "absolute",
        left: "50%",
        top: "50%",
        xPercent: -50,
        margin: -150,
        height: 300,
        clearProps: "transform",
        backfaceVisibility: "hidden",
      });

      b.tl = gsap
        .timeline({ paused: true, defaults: { immediateRender: true } })
        .fromTo(
          b,
          {
            scale: 0.2,
            rotationX: (i / infosOeuvres.length) * -200,
            transformOrigin: "-7% 50% -600%",
          },
          {
            rotationX: "+=250",
            ease: "none",
          }
        )
        .timeScale(0.2);
    });
  }, [flipContainerRef, infosOeuvresRefs, perspectiveValue]);
};

export default useInitialAnimations;
