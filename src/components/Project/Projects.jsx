import { motion } from "framer-motion";
import React, { useRef } from "react";
import { Activity } from "./Activity.jsx";
import { Exposition } from "./Exposition.jsx";
import { PriceReviews } from "./PriceReview.jsx";
import "./Project.scss";

const Projects = () => {
  const containerRef = useRef(null);

  return (
    <>
      <motion.section className="project-container" ref={containerRef}>
        <Exposition />
        <Activity />
        <PriceReviews />
      </motion.section>
    </>
  );
};

export default Projects;
