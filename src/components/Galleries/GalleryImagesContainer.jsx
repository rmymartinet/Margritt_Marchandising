import { motion } from "framer-motion";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import "./GalleryImagesContainer.scss";

const GalleryImagesContainer = ({ item, isCursorPointer }) => {
  const imgContainerRef = useRef(null);

  console.log(item);

  useEffect(() => {
    const images = imgContainerRef.current.children;

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
    <motion.div className="gallery-grid-images-content" exit="exit">
      <div ref={imgContainerRef} className="gallery-img-gallery-container">
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
              <div className="gallery-images-container">
                {imgData.imageUrls.map((imageSrc, imgIndex) => (
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
              <div className="gallery-image-content">
                <div className="gallery-infos-content">
                  <div className="gallery-infos">
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
          <p>No image available.</p>
        )}
      </div>
    </motion.div>
  );
};

GalleryImagesContainer.displayName = "GalleryImagesContainer";

export default GalleryImagesContainer;
