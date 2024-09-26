export const menuSlide = {
  initial: {
    width: "0dvw",
    position: "fixed",
    top: "0",
    left: "0",
  },

  enter: {
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    width: "100dvw",
    position: "fixed",
  },

  exit: {
    width: "0%",
    position: "fixed",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const delayGlobal = 0.2;

export const slide = {
  initial: (i) => ({
    x: i - 700,
    opacity: 0,
  }),

  enter: (i) => ({
    x: i * 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05 * i + delayGlobal,
    },
  }),

  exit: (i) => ({
    x: i - 700,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.01 * i + delayGlobal,
    },
  }),
};

export const slideText = {
  initial: {
    x: 0,
    opacity: 0,
  },

  enter: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
      delay: 1,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const slideNav = {
  initial: {
    x: 0,
    opacity: 0, // Mettre l'opacité à 1 seulement pour l'élément avec l'index 1
  },

  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 2,
      ease: [0.76, 0, 0.24, 1],
    },
  },

  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
