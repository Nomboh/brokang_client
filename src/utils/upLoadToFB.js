import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const upLoadToFB = (file, fileName, subFolder, progress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, subFolder + "/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const pro = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        progress(pro);
      },
      error => {
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export default upLoadToFB;
