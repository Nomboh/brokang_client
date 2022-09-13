import "./footer.css";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_top">
        <div className="footer_line"></div>
        <div className="footer_top_wrapper">
          <div className="footer_top_items">Brokang Inc</div>
          <div className="footer_top_items">FAQ</div>
          <div className="footer_top_items">Terms and Service</div>
          <div className="footer_top_items">Privacy Policy</div>
        </div>
        <div className="footer_line"></div>
      </div>
      <div className="footer_bottom">
        <div className="general_info">
          <span className="info_span">Brokang CEO Quentin </span>
          <span className="info_span">
            Business Registration number: 156-2256-0455{" "}
          </span>
          <span className="info_span">
            Brokang pay Inquiries : 010-4527-1425
          </span>
          <span className="info_span">
            Working Hour: (weekdays 10:00 - 16:00){" "}
          </span>
        </div>
        <div className="footer_logo">
          <Link to={"/"}>
            <img src="/brokang_logo_svg.svg" alt="footer logo" />
          </Link>
        </div>
        <div className="footer_social">
          <div className="social_wrapper">
            <FacebookIcon sx={{ color: "#3b5998", cursor: "pointer" }} />
          </div>

          <div className="social_wrapper">
            <TwitterIcon sx={{ color: "#55acee", cursor: "pointer" }} />
          </div>

          <div className="social_wrapper">
            <InstagramIcon sx={{ color: " #c32aa3", cursor: "pointer" }} />
          </div>

          <div className="social_wrapper">
            <GoogleIcon sx={{ color: "#dc4e41", cursor: "pointer" }} />
          </div>
        </div>
      </div>
      <p className="copyright">Copyright @ 2022 Brokang. All rights reserved</p>
    </div>
  );
}

export default Footer;
