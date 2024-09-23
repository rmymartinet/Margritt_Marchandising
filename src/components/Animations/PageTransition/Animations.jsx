import { Power1, Power2, Power3 } from "gsap";

export const childrenAnimation = {
  initial: {
    y: 500,
  },
  animate: {
    y: 0,
    transition: {
      ease: Power2.easeInOut,
      duration: 0.8,
    },
  },
  exit: {
    y: 500,
    transition: {
      ease: Power1.easeInOut,
      duration: 1,
    },
  },
};

export const slideOutAnimation = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 0,
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: Power3.easeInOut,
    },
  },
};

export const slideInAnimation = {
  initial: {
    scaleY: 1,
  },
  animate: {
    scaleY: 0,
    transition: {
      duration: 0.8,
      ease: Power3.easeInOut,
    },
  },
  exit: {
    scaleY: 0,
  },
};

export const animateSlideImg = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
  },
  exit: {
    y: -1000,
    transition: {
      delay: 0,
      duration: 2,
      ease: Power1.easeOut,
    },
  },
};
