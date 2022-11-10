import "./sell.css";

import Upbar from "../../components/upbar/Upbar";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Footer from "../../components/footer/Footer";
import MMenu from "../../mobile/mmenu/Mmenu";

import React, { useEffect, useReducer, useState } from "react";
import Mtop from "../../mobile/mUpbar/Mtop";
import SellCategory from "./SellCategory";
import SellImages from "./SellImages";
import TagIcon from "@mui/icons-material/Tag";
import CloseIcon from "@mui/icons-material/Close";
import Shipping from "./Shipping";
import useFirestore from "../../utils/useFirestore";
import {
  createFormReducer,
  initialState,
} from "../../context/CreateProduct/formReducer";
import { CREATE_ACTION_TYPES } from "../../context/CreateProduct/formAction";
import { Link } from "react-router-dom";
import deleteDocuments from "../../utils/deleteDocuments";
import { useAuth } from "../../context/auth/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";

function Sell() {
  const [open, setOpen] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [catI, setCatI] = useState(-1);
  const [subI, setSubI] = useState(-1);
  const [tag, setTag] = useState("");
  const imgDoc = useFirestore();

  const { user } = useAuth();

  const [state, dispatch] = useReducer(createFormReducer, initialState);

  const handleTag = e => {
    e.preventDefault();

    if (tag) {
      dispatch({ type: CREATE_ACTION_TYPES.ADD_TAG, payload: tag });
    }

    setTag("");
  };

  useEffect(() => {
    dispatch({ type: CREATE_ACTION_TYPES.ADD_USERID, payload: user._id });
  }, [dispatch, user._id]);

  const handleStatus = (e, type, index) => {
    e.preventDefault();
    setStatusIndex(index);
    dispatch({ type: CREATE_ACTION_TYPES.ADD_STATUS, payload: type });
  };

  const handleInputs = e => {
    e.preventDefault();
    dispatch({
      type: CREATE_ACTION_TYPES.ADD_INPUTS,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axiosInstance().post("/product", state);
      if (res.data.status === "success") {
        toast("Product creation completed successfully", {
          type: "success",
          position: "top-center",
          closeOnClick: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message, {
        type: "error",
        position: "top-center",
        closeOnClick: true,
      });
    }

    imgDoc.forEach(item => {
      deleteDocuments("product_images", item.id);
    });
    setStatusIndex(0);
    dispatch({ type: CREATE_ACTION_TYPES.RESET_ITEMS });
    setCatI(-1);
    setSubI(-1);
  };
  return (
    <div className="container">
      <Upbar />
      <Bellowbar />
      <Mtop />
      <MMenu />
      <div className="sell_container">
        <ToastContainer />
        <div className="sell_heading">
          <h1 className="sell_title">Register Your Goods</h1>
          <p className="sell_required">
            <span>*</span> please fill the requird fields
          </p>
        </div>

        <form className="sell_form">
          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="images">
                Product Images <span>*</span>
              </label>
              <span className="label_span">({imgDoc?.length} / 12)</span>
            </div>
            <div className="sell_inputs_wrapper">
              <SellImages state={state} dispatch={dispatch} imgUrls={imgDoc} />
            </div>
          </div>

          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="name">
                Product Title <span>*</span>
              </label>
            </div>
            <div className="sell_inputs_wrapper">
              <input
                className="sell_text_input"
                placeholder="Enter the product title"
                type="text"
                name="name"
                id="name"
                value={state.name}
                onChange={handleInputs}
              />
            </div>
          </div>

          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="name">
                Product Category <span>*</span>
              </label>
            </div>
            <div className="sell_inputs_wrapper">
              <SellCategory
                catI={catI}
                setCatI={setCatI}
                subI={subI}
                setSubI={setSubI}
                dispatch={dispatch}
              />
            </div>
          </div>

          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="name">
                Product Condition <span>*</span>
              </label>
            </div>
            <div className="sell_inputs_wrapper">
              <div className="pc_sell">
                <h3 className="pc_sell_title">
                  Please select the condition of the product to be sold
                </h3>
                <div className="pc_sell_wrapper">
                  <button
                    onClick={e => handleStatus(e, "new", 1)}
                    className={
                      statusIndex === 1
                        ? "pc_sell_item pc_active"
                        : "pc_sell_item"
                    }
                  >
                    New
                  </button>
                  <button
                    onClick={e => handleStatus(e, "semiused", 2)}
                    className={
                      statusIndex === 2
                        ? "pc_sell_item pc_active"
                        : "pc_sell_item"
                    }
                  >
                    Almost new
                  </button>
                  <button
                    onClick={e => handleStatus(e, "used", 3)}
                    className={
                      statusIndex === 3
                        ? "pc_sell_item pc_active"
                        : "pc_sell_item"
                    }
                  >
                    Used
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="price">
                Product Price <span>*</span>
              </label>
            </div>
            <div className="sell_inputs_wrapper">
              <div className="sell_price">
                <input
                  className="sell_text_input sell_price_input"
                  placeholder="Enter the product price"
                  type="number"
                  name="price"
                  id="price"
                  value={state.price}
                  onChange={handleInputs}
                />

                <span>won</span>
              </div>
            </div>
          </div>

          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="name">
                Tags (Optional)
              </label>
            </div>
            <div className="sell_inputs_wrapper">
              <div className="sell_tag">
                <div className="sell_tag_input_container">
                  <div className="sell_tag_input_wrapper">
                    <TagIcon color="action" />
                    <input
                      type="text"
                      className="input_tag"
                      placeholder="Please enter tags (Up to 5 tags)"
                      onChange={e => setTag(e.target.value)}
                      value={tag}
                      maxLength={10}
                      disabled={state.tags.length === 5}
                    />
                  </div>
                  <button onClick={handleTag} className="tag_btn">
                    Add
                  </button>
                </div>

                <div className="sell_tag_chips">
                  {state?.tags &&
                    state?.tags.map((t, i) => (
                      <div key={i} className="tag_chip">
                        <span>{t}</span>
                        <CloseIcon
                          sx={{
                            height: "16px",
                            width: "16px",
                            cursor: "pointer",
                          }}
                          color="action"
                          onClick={() => {
                            dispatch({
                              type: CREATE_ACTION_TYPES.REMOVE_TAG,
                              payload: t,
                            });
                          }}
                        />
                      </div>
                    ))}
                </div>

                <div className="tag_notice">
                  <p className="tag_notice_text">
                    * One tag can contain up to 10 characters
                  </p>
                  <p className="tag_notice_text">
                    * These tags are use for search
                  </p>
                  <p className="tag_notice_text">
                    * If you enter a tag that is not related to the product you
                    may be penalize
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="description">
                Product Description <span>*</span>
              </label>
            </div>
            <div className="sell_inputs_wrapper">
              <div className="sell_price">
                <textarea
                  className="sell_des"
                  placeholder="Give the product a detail description"
                  name="description"
                  id="description"
                  onChange={handleInputs}
                  value={state.description}
                  rows={5}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="sell_form_group">
            <div className="sell_label_wrapper">
              <label className="sell_label" htmlFor="name">
                Shipping Method <span>*</span>
              </label>
            </div>
            <div className="sell_inputs_wrapper">
              <h4 className="sell_shipping" onClick={() => setOpen(true)}>
                Please select a shipping method
              </h4>
              <Shipping
                open={open}
                setOpen={setOpen}
                state={state}
                dispatch={dispatch}
              />
            </div>
          </div>
          <div className="sell_form_group">
            <div className="sg_left">
              <Link
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                to={"/"}
              >
                <button type="submit" className="sg_left_btn">
                  Cancel Registration
                </button>
              </Link>
            </div>
            <div className="sg_right">
              <button onClick={handleSubmit} className="sg_right_btn">
                Complete Registration
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Sell;
