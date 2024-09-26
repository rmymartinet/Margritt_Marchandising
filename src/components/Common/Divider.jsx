import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import React from "react";

const Divider = ({ className }) => {
  useGSAP(() => {
    gsap.to(`.${className}`, {
      width: "100%",
      duration: 1.2,
      delay: 0,
      ease: "power3.inOut",
    });
  }, [className]);

  return <motion.div className={className}></motion.div>;
};

Divider.displayName = "Divider";

export default Divider;
