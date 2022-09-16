import React from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function SellImages() {
  return (
    <div className="sell_images">
      <input
        className="sell_file_input"
        type="file"
        name="images"
        id="images"
      />
      <label className="img_label" htmlFor="images">
        <AddAPhotoIcon sx={{ height: "60px", width: "60px" }} color="action" />
      </label>
    </div>
  );
}

export default SellImages;
