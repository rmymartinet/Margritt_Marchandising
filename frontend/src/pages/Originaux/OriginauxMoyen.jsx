import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosResize } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Transition } from "../../components/Animations/PageTransition/Transition";
import Circle from "../../components/Common/Circle";
import Hero from "../../components/Common/Hero/Hero";
import Form from "../../components/Form/Form";
import HeroSubContent from "../../components/Hero/HeroSubContent";
import { useFilteredData } from "../../components/hook/useFilteredData";
import "./Originaux.scss";

const OriginauxMoyens = ({ isCursorPointer }) => {
  const cursorClass = isCursorPointer ? "cursor-pointer" : "";

  let navigate = useNavigate();

  const handleNavigateToDetails = (id) => {
    navigate(`/originals/medium-formats/${id}`);
  };

  const { data } = useFilteredData("medium-formats");

  return (
    <Transition>
      <div className={`originaux-container ${cursorClass}`}>
        <Hero title="Medium Formats Originals" className="hero-subtitle" />
        <HeroSubContent>
          <div className="top-content">
            <div className="mail-container">
              <p>
                Interested in an original artwork? They are not available for
                purchase on the site, but you can contact me via email: {""}
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
                Each original piece is unique, signed by the artist, and comes
                with a certificate of authenticity.
              </p>
            </div>
          </div>
          <div className="bottom-content">
            <div className="format">
              <div className="icon">
                <IoIosResize />
              </div>
              <p>Size 50 x 70 cm</p>
            </div>
          </div>
        </HeroSubContent>
        <motion.div className="grid-images-content" exit="exit">
          <div className="img-gallery-container">
            {data.map((imgData, id) => (
              <motion.div
                key={id}
                initial={{ y: 100 }}
                animate={{ y: 0, transition: { duration: 1 } }}
                exit="exit"
              >
                <div
                  onClick={() => handleNavigateToDetails(imgData.id)}
                  className="images-container"
                >
                  <picture>
                    <source type="image/webp" srcSet={imgData.imageUrls[0]} />
                    <img
                      loading="lazy"
                      alt={imgData.alt}
                      src={imgData.imageUrls[0]}
                    />
                  </picture>
                </div>
                <div className="image-content-originaux">
                  <div className="infos-content">
                    <div className="infos">
                      <p>{imgData.title}</p>
                      <span>|</span>
                      <p>{imgData.format}</p>
                      <span>|</span>
                      <p>{imgData.date}</p>
                    </div>
                  </div>
                  <div className="button-container">
                    <div
                      onClick={() => handleNavigateToDetails(imgData.id)}
                      className="infos-button-container"
                    >
                      <span className="infos-button">Learn More</span>
                      <div className="icon">
                        <IoIosArrowForward />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <footer>
        <Circle target={"galerie-container"} />
        <Form />
      </footer>
    </Transition>
  );
};

export default OriginauxMoyens;
