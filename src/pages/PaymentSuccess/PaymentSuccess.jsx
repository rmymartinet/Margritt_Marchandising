import React, { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useStoreShopping } from "../../store/useStoreShopping";
import "./PaymentSuccess.scss";

const PaymentSuccess = () => {
  const [sessionId, setSessionId] = useState(null);
  const [paymentVerified, setPaymentVerified] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    setSessionId(sessionId);
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetch(`http://localhost:4242/verify-payment/${sessionId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setPaymentVerified(true);
          } else {
            setPaymentVerified(false);
          }
        })
        .catch((error) => {
          console.error("Error verifying payment:", error);
          setPaymentVerified(false);
        });
    }
  }, [sessionId]);

  useEffect(() => {
    if (paymentVerified !== null) {
      const redirectTimer = setTimeout(() => {
        if (paymentVerified) {
          window.location.href = "http://localhost:5173/";
        }
      }, 20000);

      return () => clearTimeout(redirectTimer);
    }
  }, [paymentVerified]);

  const { cart, setCart } = useStoreShopping((state) => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
  }));

  useEffect(() => {
    if (paymentVerified && cart.length > 0) {
      Promise.all(
        cart.map((item) =>
          fetch(`http://localhost:4242/api/originals/${item.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity }),
          })
            .then((response) => response.json())
            .catch((error) => {
              console.error("Error updating stock:", error);
            })
        )
      ).then(() => {
        useStoreShopping.getState().updateCart([]);
      });
    }
  }, [paymentVerified, cart, setCart]);

  return (
    <main className="payment-success-container">
      <div className="payment-success-content">
        {paymentVerified === null && (
          <div>
            <h1>Payment Verification in Progress...</h1>
            <p>We are checking the status of your payment. Please wait.</p>
          </div>
        )}
        {paymentVerified === true && (
          <>
            <div>
              <FaRegCircleCheck size={40} />
            </div>
            <div className="payment-success-text">
              <h1 className="payment-success-title">Payment Successful!</h1>
              <span className="payment-success-subtitle">
                Your payment has been completed. You will be redirected shortly.
              </span>
            </div>
            <div className="redirection-link">
              <p>You will be redirected to the homepage in a few seconds.</p>
            </div>
          </>
        )}
        {paymentVerified === false && (
          <div>
            <h1>Payment Verification Failed</h1>
            <p>There was an issue verifying your payment. Please try again.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default PaymentSuccess;
