import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosResize } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Transition } from "../../components/Animations/PageTransition/Transition";
import Hero from "../../components/Common/Hero/Hero";
import HeroSubContent from "../../components/Hero/HeroSubContent";
import { originauxData } from "../../data/data";
import "./Originaux.scss";

const OriginauxMoyens = ({ isCursorPointer }) => {
  isCursorPointer === true;

  const originaux = originauxData.filter((item) => {
    return item.dimension === "moyens-formats";
  });

  let navigate = useNavigate();

  const handleNavigateToDetails = (id) => {
    navigate(`/originaux/moyens-formats/${id}`);
  };

  return (
    <Transition>
      <div className="galerie-container">
        <Hero title="originaux moyen format" className="hero-subtitle" />
        <HeroSubContent>
          <div className="top-content">
            <div className="mail-container">
              <p>
                Vous êtes intéressé(e) par une œuvre originale ? Elles ne sont
                pas disponibles à la vente sur le site, mais vous pouvez me
                contacter sur mon mail : {""}
                <a
                  className="mail-originaux"
                  href="mailto:margrittmartinet@gmail.com"
                >
                  margrittmartinet@gmail.com
                </a>
              </p>
            </div>
            <div className="content-right">
              <p>
                Chaque oeuvre originale est unique, signée par l'artiste et
                accompagnée d'un certificat d'authenticité.
              </p>
            </div>
          </div>
          <div className="bottom-content">
            <div className="format">
              <div className="icon">
                <IoIosResize />
              </div>
              <p> Taille 50 x 70 cm</p>
            </div>
          </div>
        </HeroSubContent>
        <motion.div className="grid-images-content" exit="exit">
          <div className="img-gallery-container">
            {originaux.map((imgData, id) => {
              return (
                <motion.div
                  key={id}
                  initial={{ y: 100 }}
                  animate={{
                    y: 0,
                    transition: {
                      duration: 1,
                    },
                  }}
                  exit="exit"
                >
                  <div
                    onClick={() => {
                      handleNavigateToDetails(imgData.id);
                    }}
                    className="images-container"
                  >
                    <picture>
                      <source type="image/webp" srcSet={imgData.imgWebp} />
                      <img
                        loading="lazy"
                        alt={imgData.alt}
                        src={imgData.imgJpg}
                      />
                    </picture>
                  </div>
                  <div className="image-content">
                    <div className="infos-content">
                      <div className="infos">
                        <p>{imgData.title}</p>
                        <span>|</span>
                        <p>{imgData.format}</p>
                        <span>|</span>
                        <p> {imgData.date}</p>
                      </div>
                    </div>
                    <div className="button-container">
                      <div className="infos-button-container">
                        <span className="infos-button">En savoir plus</span>
                        <div className="icon">
                          <IoIosArrowForward />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Transition>
  );
};

export default OriginauxMoyens;
