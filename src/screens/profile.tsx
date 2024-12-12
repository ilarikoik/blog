import { View, Text } from "react-native";
import Header from "../components/Header";
import Lottie from "react-lottie";
import user from "../lottie/user.json";
import { Link } from "react-router-dom";
import examplePost from "../data/examplePost.json";

const Profile = () => {
  const options = {
    animationData: user,
    loop: false,
    autoplay: true,
  };

  // kun klikataan "show thread" lähetetää postin id reply sivulle ja siellä näytetää ne kaikki sitte
  return (
    <>
      <Header></Header>
      <div className="h-96 w-full flex justify-center items-center mt-5">
        <div className=" h-4/5 w-4/5 rounded-lg  border-postgray shadow-2xl lg:w-1/3">
          <Lottie options={options} height={130} width={90}></Lottie>
          <div className="flex flex-col justify-center items-center w-full h-24">
            <div className="w-36 ">
              <p>Käyttäjänimi: *****</p>
              <p>postaukset: 12</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col justify-center ">
        <h1 className="flex justify-center font-semibold text-xl">
          OMAT POSTAUKSET
        </h1>
        <div className="flex justify-center flex-col items-end">
          {examplePost &&
            examplePost.map((item, id) => {
              return (
                <div
                  key={id}
                  className="w-full h-fit md:w-3/5 bg-postgray m-2 p-4 rounded-md flex flex-row"
                >
                  <div className=" w-full">
                    <h2>
                      <strong>{item.title}</strong>
                    </h2>
                    <h3>{item.post}</h3>
                  </div>
                  <div className=" w-32 h-30 flex items-end">
                    <div className="flex justify-end w-full ">
                      <button className="p-2 text-white rounded-lg w-fit justify-end bg-orange-500 font-bold">
                        Show Thread
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Profile;
