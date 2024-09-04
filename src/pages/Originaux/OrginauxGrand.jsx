import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosResize } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Transition } from "../../components/Animations/PageTransition/Transition";
import Hero from "../../components/Common/Hero/Hero";
import HeroSubContent from "../../components/Hero/HeroSubContent";
import { originauxData } from "../../data/data";
import "./Originaux.scss";

const OriginauxGrands = () => {
  const originaux = originauxData.filter((item) => {
    return item.dimension === "large";
  });

  let navigate = useNavigate();
  const handleNavigate = (id, size) => {
    navigate(`/originaux/grands-formats/${id}`);
  };

  return (
    <Transition>
      <div className="galerie-container">
        <Hero title="originaux grand format" className="hero-subtitle" />
        <HeroSubContent>
          <div className="mail-container">
            <p>
              Vous êtes intéressé(e) par une œuvre originale ? Elles ne sont pas
              disponibles à la vente sur le site, mais vous pouvez me contacter
              sur mon mail : {""}
              <a
                className="mail-originaux"
                href="mailto:margrittmartinet@gmail.com"
              >
                margrittmartinet@gmail.com
              </a>
            </p>
          </div>
          <div>
            <p>
              Chaque oeuvre originale est unique, signée par l'artiste et
              accompagnée d'un certificat d'authenticité.
            </p>
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
            {originaux.map((imgData, id) => {
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

export default OriginauxGrands;
