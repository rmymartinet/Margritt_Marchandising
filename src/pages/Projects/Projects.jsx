import { motion } from "framer-motion";
import { useRef } from "react";

import { Activity } from "../../components/Project/Activity.jsx";
import { Exposition } from "../../components/Project/Exposition.jsx";
import { PriceReviews } from "../../components/Project/PriceReview.jsx";
import "../Projects/Project.scss";

const Projects = () => {
  const containerRef = useRef(null);

  return (
    <>
      <div className="projects-container">
        <motion.section className="project-content" ref={containerRef}>
          <Exposition />
          <Activity />
          <PriceReviews />
        </motion.section>
      </div>
    </>
  );
};

export default Projects;
