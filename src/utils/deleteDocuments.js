import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const deleteDocuments = (collectionName, documentId) => {
  return deleteDoc(doc(db, collectionName, documentId));
};

export default deleteDocuments;
