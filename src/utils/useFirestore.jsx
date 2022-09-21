import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

function useFirestore(collectionName = "product_images") {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const dosc = [];
        snapshot.forEach(doc => {
          dosc.push({ id: doc.id, data: doc.data() });
        });

        setDocuments(dosc);
      },
      error => {
        alert(error.message);
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return documents;
}

export default useFirestore;
