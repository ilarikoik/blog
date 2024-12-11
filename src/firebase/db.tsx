import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

// kerro aluks mitä tallennetaan
interface newPost {
  postId: string;
  title: string;
  school: string;
  post: string;
  time: string;
}

// tekee collectionin jos ei oo jo
export const addPostData = async (data: newPost) => {
  console.log("ADD data käynnistyy...");
  try {
    const docRef = await addDoc(collection(db, "postCollection"), data);
    console.log();
  } catch (error) {
    console.error("Error adding document:", error);
  }
};
export const getData = async () => {
  console.log("GET data käynnistyy...");
  try {
    const querySnapshot = await getDocs(collection(db, "postCollection"));

    // Convert querySnapshot to an array of newPost objects
    const posts: newPost[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        postId: doc.id, // Assuming the doc id can be used as postId
        title: data.title,
        school: data.school,
        post: data.post,
        time: data.time,
      };
    });

    return posts; // Return the mapped posts array
  } catch (error) {
    console.error("Error getting documents:", error); // Handle any errors
  }
};

export const deletePost = async (postId: string) => {
  try {
    // Reference to the document you want to delete
    const postDocRef = doc(db, "postCollection", postId); // Replace "posts" with your collection name

    // Delete the document
    await deleteDoc(postDocRef);

    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
