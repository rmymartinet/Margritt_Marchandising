import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosResize } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Transition } from "../../components/Animations/PageTransition/Transition";
import Hero from "../../components/Common/Hero/Hero";
import HeroSubContent from "../../components/Hero/HeroSubContent";
import { originauxData } from "../../data/data";
import "./Tirages.scss";

const TiragesGrands = () => {
  const tirages = originauxData.filter((item) => {
    return item.dimension === "grands-formats";
  });

  let navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/tirages/grands-formats/${id}`);
  };

  return (
    <Transition>
      <div className="galerie-container">
        <Hero title="tirages grand format" className="hero-subtitle" />
        <HeroSubContent>
          <div className="top-content">
            <div className="mail-container">
              <span>Disponible à la vente via le site</span>
            </div>
            <div className="content-right">
              <p>
                Les tirages sont des reproductions numériques de haute qualité
                de mes œuvres originales. Chaque tirage est en édition limitée,
                numéroté, signé par l'artiste et accompagné d'un certificat
                d'authenticité. Les tirages sont en édition limitée et réalisés
                par Les 'Courts Tirages'.
              </p>
            </div>
          </div>
          <div className="bottom-content">
            <div className="format">
              <div className="icon">
                <IoIosResize />
              </div>
              <p> Taille 120 x 80 cm</p>
            </div>
          </div>
        </HeroSubContent>
        <motion.div className="grid-images-content" exit="exit">
          <div className="img-gallery-container">
            {tirages.map((imgData, id) => {
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
                      handleNavigate(imgData.id, imgData.format);
                    }}
                    className="images-container"
                  >
                    <picture>
                      <source type="image/webp" srcSet={imgData.imgWebp} />
                      <img
                        loading="lazy"
                        className="img"
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
                      <div className="price">
                        <span>Prix : 600 euros</span>
                      </div>
                    </div>
                    <div className="button-container">
                      <div className="infos-button-container">
                        <span className="infos-button">En savoir plus</span>
                        <div className="icon">
                          <IoIosArrowForward />
                        </div>
                      </div>

                      <div className="buy-button">
                        <p>Acheter</p>
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

export default TiragesGrands;
