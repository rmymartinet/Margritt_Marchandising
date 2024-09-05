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
          <div className="top-content">
            <div className="mail-container">
              <span>Indisponible à la vente</span>
            </div>
            <div className="content-right">
              <TextContentLinks
                text="
                Ma gallerie regroupe des œuvres originales mais aussi les
                projects sur lesquels je travaille actuellement venez suivre l'avançement de mes projets sur"
              />
            </div>
          </div>
          <div className="bottom-content">
            <div className="format">
              <div className="icon">
                <IoIosResize />
              </div>
              <p>Taille supérieure à 2 mètres</p>
            </div>
          </div>
        </HeroSubContent>
        <ImagesContainer item={extraLargeItem} refContainer={refContainer} />
      </motion.section>
    </Transition>
  );
};

export default Gallery;
