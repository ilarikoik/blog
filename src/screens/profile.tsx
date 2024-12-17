import { View, Text } from "react-native";
import Header from "../components/Header";
import Lottie from "react-lottie";
import user from "../lottie/user.json";
import { Link, useNavigate } from "react-router-dom";
import examplePost from "../data/examplePost.json";
import { DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUser } from "../auth/userState";
import { getData, getUserByUid } from "../firebase/db";
import { newPost } from "../interfaces/postInterface";
import { handleDelete } from "../hooks/handleDelete";

const Profile = () => {
  const navigate = useNavigate(); // tarvii navigoidessa api sisällä
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [render, setRender] = useState(false);
  const [ownPosts, setOwnPosts] = useState<newPost[]>();
  const options = {
    animationData: user,
    loop: false,
    autoplay: true,
  };

  //haetaa username
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      let getAllpost = await getData();
      let filteredByUid = getAllpost?.filter(
        (item) => item.posterUid === fetchedUser?.uid
      );
      setOwnPosts(filteredByUid);
      if (fetchedUser?.uid) {
        let ukko = await getUserByUid(fetchedUser?.uid);
        if (ukko) {
          setUsername(ukko.username);
        }
      }
    };
    fetchUser();
  }, [render]);

  const handleThread = (postId: string) => {
    navigate("/reply", { state: { postId, username } });
  };
  return (
    <>
      <Header></Header>
      <div className="h-96 w-full flex justify-center items-center mt-5">
        <div className=" h-4/5 w-4/5 rounded-lg  border-postgray shadow-2xl lg:w-1/3">
          <Lottie options={options} height={130} width={90}></Lottie>
          <div className="flex flex-col justify-center items-center w-full h-24">
            <div className="w-fit ">
              <p className="underline font-semibold">
                {username ? username : "stranger"}
              </p>
              <p>Omien postauksien määrä: {ownPosts?.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col justify-center ">
        <h1 className="flex justify-center font-semibold text-xl">
          OMAT POSTAUKSET
        </h1>
        <div className="flex justify-center flex-col items-end">
          {ownPosts &&
            ownPosts.map((item, id) => {
              return (
                <div
                  key={id}
                  className="w-full h-fit md:w-3/5 bg-postgray m-2 p-4 rounded-md flex flex-row"
                >
                  <div className=" w-full">
                    <div className=" w-full flex flex-row justify-between mb-3">
                      <p className=" flex justify-center items-center">
                        <strong>{item.title}</strong>
                      </p>
                      <button
                        className="p-2 text-orange-500 rounded-lg w-fit justify-end flex flex-row hover:underline"
                        onClick={() => handleThread(item.postId)}
                      >
                        <p className="">
                          Vastauksia {`(${item.answers.length})`}
                        </p>
                        <DoubleRightOutlined
                          style={{ fontSize: "24px", color: "#f97316" }}
                        />
                      </button>
                    </div>
                    <hr className="h-1 bg-gray border-none" />
                    <h3>{item.post}</h3>
                    <div className="w-full flex justify-end">
                      <button
                        className=" h-5 w-fit border-none hover:underline text-red-500 text-md mr-10 flex justify-end items-center hover:font-semibold"
                        onClick={() => {
                          handleDelete(item.postId);
                          setRender((prev) => !prev);
                        }}
                      >
                        Poista
                        <DeleteOutlined style={{ fontSize: 20 }} />
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
