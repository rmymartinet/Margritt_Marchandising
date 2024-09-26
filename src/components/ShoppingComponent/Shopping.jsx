import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useShoppingIsClickedStore } from "../../store/useShoppingIsClickedStore";
import { useStoreShopping } from "../../store/useStoreShopping";
import "./Shopping.scss";

const Shopping = ({ locomotiveScroll }) => {
  const { cart, removeFromCart } = useStoreShopping((state) => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
  }));

  const totalWithoutDelivery = cart.reduce((total, item) => {
    const itemPrice =
      parseFloat(
        String(item.price)
          .replace(",", ".")
          .replace(/[^\d.-]/g, "")
      ) || 0;

    const itemQuantity = Number(item.quantity) || 0;
    return total + itemPrice * itemQuantity;
  }, 0);

  const deliveryCost = 20;
  const totalWithDelivery = totalWithoutDelivery + deliveryCost;
  const formattedTotalWithoutDelivery = totalWithoutDelivery.toFixed(2);
  const formattedTotalWithDelivery = totalWithDelivery.toFixed(2);
  const isClicked = useShoppingIsClickedStore((state) => state.isClicked);
  const setIsClicked = useShoppingIsClickedStore((state) => state.setIsClicked);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.to(".shopping-container", {
      x: isClicked ? "0%" : "200%",
      duration: 0.5,
      ease: "power3.out",
    });
  }, [isClicked]);

  const handleCloseClick = () => {
    setIsClicked(false);
    if (locomotiveScroll) locomotiveScroll.start();
    document.body.style.overflow = "auto";
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    if (isClicked) {
      if (locomotiveScroll) {
        locomotiveScroll.stop(); // Stopper Locomotive Scroll lorsque le shopping cart s'ouvre
      }
      document.body.style.overflow = "hidden"; // Désactiver le scroll global de la page
    } else {
      if (locomotiveScroll) {
        locomotiveScroll.start(); // Reprendre Locomotive Scroll à la fermeture du shopping cart
      }
      document.body.style.overflow = "auto"; // Réactiver le scroll global de la page
    }
  }, [isClicked, locomotiveScroll]);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleWheel = (event) => {
      if (isClicked) {
        event.stopPropagation(); // Empêcher la propagation du scroll à Locomotive Scroll
      }
    };

    const shoppingContainer = document.querySelector(".shopping-container");
    if (shoppingContainer) {
      shoppingContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (shoppingContainer) {
        shoppingContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isClicked]);

  return (
    <div className="shopping-container" onWheel={stopPropagation}>
      <div className="close-icon">
        <IoClose
          onClick={() => {
            handleCloseClick();
          }}
          size={20}
        />
      </div>

      <div className="shopping-cart-container" onWheel={stopPropagation}>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img className="product-image" src={item.img} alt={item.title} />
              <div className="product-details">
                <h3 className="product-title">{item.title}</h3>
                <p className="price">{item.price} €</p>
                <p className="quantity">Quantity : {item.quantity}</p>
              </div>
              <p
                className="delete-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </p>
            </div>
          ))
        ) : (
          <div className="empty-basket">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>
      <div className="order-summary">
        <div className="summary-row">
          <p>ORDER VALUE</p>
          <p>{formattedTotalWithoutDelivery} €</p>
        </div>
        <div className="summary-row">
          <p>DELIVERY</p>
          <p>{deliveryCost.toFixed(2)} €</p>
        </div>
        <div className="summary-row total">
          <p>Total order:</p>
          <p>{formattedTotalWithDelivery} €</p>
        </div>
        {/* <button className="confirm-button">CONFIRMER LA COMMANDE</button> */}
        <button
          onClick={() => {
            handleCheckout();
            handleCloseClick();
          }}
          className="cart-button"
        >
          basket
        </button>
      </div>
    </div>
  );
};

export default Shopping;
