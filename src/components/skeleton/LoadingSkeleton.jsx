import React from "react";
import Skeleton from "react-loading-skeleton";
import "./skeleton.css";

function LoadingSkeleton({ countTime, imageHieght }) {
  return Array(countTime)
    .fill(0)
    .map((el, i) => {
      return (
        <div key={i} className="skeleton_container">
          <div className="skeleton_img">
            <Skeleton height={imageHieght} />
          </div>
          <div className="skeleton_text">
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton />
            </p>
          </div>
        </div>
      );
    });
}

export default LoadingSkeleton;
