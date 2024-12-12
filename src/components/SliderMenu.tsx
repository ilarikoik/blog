import { Twirl as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddPost from "./AddPost";

export default function Slider() {
  const [isOpen, setOpen] = useState(false);
  const user = true; // Simuloi käyttäjän kirjautumistilaa

  return (
    <div>
      {/* Hampurilaisvalikko */}
      <Hamburger toggled={isOpen} toggle={setOpen} rounded />

      {/* Pudotusvalikko */}
      {isOpen && (
        <div className="shadow-black shadow-xl border-y  fixed top-20 right-1 z-100 bg-white flex justify-center p-2">
          {user ? (
            <ul className="flex flex-col w-32 h-60">
              <Link to="/" className="mb-1">
                Home
              </Link>
              <Link to="/profile" className="mb-1">
                Profile
              </Link>
              <Link to="/" className="mb-1">
                LogOut
              </Link>
              <hr className="mb-3" />
              <AddPost user={user} />
            </ul>
          ) : (
            <ul className="w-32 h-14">
              <Link to="/" className="mb-1">
                SignIn
              </Link>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
