import { motion } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import AboutContent from "../../components/About/AboutInfos.jsx";
import Quote from "../../components/About/Quote/Quote.jsx";
import { Transition } from "../../components/Animations/PageTransition/Transition.jsx";
import Circle from "../../components/Common/Circle.jsx";
import Hero from "../../components/Common/Hero/Hero.jsx";
import Form from "../../components/Form/Form";
import "../About/About.scss";
import Projects from "../Projects/Projects.jsx";

const About = () => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  return (
    <Transition>
      <motion.section className="about-container" ref={containerRef}>
        <Hero title={t("nav.about")} />
        <AboutContent ref={containerRef} />
        <Quote />
        <Projects />
      </motion.section>
      <footer>
        <Circle target={"about-container"} />
        <Form />
      </footer>
    </Transition>
  );
};

export default About;
