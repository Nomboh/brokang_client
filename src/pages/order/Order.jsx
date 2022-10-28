import React, { useEffect, useState } from "react";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Footer from "../../components/footer/Footer";
import Upbar from "../../components/upbar/Upbar";
import { useProduct } from "../../context/productContext";
import Mmenu from "../../mobile/mmenu/Mmenu";
import Mtop from "../../mobile/mUpbar/Mtop";
import "./order.css";
import SearchAddress from "./SearchAddress";
import paymentMethods from "../../utils/paymentMethods";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/auth/AuthContext";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useFetch from "../../hooks/useFetch";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

function Order() {
  const { currentProduct, stripePromise, setCurrentProduct } = useProduct();
  const { user } = useAuth();

  const navigate = useNavigate();

  const { id } = useParams();

  const { data: buyProduct } = useFetch(`/product/${id}`);

  useEffect(() => {
    if (!currentProduct && buyProduct) {
      setCurrentProduct(buyProduct.product);
    }
  }, [currentProduct, buyProduct, setCurrentProduct]);

  const stripe = useStripe();
  const elements = useElements();

  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [card, setCard] = useState(null);
  const [cardName, setCardName] = useState("choose a saved card");

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#e95e51",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  const handlePayMethod = (e, i) => {
    setIndex(i);
  };

  const makePayment = async () => {
    if (index === 2) {
      const { data } = await axiosInstance().post(
        "/stripe/create-payment-intent",
        {
          item: currentProduct,
          description: `Payment intent for ${currentProduct?.name}`,
          receipt_email: user.email,
          shipping: {
            address: {
              line1: address.split(",")[0],
              city: address.split(",")[3],
              country: address.split(",")[-1],
            },
            name: name || user.name,
            phone: contact || user.phone,
          },
        }
      );

      setClientSecret(data.clientSecret);
    }
  };

  const payWithSaved = async () => {
    try {
      const { data } = await axiosInstance().post("/stripe/saved-intent", {
        item: currentProduct,
        description: `Payment intent for ${currentProduct?.name}`,
        receipt_email: user.email,
        payment_method_id: card,
        shipping: {
          address: {
            line1: address.split(",")[0],
            city: address.split(",")[3],
            country: address.split(",")[-1],
          },
          name: user.name,
          phone: user.phone,
        },
      });

      if (data.id) {
        navigate(
          `/success?payment_intent=${data.id}&payment_intent_client_secret=${data.clientSecret}`
        );
      }
    } catch (error) {
      setActive(false);
      console.log(error);
    }
  };

  const { data } = useFetch("/stripe/get-payment-methods");

  const handleSelect = async item => {
    setCard(item.id);
    setCardName(
      `**** **** **** ${item.card.last4}/${item.card.exp_month}/${item.card.exp_year}`
    );

    setActive(false);
  };

  const renderSavedCards = () => {
    return (
      <div className="select_wrapper">
        <h3 className="order_header">Pay with saved cards</h3>
        <div className="select_main" onClick={() => setActive(!active)}>
          {cardName}
          {active ? <KeyboardArrowRight /> : <KeyboardArrowDown />}
        </div>

        <div
          className={
            active
              ? "select_item_wrapper select_item_wrapper_active"
              : "select_item_wrapper"
          }
        >
          {data?.map(item => (
            <div
              key={item.id}
              className="select_item"
              onClick={() => handleSelect(item)}
            >{`brand=${item.card.brand}, expire month=${item.card.exp_month}, expire year=${item.card.exp_year}, card number=**** **** *** ${item.card.last4}`}</div>
          ))}
        </div>
        {card && (
          <button
            disabled={!address || !stripe || !elements}
            className="checkout_btn checkout_btn_big"
            onClick={payWithSaved}
          >
            PAY WITH SAVED CARDS
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <Upbar />
      <Bellowbar />
      <Mtop />
      <Mmenu />
      <div className="order_container">
        <h2 className="order_header">Order Sheet</h2>
        <div className="order_details">
          <div className="od_left">
            <img
              src={currentProduct?.images}
              alt={currentProduct?.name}
              className="img_order"
            />
          </div>

          <div className="od_right">
            <p className="order_title">{currentProduct?.name}</p>
            <p className="order_price">
              {currentProduct?.price.toLocaleString()} <span>won</span>
            </p>
            <p className="od_shipping">
              Delivery Fee: {currentProduct?.shipping[0].deliveryFee} won
            </p>
          </div>
        </div>

        <div className="os_Wrapper">
          <h3 className="order_header">Shipping Address</h3>

          <div className="order_form">
            <div className="order_group">
              <label htmlFor="name" className="order_label">
                Name
              </label>

              <div className="order_input_wrapper">
                <input
                  placeholder="Enter your name"
                  name="name"
                  type="text"
                  className="order_input"
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="order_group">
              <label htmlFor="contact" className="order_label">
                Contact
              </label>

              <div className="order_input_wrapper">
                <input
                  name="contact"
                  placeholder="Enter only numbers"
                  type="number"
                  className="order_input"
                  onChange={e => setContact(e.target.value)}
                />
              </div>
            </div>

            <div className="order_group">
              <label htmlFor="contact" className="order_label">
                Address <span>*</span>
              </label>

              <div className="order_input_wrapper">
                <SearchAddress setAddress={setAddress} />

                <span>{address ? "" : "* address field is required"} </span>
              </div>
            </div>
          </div>
        </div>

        {data?.length > 0 && renderSavedCards()}

        <div className="op_wrapper">
          <div className="op_left">
            <h3 className="order_header order_header_left">Payment Methods</h3>
            <div className="op_methods_wrapper">
              {paymentMethods.map((pm, i) => (
                <div
                  key={pm.id}
                  className={
                    index === i ? "op_method op_method_active" : "op_method"
                  }
                  onClick={() => handlePayMethod(pm.name, i)}
                >
                  <span>{pm.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="op_right">
            <h3 className="order_header">Payment Summary</h3>
            <div className="op_ummary">
              <div className="op_summary_wrapper">
                <div className="summary_item">
                  <p className="summary_name">product price</p>
                  <p className="summary_value">
                    {currentProduct?.price.toLocaleString()} won
                  </p>
                </div>

                <div className="summary_item">
                  <p className="summary_name">delivery fee</p>
                  <p className="summary_value">
                    {currentProduct?.shipping[0].deliveryFee} won
                  </p>
                </div>

                <div className="summary_item">
                  <p className="summary_name">payment fee</p>
                  <p className="summary_value">
                    {paymentMethods[index].price} won
                  </p>
                </div>

                <div className="os_line"></div>

                <div className="summary_item">
                  <p className="summary_name">total</p>
                  <p className="summary_total">
                    {(
                      paymentMethods[index].price +
                      parseInt(currentProduct?.shipping[0].deliveryFee) +
                      currentProduct?.price
                    ).toLocaleString()}{" "}
                    won
                  </p>
                </div>
              </div>
              <button
                disabled={!(!!name && !!contact && !!address)}
                onClick={makePayment}
                className="op_summary_btn"
              >
                make a payment
              </button>
            </div>
          </div>
        </div>

        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Order;
