import { motion } from "framer-motion";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./InProgressImagesContainer.scss";

const InProgressImagesContainer = ({ item, isCursorPointer }) => {
  const imgContainerRef = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const images = imgContainerRef.current.children;

    // Animation des images avec GSAP pour la section In Progress
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

  const itemLength = item.map((img) => {
    return img.imageUrls.length;
  });

  const handleNextSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % itemLength);
  };

  const handlePrevSlide = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? itemLength - 1 : prevIndex - 1
    );
  };

  return (
    <motion.div className="inprogress-grid-images-content" exit="exit">
      <div ref={imgContainerRef} className="inprogress-img-gallery-container">
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
              <div className="inprogress-images-container">
                <img
                  loading="lazy"
                  className={`${isCursorPointer ? "cursor-pointer" : ""}`}
                  alt={`Image ${id + 1}`}
                  src={imgData.imageUrls[carouselIndex]}
                />
                <div className="icon-container">
                  <div className="arrow-left" onClick={handlePrevSlide}>
                    <IoIosArrowBack size={40} />
                  </div>
                  <div className="arrow-right" onClick={handleNextSlide}>
                    <IoIosArrowForward size={40} />
                  </div>
                </div>
              </div>
              {/* <div className="inprogress-image-content">
                <div className="inprogress-infos-content">
                  <div className="inprogress-infos">
                    <p>{imgData.title}</p>
                    <span>|</span>
                    <p>{imgData.format}</p>
                    <span>|</span>
                    <p>{imgData.date}</p>
                  </div>
                </div>
              </div> */}
            </motion.div>
          ))
        ) : (
          <p>Aucune image disponible</p>
        )}
      </div>
    </motion.div>
  );
};

InProgressImagesContainer.displayName = "InProgressImagesContainer";

export default InProgressImagesContainer;
