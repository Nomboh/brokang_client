import Close from "@mui/icons-material/Close";
import React from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { CREATE_ACTION_TYPES } from "../../context/CreateProduct/formAction";
import deleteDocuments from "../../utils/deleteDocuments";
import deleteFile from "../../utils/deleteFile";

function ImageItems({ imgUrl, imageId, dispatch }) {
  const { user } = useAuth();

  const handleDelete = async () => {
    try {
      await deleteDocuments("product_images", imageId);
      await deleteFile(`product_images/${user._id}/${imageId}`);
      dispatch({ type: CREATE_ACTION_TYPES.REMOVE_IMAGES, payload: imgUrl });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  return (
    <div className="sell_img_holder">
      <img src={imgUrl} alt={"product_images"} />
      <div className="close_img" onClick={handleDelete}>
        <Close
          className="close_icon"
          htmlColor="#fff"
          sx={{ fontSize: { xs: "15px", md: "25px" } }}
        />
      </div>
    </div>
  );
}

export default ImageItems;
