import { useEffect, useState } from "react";
import { Transition } from "../../components/Animations/PageTransition/Transition";
import QuantitySelector from "../../components/Common/QuantitySelector/QuantitySelector";
import { useStoreShopping } from "../../store/useStoreShopping";
import "./Checkout.scss";

const Checkout = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  const handleProcedToPayment = async () => {
    try {
      const response = await fetch(
        "http://localhost:4242/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmount,
            productName: "Produit Exemple",
          }),
        }
      );

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirection vers Stripe Checkout
      }
    } catch (error) {}
  };

  /*---------------
  Quantity
  ----------------*/
  const { cart, removeFromCart, updateCart } = useStoreShopping((state) => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
    updateCart: state.updateCart,
  }));

  const handleAddQuantity = (item) => {
    if (item.quantity < item.stock) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      updateCart(updatedCart);
    }
  };

  const handleRemoveQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        const newQuantity = cartItem.quantity - 1;
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    updateCart(updatedCart);
  };

  const deliveryCost = 20;

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
  const totalWithDelivery = totalWithoutDelivery + deliveryCost;

  useEffect(() => {
    setTotalAmount(totalWithDelivery);
  }, [totalWithDelivery]);

  return (
    <Transition>
      <div className="checkout-container">
        <div className="checkout-content">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  className="product-image"
                  src={item.img}
                  alt={item.title}
                />
                <div className="product-details">
                  <h3 className="product-title">{item.title}</h3>
                  <p className="price">Price : {item.price},00 €</p>
                  <QuantitySelector
                    quantity={item.quantity}
                    onAdd={() => handleAddQuantity(item)}
                    onRemove={() => handleRemoveQuantity(item)}
                    maxQuantity={item.stock}
                  />
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
        <div className="payment-button-container">
          <div className="total">
            <p>Shipping fees: €20.00</p>
            <span>Total: {totalWithDelivery},00 €</span>
          </div>
          <div className="button">
            <p
              onClick={() => handleProcedToPayment()}
              className="payment-button"
            >
              Payment
            </p>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Checkout;
