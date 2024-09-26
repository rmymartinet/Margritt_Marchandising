import { motion } from "framer-motion";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

const ImagesContainer = ({ item, isCursorPointer }) => {
  const imgContainerRef = useRef(null);

  useEffect(() => {
    const images = imgContainerRef.current.children;

    // Animation des images avec GSAP
    gsap.set(images, {
      clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
      y: 100,
      opacity: 0,
    });

    gsap.to(images, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.inOut",
    });
  }, [item]);

  return (
    <motion.div className="grid-images-content" exit="exit">
      <div ref={imgContainerRef} className="img-gallery-container">
        {item.length > 0 ? (
          item.map((imgData, id) => (
            <motion.div
              key={id}
              initial={{ y: 100, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 1.5 },
              }}
              exit="exit"
            >
              {/* Boucle sur les images dans imgData.images */}
              <div className="images-container">
                {imgData.images.map((imageSrc, imgIndex) => (
                  <picture key={imgIndex}>
                    <source type="image/webp" srcSet={imageSrc} />
                    <img
                      loading="lazy"
                      className={`${isCursorPointer ? "cursor-pointer" : ""}`}
                      alt={`Image ${imgIndex + 1}`}
                      src={imageSrc}
                    />
                  </picture>
                ))}
              </div>
              <div className="image-content">
                <div className="infos-content">
                  <div className="infos">
                    <p>{imgData.title}</p>
                    <span>|</span>
                    <p>{imgData.format}</p>
                    <span>|</span>
                    <p>{imgData.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p>Aucune image disponible</p>
        )}
      </div>
    </motion.div>
  );
};

ImagesContainer.displayName = "ImagesContainer";

export default ImagesContainer;
