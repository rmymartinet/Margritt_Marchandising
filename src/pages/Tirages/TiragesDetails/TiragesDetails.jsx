import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo, useRef, useState } from "react";
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
import { originauxData } from "../../../data/data.js";
import "./TiragesDetails.scss";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

/**
 * Renders the details of a specific artwork.
 *
 * @component
 * @returns {JSX.Element} The OriginauxDetails component
 */
const TiragesDetails = () => {
  const { t } = useTranslation();
  const arrowRef = useRef(null);
  const titleRef = useRef(null);
  const { id, size } = useParams(); // Récupère id et size depuis l'URL
  const navigate = useNavigate();

  // Filtre les œuvres selon la taille spécifiée
  const tiragesFiltered = originauxData.filter((item) => {
    return item.dimension === size;
  });

  // Trouve l'œuvre sélectionnée par son id
  const selectedImage = tiragesFiltered.find((item) => item.id === Number(id));

  const currentIndex = tiragesFiltered.findIndex(
    (item) => item.id === Number(id)
  );

  if (!selectedImage || currentIndex === -1) {
    return <div>Œuvre non trouvée</div>;
  }

  const nextIndex = (currentIndex + 1) % tiragesFiltered.length;
  const nextItem = tiragesFiltered[nextIndex];
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Créer un tableau des images associées à l'œuvre sélectionnée
  const pictures = [
    { src: selectedImage.imgWebp },
    { src: selectedImage.img1 },
    { src: selectedImage.img2 },
    { src: selectedImage.img3 },
    { src: selectedImage.img4 },
  ].filter((picture) => picture.src); // Filtrer les images non définies

  const allImages = useMemo(() => {
    return Object.keys(selectedImage).filter((key) => key.includes("img"));
  }, [selectedImage]);

  /*---------------
  Navigate to next item
  ---------------- */
  const handleNavigateNextOriginaux = (nextId) => {
    navigate(`/originaux/${size}/${nextId}`); // Conserve `size` dans l'URL
  };

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
  const handleNextSLide = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % pictures.length);
  };

  const handlePrevSLide = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? pictures.length - 1 : prevIndex - 1
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

  return (
    <Transition>
      <div className="orignaux-container">
        <Breadcrumb />
        <div className="product-info">
          <div className="content-left">
            {allImages.length > 2
              ? pictures.map((picture, index) => (
                  <div key={index} className="side-img">
                    <img
                      loading="lazy"
                      src={pictures[carouselIndex].src}
                      alt="image"
                      placeholder="blur"
                    />
                  </div>
                ))
              : pictures.slice(0, 1).map(({ src }, index) => (
                  <div key={index}>
                    <div>
                      <img src={src} alt="image" placeholder="blur" />
                    </div>
                  </div>
                ))}
            {allImages.length > 2 && (
              <>
                <div className="arrow-left" onClick={handlePrevSLide}>
                  <IoIosArrowBack size={40} />
                </div>
                <div className="arrow-right" onClick={handleNextSLide}>
                  <IoIosArrowForward size={40} />
                </div>
              </>
            )}
          </div>
          <div className="content-right">
            <div className="title">
              <h1>
                Série {selectedImage.serie} - {selectedImage.title}
              </h1>
              <p>
                Indisponible à la vente via le site. Me contacter pour en
                discuter.
              </p>
            </div>
            <div className="details-infos">
              <InfoItem
                label="Serie"
                value={selectedImage.serie}
                className="serie"
              />
              <InfoItem
                label="Année"
                value={selectedImage.date}
                className="date"
              />
              <InfoItem
                label={t("originauxDetails.piece")}
                value={selectedImage.piece}
                className="piece"
              />
              <InfoItem
                label="Format"
                value={selectedImage.format}
                className="format"
              />
              <InfoItem
                label={t("originauxDetails.paper")}
                value={selectedImage.papier}
                className="paper"
              />
            </div>
            {/* 
            <div className="livraison">
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Livraison</th>
                      <th>France</th>
                      <th>Europe</th>
                      <th>International</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>5 à 10 jours</td>
                      <td>2 à 3 semaines</td>
                      <td>3 à 4 semaines</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
            <div className="buy-container">
              <span className="contact">Acheter</span>
              <div
                className="next-work"
                onMouseEnter={() => handleEnterHovered()}
                onMouseLeave={() => handleEnterHovered()}
                onClick={() => handleNavigateNextOriginaux(nextItem.id)}
              >
                <span>Suivant</span>
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

export default TiragesDetails;
