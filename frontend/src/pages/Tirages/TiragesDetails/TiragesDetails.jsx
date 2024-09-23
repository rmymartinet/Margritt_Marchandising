import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip, ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowRoundForward,
} from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Transition } from "../../../components/Animations/PageTransition/Transition.jsx";
import Breadcrumb from "../../../components/Common/Breadcrumb/Breadcrumb.jsx";
import InfoItem from "../../../components/Common/InfoItem.jsx";
import QuantitySelector from "../../../components/Common/QuantitySelector/QuantitySelector.jsx";
import { useFilteredData } from "../../../components/hook/useFilteredData.jsx";
import { useShoppingIsClickedStore } from "../../../store/useShoppingIsClickedStore.jsx";
import { useStoreShopping } from "../../../store/useStoreShopping.jsx";
import "./TiragesDetails.scss";

gsap.registerPlugin(ScrollTrigger, Flip);

const TiragesDetails = () => {
  const { id, size } = useParams();
  const navigate = useNavigate();

  const arrowRef = useRef(null);
  const titleRef = useRef(null);

  const [tempQuantity, setTempQuantity] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const cart = useStoreShopping((state) => state.cart);
  const addToCart = useStoreShopping((state) => state.addToCart);
  const setIsClicked = useShoppingIsClickedStore((state) => state.setIsClicked);

  const pricing = {
    moyen: 250,
    grand: 600,
  };

  const finalePrice = {
    moyen: tempQuantity * pricing.moyen, // Utiliser tempQuantity ici
    grand: tempQuantity * pricing.grand,
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

  // Navigation pour le carrousel
  const handleNextSlide = () => {
    setCarouselIndex(
      (prevIndex) => (prevIndex + 1) % selectedItem.imageUrls.length
    );
  };

  const handlePrevSlide = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? selectedItem.imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleEnterHovered = () => {
    const tl = gsap.timeline();
    tl.to(arrowRef.current, { x: 100, duration: 0.3, ease: "power3.inOut" })
      .set(arrowRef.current, { x: -100 })
      .to(arrowRef.current, { x: 0, duration: 0.5, ease: "power3.inOut" });
  };

  const handleAddToCart = () => {
    const numericQuantity = Number(tempQuantity); // Utiliser tempQuantity
    if (isNaN(numericQuantity) || numericQuantity <= 0) {
      console.error("Invalid quantity:", tempQuantity);
      return;
    }

    addToCart({
      id: selectedItem.id,
      title: selectedItem.title,
      price: size === "large-formats" ? pricing.grand : pricing.moyen,
      quantity: numericQuantity,
      img: selectedItem.imageUrls[0],
      format: size,
      stock: selectedItem.stock,
    });
    setIsClicked(true);
    setTempQuantity(1);
  };

  const handleAddQuantity = () => {
    if (maxValue || isActualQuantityGreaterThanStock) {
      alert("You have reached the maximum quantity available in stock.");
    } else if (tempQuantity < maxQuantity) {
      setTempQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleRemoveQuantity = () => {
    if (tempQuantity > 1) {
      setTempQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const { data, error, loading } = useFilteredData(size);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error loading data</p>;
  }
  const selectedItem = data.find((item) => item.id === id);
  const maxQuantity = selectedItem.stock;

  if (!selectedItem) {
    console.error("Item with the specified id was not found.");
    return;
  }

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

  const handleNavigateNextOriginaux = () => {
    navigate(`/prints/${size}/${nextItem.id}`);
  };

  const isActualQuantityGreaterThanStock =
    cart?.find((item) => item?.id === selectedItem.id)?.quantity >=
      (selectedItem?.stock || 0) || false;

  //savoir combien j'ai choisi de quantité
  const totalQuantityOfItem = cart.reduce(
    (total, item) =>
      selectedItem.id === item.id ? total + item.quantity : total,
    0
  );
  const totalStock = Number(selectedItem.stock);
  const totalQuantity = totalQuantityOfItem + Number(tempQuantity);
  const maxValue = totalQuantity > totalStock;

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
                <img
                  src={selectedItem.imageUrls}
                  alt="image"
                  placeholder="blur"
                />
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
                Not available for sale via the website. Contact me to discuss.
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

            <div className="stock-content">
              {parseInt(selectedItem.stock) === 0 ? (
                <p>Out of stock</p>
              ) : (
                <>
                  <p>Stock available :</p>
                  <span>
                    {selectedItem.stock}{" "}
                    {parseInt(selectedItem.stock) > 1 ? "pieces" : "piece"}
                  </span>
                </>
              )}
            </div>
            <div className="price-container">
              <div className="price">
                {isActualQuantityGreaterThanStock ? (
                  <>
                    <span>
                      Price: {size === "large-formats" ? 600 : 250}
                      ,00 €
                    </span>
                  </>
                ) : (
                  <span>
                    Price:{" "}
                    {size === "large-formats"
                      ? finalePrice["grand"]
                      : finalePrice["moyen"]}
                    ,00 €
                  </span>
                )}
              </div>
              <QuantitySelector
                quantity={tempQuantity}
                onAdd={handleAddQuantity}
                onRemove={handleRemoveQuantity}
                maxQuantity={selectedItem.stock}
                isActualQuantityGreaterThanStock={
                  isActualQuantityGreaterThanStock
                }
                maxValue={maxValue}
              />
            </div>
            <div className="buy-container">
              <span className="contact" onClick={handleAddToCart}>
                Add to Cart
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

export default TiragesDetails;
