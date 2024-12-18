import { useEffect, useRef, useState } from "react";
import filterBySchool from "../hooks/filterPosts.tsx";
import { getData, getUserByUid } from "../firebase/db.tsx";
import SortPostByDateNewest from "../hooks/sortPostByDate.tsx";
import { useNavigate } from "react-router-dom";
import { DoubleRightOutlined } from "@ant-design/icons";
import AddPost from "./AddPost.tsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser } from "../auth/userState.tsx";
import { newPost } from "../interfaces/postInterface.tsx";

interface PostProps {
  searchBy: string;
}

const auth = getAuth();
export default function Posts({ searchBy }: PostProps) {
  const [post, setPost] = useState<newPost[]>(); // tulee olemaan taulukko täynnä objekteja
  const [render, setRender] = useState(0);
  const navigate = useNavigate(); // tarvii navigoidessa api sisällä
  const [isToggled, setIsToggled] = useState(false);
  const [username, setUsername] = useState(false);
  const [uid, setUid] = useState("");

  useEffect(() => {
    const get = async () => {
      let all = await getData();
      if (all && searchBy !== "Kaikki") {
        let filtered = filterBySchool(searchBy, all);
        let sorted = SortPostByDateNewest(filtered);
        setPost(sorted);
      } else if (all) {
        // jos löytyy nii aseta sitte vasta muute tulee UNDEFINED ...
        let sorted = SortPostByDateNewest(all);
        setPost(sorted);
      } else {
        setPost([]);
      }
    };
    get();
  }, [searchBy, render, isToggled]);

  const [loggedInUser, setLoggedInUser] = useState(false);
  useEffect(() => {
    const logged = async () => {
      const get = await getUser(); // Assuming this fetches the user data
      let username = get ? await getUserByUid(get?.uid) : "";
      let getUid = get ? get.uid : "";
      setUid(getUid);
      if (username && typeof username !== "string" && "username" in username) {
        setUsername(username.username);
      } else {
        console.log("No username found or username is a string");
      }

      setLoggedInUser(get ? true : false);
    };
    logged();
  }, []);

  // annetaan propsina addpost komponentille jotta kun lisätää nii sivu post array päivityy
  const toggleState = () => {
    setIsToggled((prevState) => !prevState);
  };

  const handleReply = (postId: string) => {
    navigate("/reply", { state: { postId, loggedInUser, username } });
  };
  return (
    <>
      <div className="w-full justify-center flex text-lg">
        <AddPost
          uid={uid}
          toggleState={toggleState}
          loggedInUser={loggedInUser}
          toggle={false}
        ></AddPost>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="w-full m-1 justify-center items-center lg:w-4/5 xl:3/5">
          {Array.isArray(post) ? (
            post.map((item) => {
              return (
                <div
                  key={item.postId}
                  className="bg-white border-2 w-full rounded-lg mb-5 p-3 border-bor shadow-2xl"
                >
                  <p className="text-black flex justify-between">
                    <strong>{item.school}</strong>
                    {item.time}
                  </p>
                  <h3 className="text-black">
                    <strong>{item.title}</strong>
                  </h3>
                  <hr className="h-1 bg-gray border-none mt-3" />
                  <p className="text-black text-wrap"> {item.post}</p>
                  <div className="flex justify-end ">
                    <div className=" w-fit h-fit flex justify-center items-center p-1">
                      <button
                        className="h-fit border-none hover:underline text-orange-500 text-md flex flex-row justify-center "
                        onClick={() => handleReply(item.postId)}
                      >
                        <p className="">
                          Vastauksia {`(${item.answers.length})`}
                        </p>
                        <DoubleRightOutlined
                          style={{ fontSize: "24px", color: "#f97316" }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </>
  );
}
