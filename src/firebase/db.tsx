import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  getDoc,
} from "firebase/firestore";
import app from "./firebaseConfig";
// muista määrittää aina mistä objektista on kyse
import { newPost } from "../interfaces/postInterface";

const db = getFirestore(app);

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
    const q = query(collection(db, "postCollection"), orderBy("time", "desc")); // ajaltaan uusin eka
    const querySnapshot = await getDocs(q);

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
    return posts;
  } catch (error) {
    console.error("Error getting documents:", error);
  }
};
export const getPostByPostId = async (postId: string) => {
  console.log("Haetaan post by id ...");
  try {
    const postDocRef = doc(db, "postCollection", postId);
    let post = await getDoc(postDocRef);
    if (post) {
      // post.data() tulostaa pelkästää sen mun datan sieltä kaiken joukosta mutta se pitää vielä asettaa objektiksti
      return post.data() as newPost;
    }
    return null;
  } catch (error) {
    console.error("Error getting documents:", error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    const postDocRef = doc(db, "postCollection", postId);

    // Delete the document
    await deleteDoc(postDocRef);

    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
