import React, { useEffect, useState } from "react";
import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { CircularProgress } from "@mui/material";

function CheckoutForm({ handleChange }) {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured");
    }

    setIsLoading(false);
  };

  return (
    <form className="checkout_form" id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <div className="check_wrapper">
        <input
          type={"checkbox"}
          className="checkbox"
          id="checkbox"
          onChange={handleChange}
        />

        <label htmlFor="checkbox" className="checkbox_label">
          Save this card
        </label>
      </div>
      <button
        disabled={isLoading || !stripe || !elements}
        className="checkout_btn"
      >
        {isLoading ? (
          <CircularProgress
            size={"20px"}
            sx={{ height: "20px", width: "20px" }}
          />
        ) : (
          "PAY NOW"
        )}
      </button>
      {message && <div className="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutForm;
