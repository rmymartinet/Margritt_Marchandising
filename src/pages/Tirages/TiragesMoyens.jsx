import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosResize } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Transition } from "../../components/Animations/PageTransition/Transition";
import Hero from "../../components/Common/Hero/Hero";
import HeroSubContent from "../../components/Hero/HeroSubContent";
import { originauxData } from "../../data/data";
import "./Tirages.scss";

const TiragesMoyens = () => {
  const tirages = originauxData.filter((item) => {
    return item.dimension === "medium";
  });

  let navigate = useNavigate();
  const handleNavigate = (id, size) => {
    navigate(`/tirages/grands-formats/${id}`);
  };

  return (
    <Transition>
      <div className="galerie-container">
        <Hero title="tirages grand format" className="hero-subtitle" />
        <HeroSubContent>
          <div className="content-left">
            <span>Disponible à la vente via le site</span>
            <div className="format">
              <div className="icon">
                <IoIosResize />
              </div>
              <p> Taille 50 x 70 cm</p>
            </div>
          </div>
          <p>
            Les tirages sont des reproductions numériques de haute qualité de
            mes œuvres originales. Chaque tirage est en édition limitée,
            numéroté, signé par l'artiste et accompagné d'un certificat
            d'authenticité. Les tirages sont en édition limitée et réalisés par
            Les 'Courts Tirages'.
          </p>
        </HeroSubContent>
        <motion.div className="grid-images-content" exit="exit">
          <div className="img-gallery-container">
            {tirages.map((imgData, id) => {
              return (
                <motion.div
                  className={`grid-img${id} img`}
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
                        className={`img-${id}`}
                        alt={imgData.alt}
                        src={imgData.imgJpg}
                      />
                    </picture>
                  </div>
                  <div className="image-content">
                    <div className="content-left">
                      <div className="image-title">
                        <p>{imgData.title}</p>
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
                    <div className="content-right">
                      <div className="image-date">
                        <p>{imgData.date}</p>
                      </div>
                      <div className="image-format">
                        <p>({imgData.format})</p>
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

export default TiragesMoyens;
