import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";

const auth = getAuth();
export const LogOut = async () => {
  try {
    await signOut(auth);
    console.log("LOGGED OUT");
  } catch (error) {
    console.log("Error while logginOut " + error);
  }
};
