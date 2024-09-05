import { motion } from "framer-motion";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

const ImagesContainer = ({ item, isCursorPointer }) => {
  const imgContainerRef = useRef(null);

  return (
    <motion.div className="grid-images-content" exit="exit">
      <div ref={imgContainerRef} className="img-gallery-container">
        {item.map((imgData, id) => {
          return (
            <motion.div
              className={`grid-img${id} img`}
              key={id}
              initial={{ y: 100, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 1.5,
                },
              }}
              exit="exit"
            >
              <div className="images-container">
                <picture>
                  <source type="image/webp" srcSet={imgData.imgWebp} />
                  <img
                    loading="lazy"
                    className={`${isCursorPointer ? "cursor-pointer" : ""}`}
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
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

ImagesContainer.displayName = "ImagesContainer";

export default ImagesContainer;
