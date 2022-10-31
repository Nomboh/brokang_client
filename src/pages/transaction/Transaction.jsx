import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Footer from "../../components/footer/Footer";
import Upbar from "../../components/upbar/Upbar";
import { useAuth } from "../../context/auth/AuthContext";
import useFetch from "../../hooks/useFetch";
import Mmenu from "../../mobile/mmenu/Mmenu";
import Mtop from "../../mobile/mUpbar/Mtop";
import axiosInstance from "../../utils/axiosInstance";
import { truncate } from "../../utils/helper";
import "./transaction.css";

function Transaction() {
  const [transaction, setTransaction] = useState("");
  const [show, setShow] = useState(false);
  const { user } = useAuth();

  const { data } = useFetch("/order/get-orders/" + user._id);

  const navigate = useNavigate();

  const handleContact = sellerId => async () => {
    try {
      const { data } = await axiosInstance().post("conversation", {
        userId: sellerId,
      });

      if (data.status === "success") {
        navigate("/chat?conversation=" + data.conversation._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShow = trandId => {
    setShow(!show);
    setTransaction(trandId);
  };

  return (
    <div className="container">
      <Upbar />
      <Bellowbar />
      <Mmenu />
      <Mtop />
      <div className="transaction_container">
        <h1 className="transaction_heading">Transaction Details</h1>
        <div className="order_container_tran">
          {data && data.length > 0 ? (
            data.map(tran => (
              <div key={tran._id} className="order_main">
                <div className="order_main_left">
                  <div className="order_header">
                    <h3 className="order_status">
                      Payment {tran.deliveryStatus}
                    </h3>
                    <h3 className="order_date">
                      {moment(tran.createdAt).format("MMMM Do YYYY")}
                    </h3>
                    <h3 className="order_date_sm">
                      {moment(tran.createdAt).format("L")}
                    </h3>
                  </div>

                  <div className="order_content">
                    <div className="order_left">
                      <img src={tran.image} alt="products" />
                    </div>
                    <div className="order_right">
                      <p className="order_des">{tran.description}</p>
                      <p className="order_des_sm">
                        {truncate(
                          tran.description
                            .split("Payment intent for ")
                            .join(""),
                          13
                        )}
                      </p>
                      <p className="order_price_t">
                        {tran.price.toLocaleString()} WON
                      </p>
                      <div className="tran_btn_wrapper">
                        <button
                          className="btn_order_chat"
                          onClick={handleContact(tran.sellerId)}
                        >
                          Contact seller
                        </button>

                        <button
                          className="btn_order_chat btn_order_more"
                          onClick={() => handleShow(tran._id)}
                        >
                          {transaction === tran._id && show
                            ? "hide details"
                            : "show details"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order_main_right">
                  <h3 className="payment_header">Recipient Information</h3>

                  <div className="payment_wrapper">
                    <div className="payment_left">
                      <div className="payment_name">Recipient</div>
                    </div>
                    <div className="payment_right">
                      <div className="payment_value">{tran.shipping?.name}</div>
                    </div>
                  </div>

                  <div className="payment_wrapper">
                    <div className="payment_left">
                      <div className="payment_name">Order Id</div>
                    </div>
                    <div className="payment_right">
                      <div className="payment_value">{tran._id}</div>
                    </div>
                  </div>

                  <div className="payment_wrapper">
                    <div className="payment_left">
                      <div className="payment_name">Contact</div>
                    </div>
                    <div className="payment_right">
                      <div className="payment_value">{tran.shipping.phone}</div>
                    </div>
                  </div>

                  <div className="payment_wrapper">
                    <div className="payment_left">
                      <div className="payment_name">Address</div>
                    </div>
                    <div className="payment_right">
                      <div className="payment_value">{`${tran.shipping.address.line1} ${tran.shipping.address.line2}`}</div>
                    </div>
                  </div>

                  <div className="payment_wrapper">
                    <div className="payment_left">
                      <div className="payment_name">Card</div>
                    </div>
                    <div className="payment_right">
                      <div className="payment_value">{`brand : ${tran.brand} / last 4 degit: ${tran.last4}`}</div>
                    </div>
                  </div>
                </div>

                {transaction === tran._id && show ? (
                  <div className="order_main_right  order_main_right_sm">
                    <h3 className="payment_header">Recipient Information</h3>

                    <div className="payment_wrapper">
                      <div className="payment_left">
                        <div className="payment_name">Recipient</div>
                      </div>
                      <div className="payment_right">
                        <div className="payment_value">
                          {tran.shipping?.name}
                        </div>
                      </div>
                    </div>

                    <div className="payment_wrapper">
                      <div className="payment_left">
                        <div className="payment_name">Order Id</div>
                      </div>
                      <div className="payment_right">
                        <div className="payment_value">{tran._id}</div>
                      </div>
                    </div>

                    <div className="payment_wrapper">
                      <div className="payment_left">
                        <div className="payment_name">Contact</div>
                      </div>
                      <div className="payment_right">
                        <div className="payment_value">
                          {tran.shipping.phone}
                        </div>
                      </div>
                    </div>

                    <div className="payment_wrapper">
                      <div className="payment_left">
                        <div className="payment_name">Address</div>
                      </div>
                      <div className="payment_right">
                        <div className="payment_value">{`${tran.shipping.address.line1} ${tran.shipping.address.line2}`}</div>
                      </div>
                    </div>

                    <div className="payment_wrapper">
                      <div className="payment_left">
                        <div className="payment_name">Card</div>
                      </div>
                      <div className="payment_right">
                        <div className="payment_value">{`brand : ${tran.brand} / last 4 degit: ${tran.last4}`}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))
          ) : (
            <h1 className="no_trans">You have no transactions</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Transaction;
