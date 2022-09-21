import Close from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import React, { useState } from "react";
import { CREATE_ACTION_TYPES } from "../../context/CreateProduct/formAction";

function Shipping({ open, setOpen, dispatch }) {
  const [fee, setFee] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState("");

  const handleClose = e => {
    e.preventDefault();
    setOpen(false);
  };
  const handleShipping = e => {
    e.preventDefault();
    let shippingMethod;
    let burden;
    if (deliveryFee === "2900") {
      shippingMethod = "Brokang Courier";
      burden = "seller";
    } else if (deliveryFee === "free Shipping") {
      shippingMethod = "Brokang Courier";
      burden = "buyer";
    } else {
      shippingMethod = "Other Services";
      burden = "buyer";
    }

    dispatch({
      type: CREATE_ACTION_TYPES.ADD_SHIPPING,
      payload: { deliveryFee, shippingMethod, burden },
    });

    setOpen(false);
  };

  const handleChange = e => {
    setDeliveryFee(e.target.value);
  };
  return (
    <Modal className="sp_modal" open={open} onClose={handleClose}>
      <div className="shipping_modal">
        <h2 className="shipping_title">Shipping Method</h2>
        <Close
          className="shipping_close"
          onClick={() => setOpen(false)}
          color="action"
          sx={{ cursor: "pointer" }}
        />

        <div className="shipping_wrapper">
          <div className="sp_group">
            <input
              className="sp_radio"
              type="radio"
              name="shipping"
              id="free_shipping"
              value={"free Shipping"}
              onChange={handleChange}
            />
            <div className="sp_radio_wrapper">
              <label htmlFor="free_shipping" className="sp_label">
                <span className="sp_custom_btn"></span>
                Free Shipping
              </label>
              <p className="sp_free ">Shipping cost is paid by the seller</p>
            </div>
          </div>

          <div className="sp_group">
            <input
              className="sp_radio"
              type="radio"
              name="shipping"
              id="brokang_shipping"
              value={2900}
              onChange={handleChange}
            />
            <div className="sp_radio_wrapper">
              <label htmlFor="brokang_shipping" className="sp_label">
                <span className="sp_custom_btn"></span>
                Brokang Shipping
              </label>

              <p className="sp_free ">
                Shipping cost is paid by the buyer (2900 won)
              </p>
            </div>
          </div>

          <div className="sp_group">
            <input
              className="sp_radio"
              type="radio"
              name="shipping"
              id="paid_shipping"
              value={fee}
              onChange={handleChange}
            />
            <div className="sp_radio_wrapper">
              <label htmlFor="paid_shipping" className="sp_label">
                <span className="sp_custom_btn"></span>
                Paid Shipping
              </label>

              <p className="sp_free ">Shipping cost is paid by the buyer</p>

              <div className="sell_inputs_wrapper sp_input">
                <input
                  className="sell_text_input sell_text_sm"
                  placeholder="Enter the shipping cost"
                  type="number"
                  onChange={e => setFee(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button className="sp_btn" onClick={handleShipping}>
            Selection Complete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default Shipping;
