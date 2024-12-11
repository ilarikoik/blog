import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
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
    console.log("Try lohkon sisällä...");
    const docRef = await addDoc(collection(db, "postCollection"), data);
    console.log(
      "Data tallennettu -- " + JSON.stringify(data) + " --- " + docRef.id
    );
    console.log("Document added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
};
export const getData = async () => {
  console.log("GET data käynnistyy...");
  try {
    console.log("Try lohkon sisällä...");
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
