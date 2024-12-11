import { deleteDoc, doc, Firestore, getFirestore } from "firebase/firestore";

const db = getFirestore();
export const handleDelete = async (postId: string) => {
  try {
    let ref = doc(db, "postCollection", postId);
    await deleteDoc(ref);
    console.log(ref + "Deleted");
  } catch (error) {
    alert("Error Deleting " + error);
  }
};
