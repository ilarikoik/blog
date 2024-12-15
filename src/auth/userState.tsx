import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import app from "../firebase/firebaseConfig";
import { useState, useEffect } from "react";

const auth = getAuth(app);

export const getUser = () => {
  return new Promise<User | null>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          resolve(user); // palauttaa user jos on
        } else {
          resolve(null);
        }
      },
      reject // virheiden käsittely
    );
    return unsubscribe;
  });
};
