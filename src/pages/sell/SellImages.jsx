import React, { useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ProgressItems from "./ProgressItems";
import ImageItems from "./ImageItems";
import { toast, ToastContainer } from "react-toastify";
import { CREATE_ACTION_TYPES } from "../../context/CreateProduct/formAction";

function SellImages({ state, dispatch, imgUrls }) {
  const [files, setFiles] = useState([]);

  const handleChange = e => {
    const filesLength = e.target.files.length;
    if (filesLength + imgUrls.length <= 12) {
      setFiles([...e.target.files]);
    } else {
      toast("😥😥😥 You can only upload 12 images", {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: true,
        type: "warning",
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: CREATE_ACTION_TYPES.ADD_IMAGES,
      payload: imgUrls.map(img => img.data.imageURL),
    });
  }, [imgUrls, dispatch]);

  return (
    <div className="sell_images">
      <input
        className="sell_file_input"
        type="file"
        name="images"
        id="images"
        multiple
        maxLength={12}
        onChange={handleChange}
      />
      <label className="img_label" htmlFor="images">
        <AddAPhotoIcon sx={{ height: "60px", width: "60px" }} color="action" />
      </label>

      {imgUrls &&
        imgUrls.map(item => (
          <ImageItems
            key={item.id}
            imgUrl={item.data.imageURL}
            imageId={item.id}
            state={state}
            dispatch={dispatch}
          />
        ))}

      {files &&
        files.map((file, i) => {
          return <ProgressItems file={file} key={i} />;
        })}
      <ToastContainer />
    </div>
  );
}

export default SellImages;
