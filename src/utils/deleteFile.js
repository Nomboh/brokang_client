import { deleteObject, ref } from "firebase/storage";
import { storage } from "./firebase";

const deleteFile = filepath => {
  const imageRef = ref(storage, filepath);
  return deleteObject(imageRef);
};

export default deleteFile;
