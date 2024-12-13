import { useEffect, useState } from "react";
import AddPost from "./AddPost";
import Lottie from "react-lottie";
import blog from "../lottie/blog.json";
import { Link } from "react-router-dom";
import { loggedInSites } from "../data/loggedInSites";
import GoogleAuth from "../auth/googleAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebaseConfig";

const auth = getAuth(app);

export default function Header() {
  const options = {
    animationData: blog,
    loop: true,
    autoplay: true,
  };

  const [user, setUser] = useState(false); // Käyttäjän nimi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });

    // Palautetaan kuuntelija, jotta voidaan poistaa kuuntelu, kun komponentti poistetaan
    return () => unsubscribe();
  }, []); // Tyhjä riippuvuuslista, joten tämä suoritetaan vain kerran komponentin latautuessa

  return (
    <>
      <div className="h-fit w-full bg-bor flex flex-row md:hidden">
        <div className="flex justify-start">
          <Lottie options={options} height={80} />
          <h1 className="flex items-center w-2/4 ">
            <strong>BLGO</strong>
          </h1>
        </div>
        {/*
        <div className=" w-full flex justify-end items-center">
          <Slider></Slider>
        </div>
          */}
        <hr className="h-1 bg-gray border-none" />
      </div>
      {/*ylempi on md asti ja alempi sen jälkeen */}
      <div className="hidden h-fit w-full bg-bor md:flex flex-row justify-center">
        <div className="flex justify-evenly items-center w-3/6">
          <Lottie options={options} height={80} />
        </div>
      </div>
      <div className="flex justify-around w-full h-fit md:justify-end bg-bor p-2">
        <div className="flex w-2/6  justify-between">
          {user ? (
            Array.isArray(loggedInSites) &&
            loggedInSites.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.screen}
                  className="text-sm text-orange-500 md:text-xl hover:underline "
                >
                  {item.name}
                </Link>
              );
            })
          ) : (
            <div className="flex justify-end  w-full"></div>
          )}
        </div>
      </div>
      <hr className="h-1 bg-gray border-none" />
      <div className="flex justify-end  w-full p-3">
        <AddPost user={user}></AddPost>
        {<GoogleAuth></GoogleAuth>}
      </div>
    </>
  );
}
