import { motion } from "framer-motion";
import { useRef } from "react";
import { IoIosResize } from "react-icons/io";
import { Transition } from "../../components/Animations/PageTransition/Transition.jsx";
import Hero from "../../components/Common/Hero/Hero.jsx";
import ImagesContainer from "../../components/Galleries/ImagesContainer.jsx";
import HeroSubContent from "../../components/Hero/HeroSubContent.jsx";
import TextContentLinks from "../../components/SocialMedia/TextContentLinks.jsx";

import { originauxData } from "../../data/data.js";
import "../Galleries/Galleries.scss";

const Gallery = () => {
  const refContainer = useRef(null);
  const extraLargeItem = originauxData.filter(
    (item) => item.dimension === "extra-large"
  );

  return (
    <Transition>
      <motion.section ref={refContainer} className="galerie-container">
        <Hero title="Galerie" className="hero-subtitle" />
        <HeroSubContent>
          <div className="content-left">
            <span>Indisponible à la vente</span>
            <div className="format">
              <div className="icon">
                <IoIosResize />
              </div>
              <p>Taille supérieure à 2 mètres</p>
            </div>
          </div>
          <div className="content-right">
            <TextContentLinks text="Vous retrouverez ici des oeuvres extra-large et projects sur lesquels je suis entrain de travailler. Si vous voulez suivre l'avancement des mes projets retrouvez moi sur" />
          </div>
        </HeroSubContent>
        <ImagesContainer item={extraLargeItem} refContainer={refContainer} />
      </motion.section>
    </Transition>
  );
};

export default Gallery;
