import { motion, useScroll, useTransform } from "framer-motion";
import "../../sass/circle.scss";
import Copyright from "./Copyright/Copyright";

const Circle = ({ target }) => {
  const { scrollYProgress } = useScroll({
    target: target,
    offset: ["start", "end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0, 0.4, 0.5], [100, 50, 0.5]);

  return (
    <div className="main-circle">
      <motion.div style={{ height }} className="circle-container">
        <div className="circle"></div>
        <Copyright />
      </motion.div>
    </div>
  );
};

export default Circle;
