import { useState, useEffect } from "react";
import "../App.css";
import Header from "../components/Header";
import Filter from "../components/Filter";
import Posts from "../components/Posts";
import GoogleAuth from "../auth/googleAuth";
import { getData, getUserByUid } from "../firebase/db";
import { getUser } from "../auth/userState";
import CustomAlert from "../components/Modal";

const Index = () => {
  const [searchBy, setSearchBy] = useState("Kaikki");
  const [showModal, setShowModal] = useState(false);
  const [foundUser, setFoundUser] = useState(false);

  const getSchool = (item: string) => {
    setSearchBy(item);
  };

  // jos ei oo tietokannassa nii modal aukee ja pitää täyttää käyttäjänimi joka sitte näytetää muualla
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      let data = await getData();
      //console.log( JSON.stringify(data) + "----------------------------------------");
      if (fetchedUser && fetchedUser.uid) {
        setFoundUser(true);
        const keijo = await getUserByUid(fetchedUser.uid);
        if (!keijo) {
          setShowModal(true);
        }
      } else {
        console.log("Ei löytynyt käyttäjää tai UID:ta");
      }
    };
    fetchUser();
  }, [searchBy]);

  return (
    <>
      {foundUser && (
        <div className="bg-white w-full min-h-screen ">
          {showModal && <CustomAlert setShowModal={setShowModal} />}
          <Header></Header>
          <Filter getSchool={getSchool}></Filter>
          <Posts searchBy={searchBy}></Posts>
        </div>
      )}
    </>
  );
};
export default Index;
