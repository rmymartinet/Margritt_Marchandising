import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowRoundForward,
} from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Transition } from "../../../components/Animations/PageTransition/Transition.jsx";
import Breadcrumb from "../../../components/Common/Breadcrumb/Breadcrumb.jsx";
import InfoItem from "../../../components/Common/InfoItem.jsx";
import { useFilteredData } from "../../../components/hook/useFilteredData.jsx";
import "../../Tirages/TiragesDetails/TiragesDetails.scss";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

/**
 * Renders the details of a specific artwork.
 *
 * @component
 * @returns {JSX.Element} The OriginauxDetails component
 */
const OriginauxDetails = () => {
  const { t } = useTranslation();
  const arrowRef = useRef(null);
  const titleRef = useRef(null);
  const { id, size } = useParams(); // Retrieves id and size from URL
  const navigate = useNavigate();

  const [carouselIndex, setCarouselIndex] = useState(0);

  // Creates an array of images associated with the selected artwork

  useGSAP(() => {
    gsap.to(titleRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top center",
        end: "bottom 50%",
        scrub: true,
      },
    });
  });

  /*---------------
  Carousel images
  ----------------*/
  const handleNextSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % selectedItem.length);
  };

  const handlePrevSlide = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? selectedItem.length - 1 : prevIndex - 1
    );
  };

  /*---------------
  Animate arrow hover
  ----------------*/

  const handleEnterHovered = () => {
    const tl = gsap.timeline();
    tl.to(arrowRef.current, {
      x: 100,
      duration: 0.3,
      ease: "power3.inOut",
    });
    tl.set(arrowRef.current, {
      x: -100,
    });
    tl.to(arrowRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power3.inOut",
    });
  };

  const { data } = useFilteredData(size);

  const selectedItem = data.find((item) => item.id === id);

  // Trouve l'index de l'élément sélectionné
  const selectedIndex = data.findIndex((item) => item.id === id);

  // Vérifie si l'index est valide
  if (selectedIndex === -1) {
    console.error("Invalid selectedIndex. Item not found.");
    return;
  }

  // Calcule l'index suivant avec le modulo pour boucler
  const nextIndex = (selectedIndex + 1) % data.length;

  // Sélectionne l'élément suivant avec vérification
  const nextItem = data[nextIndex];

  if (!nextItem) {
    console.error("Next item is undefined.");
    return;
  }

  // Fonction pour naviguer vers l'élément suivant
  const handleNavigateNextOriginaux = () => {
    navigate(`/originals/${size}/${nextItem.id}`);
  };

  return (
    <Transition>
      <div className="details-container">
        <Breadcrumb />
        <div className="product-info">
          <div className="content-left">
            {selectedItem.imageUrls.length > 2 ? (
              <div className="side-img">
                <img
                  loading="lazy"
                  src={selectedItem.imageUrls[carouselIndex]}
                  alt="image"
                  placeholder="blur"
                />
              </div>
            ) : (
              <div>
                <div>
                  <img
                    src={selectedItem.imageUrls}
                    alt="image"
                    placeholder="blur"
                  />
                </div>
              </div>
            )}
            {selectedItem.imageUrls.length > 2 && (
              <>
                <div className="arrow-left" onClick={handlePrevSlide}>
                  <IoIosArrowBack size={40} />
                </div>
                <div className="arrow-right" onClick={handleNextSlide}>
                  <IoIosArrowForward size={40} />
                </div>
              </>
            )}
          </div>
          <div className="content-right">
            <div className="title">
              <h1>
                Series {selectedItem.serie} - {selectedItem.title}
              </h1>
              <p>
                Not available for purchase through the website. Contact me to
                discuss.
              </p>
            </div>
            <div className="details-infos">
              <InfoItem
                label="Series"
                value={selectedItem.serie}
                className="serie"
              />
              <InfoItem
                label="Year"
                value={selectedItem.date}
                className="date"
              />
              <InfoItem
                label="Piece"
                value={selectedItem.piece}
                className="piece"
              />
              <InfoItem
                label="Format"
                value={selectedItem.format}
                className="format"
              />
              <InfoItem
                label="Paper"
                value={selectedItem.papier}
                className="paper"
              />
            </div>
            <div className="buy-container">
              <span className="contact">
                <a href="mailto:votreadresse@email.com">Contactez-moi</a>
              </span>
              <div
                className="next-work"
                onMouseEnter={() => handleEnterHovered()}
                onMouseLeave={() => handleEnterHovered()}
                onClick={() => handleNavigateNextOriginaux(nextItem.id)}
              >
                <span>Next</span>
                <div className="icon-container">
                  <div className="icon" ref={arrowRef}>
                    <IoIosArrowRoundForward />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default OriginauxDetails;
