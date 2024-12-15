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
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import app from "./firebaseConfig";
// muista määrittää aina mistä objektista on kyse
import { newPost } from "../interfaces/postInterface";
import { Answer } from "../interfaces/postInterface";
import { nameAndUid } from "../interfaces/nameAndUid";

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

// add reply to post
// answer objekti ja postId jotta löydetään oikea postaus ja se pitäs lisää sinne sen answers kohtaan ?
export const addReply = async (data: Answer, postid: string) => {
  console.log("ADD reply käynnistyy...");
  try {
    const postDocRef = doc(db, "postCollection", postid); // haetaa doc idn perusteella
    let post = await getDoc(postDocRef);
    console.log(JSON.stringify(post.data()) + "adding reply ... --> "); // löyty oikea

    if (post.exists()) {
      await updateDoc(postDocRef, {
        answers: arrayUnion(data),
      });
      console.log("ONNISTUI ?");
    }
  } catch (error) {
    console.error("Error adding REPLY:", error);
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
        answers: data.answers,
      };
    });
    return posts;
  } catch (error) {
    console.error("Error getting documents:", error);
  }
};
export const getPostByPostId = async (postId: string) => {
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

// username AND uid
export const addUserNameAndUid = async (nameAndUid: nameAndUid) => {
  if (!nameAndUid.username || !nameAndUid.uid) {
    return;
  }
  try {
    const docRef = await addDoc(collection(db, "usernameAndUid"), nameAndUid);
    console.log("added username and UID with ID " + docRef.id); // Tämä antaa ID:n
  } catch (error) {
    console.error("Error adding document:", error);
  }
};

// Hakee kaikki käyttäjät
export const getAllUserData = async () => {
  console.log("Haetaan kaikki käyttäjätiedot...");
  try {
    const querySnapshot = await getDocs(collection(db, "usernameAndUid"));
    if (querySnapshot.empty) {
      console.log("Kokoelma on tyhjä.");
      return [];
    }
    const allData = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log("Haettu tiedot:", allData);
    return allData; // Palautetaan kaikki tiedot
  } catch (error) {
    console.error("Virhe haettaessa kaikkia tietoja:", error);
    return [];
  }
};

// haetaa usernamen perusteella käyttäjätiedot
export const getUserByUsername = async (username: string) => {
  console.log("Haetaan käyttäjä nimellä:", username);

  try {
    const q = query(
      collection(db, "usernameAndUid"),
      where("username", "==", username)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Käyttäjää ei löytynyt.");
      return null;
    }

    const userData = querySnapshot.docs[0].data();
    console.log("Haettu käyttäjä:", userData);
    return userData;
  } catch (error) {
    console.error("Virhe haettaessa käyttäjää:", error);
    return null;
  }
};

// haetaa uid perusteella käyttäjätiedot
export const getUserByUid = async (uid: string) => {
  console.log("Haetaan käyttäjä nimellä:", uid);
  try {
    const q = query(collection(db, "usernameAndUid"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("Käyttäjää ei löytynyt.");
      return null;
    }
    const userData = querySnapshot.docs[0].data();
    console.log("Tämähetkinen käyttäjä:", userData);
    return userData;
  } catch (error) {
    console.error("Virhe haettaessa käyttäjää:", error);
    return null; // Virhetilanteessa palautetaan null
  }
};
