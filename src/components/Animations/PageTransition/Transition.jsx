import { motion } from "framer-motion";
import React from "react";
import {
  childrenAnimation,
  slideInAnimation,
  slideOutAnimation,
} from "./Animations";
import "./Transition.scss";

export function Transition({ children }) {
  return (
    <>
      <motion.div
        variants={slideInAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        className="slide-in"
      ></motion.div>
      <motion.div
        variants={slideOutAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        className="slide-out"
      ></motion.div>
      <motion.div
        variants={childrenAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </>
  );
}
