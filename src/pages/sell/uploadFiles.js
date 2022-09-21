import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utils/firebase";

const uploadFiles = (file, subFolder, imageName) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, subFolder + "/" + imageName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
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

export default uploadFiles;
