import { useState, useEffect } from "react";
import "../App.css";
import Header from "../components/Header";
import Filter from "../components/Filter";
import Posts from "../components/Posts";
import GoogleAuth from "../auth/googleAuth";
import { getUserByUid } from "../firebase/db";
import { getUser } from "../auth/userState";
import CustomAlert from "../components/Modal";

const Index = () => {
  const [searchBy, setSearchBy] = useState("Kaikki");
  const [user, setUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(0);

  const getSchool = (item: string) => {
    setSearchBy(item);
  };

  useEffect(() => {
    const use = async () => {
      // aina tarkista että siellä on jotain muuten tulee se vi.. UNDEFINED
      let user = await GoogleAuth();
      if (user) {
        setUser(true);
      } else {
        setUser(false);
        console.log("buuuu");
      }
    };
    use();
  }, [searchBy]);

  // jos ei oo tietokannassa nii modal aukee ja pitää täyttää käyttäjänimi joka sitte näytetää muualla
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      if (fetchedUser && fetchedUser.uid) {
        let keijo = await getUserByUid(fetchedUser.uid);
        if (!keijo) {
          //setShowModal(false)
          setShowModal(true);
        }
      } else {
        console.log("Ei löytynyt käyttäjää tai UID:ta");
      }
    };
    fetchUser();
  }, []);

  setTimeout(() => {
    while (reload < 1) {
      location.reload();
      setReload((prev) => prev + 1);
    }
  }, 7000);
  // POSTAUKSELLE VASTAUS SIVUSTO eli lisää POST objektille vastaukset: string[]
  // klikatessa postausta lähetä postauksen id toiselle siuvlle ja sit hae se databasesta näytä postaus ja mapilla vastaukset
  // jos vastauksella on alle 0 upvote border red ja jos yli 0 nii green, jos 0 nii gray
  return (
    <div className="bg-white w-full min-h-screen ">
      <Header></Header>
      <Filter getSchool={getSchool}></Filter>
      <Posts searchBy={searchBy}></Posts>
      <div>
        {showModal && <CustomAlert />} {/* Conditionally render the modal */}
      </div>
    </div>
  );
};
export default Index;