import { View, Text } from "react-native";
import Header from "../components/Header";
import Lottie from "react-lottie";
import user from "../lottie/user.json";
import { Link } from "react-router-dom";

const Profile = () => {
  const options = {
    animationData: user,
    loop: false,
    autoplay: true,
  };

  return (
    <>
      <Header></Header>
      <div className="h-96 w-full flex justify-center items-center">
        <div className=" h-4/5 w-4/5 rounded-lg  border-postgray shadow-2xl lg:w-1/3">
          <Lottie options={options} height={130} width={90}></Lottie>
          <div className="flex flex-col justify-center items-center w-full h-24">
            <div className="w-36 ">
              <p>Käyttäjänimi: *****</p>
              <p>postaukset: 12</p>
              <p></p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex justify-center">
        <h1>OMAT POSTAUKSET</h1>
      </div>
    </>
  );
};

export default Profile;
