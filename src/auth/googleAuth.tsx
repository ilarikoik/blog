import React, { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebaseConfig"; // Firebase-konfiguraatio
import { Link } from "react-router-dom";

const auth = getAuth(app);

const GoogleAuth = () => {
  const [user, setUser] = useState<any>(null); // Käyttäjän tila

  useEffect(() => {
    // Tarkistetaan, onko käyttäjä jo kirjautuneena sisään
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Jos käyttäjä on kirjautunut sisään
      } else {
        setUser(null); // Jos käyttäjä ei ole kirjautunut sisään
      }
    });

    // Palautetaan unsubscribe-funktio, jotta voidaan poistaa kuuntelu kun komponentti poistetaan
    return () => unsubscribe();
  }, []);

  // Kirjautuminen Googlella
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User info:", user);
      setUser(user); // Asetetaan käyttäjä sisäänkirjautuneeksi
      location.reload();
    } catch (error: any) {
      console.error("Error during Google login:", error.message);
    }
  };

  // Kirjautuminen ulos
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Käyttäjä asetetaan uloskirjautuneeksi
      console.log("LOGGED OUT");
    } catch (error) {
      console.log("Error while logging out: " + error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <Link
            to="/"
            className="text-red-500 font-semibold hover:underline "
            onClick={handleLogOut}
          >
            Kirjaudu ulos
          </Link>
        </>
      ) : (
        <Link
          to="/index"
          className="text-blue font-semibold hover:underline "
          onClick={handleGoogleLogin}
        >
          Kirjaudu sisään Googlella
        </Link>
      )}
    </div>
  );
};

export default GoogleAuth;
