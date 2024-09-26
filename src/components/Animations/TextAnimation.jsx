import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";

export const TextTransition = ({
  textClassName = "",
  children,
  animationConfig = {
    opacity: 0,
    y: 100,
    duration: 1,
    delay: 0.3,
    stagger: 0.03,
    ease: "power2.out",
  },
}) => {
  const textRef = useRef(null);

  useGSAP(() => {
    const element = textRef.current;
    if (!element) return;

    const split = new SplitType(element);

    gsap.from(split.lines, {
      ...animationConfig,
    });
  }, [animationConfig]);

  return (
    <div ref={textRef} className={textClassName}>
      {children}
    </div>
  );
};

export const LineTransition = ({
  textClassName,
  isClciked,
  yposition = 500,
}) => {
  useLayoutEffect(() => {
    if (!isClciked) {
      const element = document.querySelector(`.${textClassName}`);
      const split = new SplitType(element);

      gsap.from(split.words, {
        y: yposition,
        duration: 1,
        stagger: 0.03,
        ease: "power2.out",
      });
    }
  }, [textClassName, isClciked, yposition]);
};

export const TitleTransition = ({
  textClassName,
  isClciked,
  yposition = 500,
}) => {
  useLayoutEffect(() => {
    if (!isClciked) {
      const element = document.querySelector(`.${textClassName}`);
      const split = new SplitType(element);

      gsap.from(split.chars, {
        y: yposition,
        duration: 1,
        stagger: 0.03,
        ease: "power2.out",
      });
    }
  }, [textClassName, isClciked, yposition]);
};
