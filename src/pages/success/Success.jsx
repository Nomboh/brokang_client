import React, { useEffect, useState } from "react";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Footer from "../../components/footer/Footer";
import Upbar from "../../components/upbar/Upbar";
import Mmenu from "../../mobile/mmenu/Mmenu";
import Mtop from "../../mobile/mUpbar/Mtop";
import "./success.css";
import { useStripe } from "@stripe/react-stripe-js";

function Success() {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <div className="container">
      <Upbar />
      <Bellowbar />
      <Mtop />
      <Mmenu />
      <div className="success_container">
        <h1>{message}</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Success;
