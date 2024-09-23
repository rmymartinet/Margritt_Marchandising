import React from "react";
import { GiCancel } from "react-icons/gi";
import "./PaymentCancel.scss"; // Assurez-vous que le chemin est correct

const PaymentCancel = () => {
  return (
    <main className="payment-cancel-container">
      <div className="payment-cancel-content">
        <div>
          <GiCancel size={40} />
        </div>
        <div className="payment-cancel-text">
          <h1 className="payment-cancel-title">Payment Cancelled</h1>
          <span className="payment-cancel-subtitle">
            Your payment has been cancelled. If you have any questions, please
            contact support.
          </span>
        </div>
        <div className="button-container">
          <a href="http://localhost:5173/" className="home-button">
            Go to Homepage
          </a>
        </div>
      </div>
    </main>
  );
};

export default PaymentCancel;
