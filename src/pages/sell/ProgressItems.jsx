import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import uploadFiles from "./uploadFiles";
import { useAuth } from "../../context/auth/AuthContext";
import addDocument from "../../utils/addDocument";

function ProgressItems({ file }) {
  const [imageURL, setImageURL] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const uploadImages = async () => {
      const currentTime = new Date().getTime();
      const imageName =
        Math.floor(Math.random() * 10000000) +
        "_" +
        currentTime +
        "." +
        file.name.split(".").pop();
      try {
        const url = await uploadFiles(
          file,
          `product_images/${user?._id}`,
          imageName
        );
        const imagesDoc = {
          imageURL: url,
          userId: user?._id,
          userEmail: user?.email,
          userName: user?.name,
        };
        setImageURL(null);
        await addDocument("product_images", imagesDoc, imageName);
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    };
    if (file) {
      setImageURL(URL.createObjectURL(file));
      uploadImages();
    }
  }, [file, user?._id, user?.email, user?.name]);

  return (
    imageURL && (
      <div className="circular_progress">
        <CircularProgress
          color="primary"
          variant="indeterminate"
          thickness={6}
          size={80}
        />
      </div>
    )
  );
}

export default ProgressItems;
