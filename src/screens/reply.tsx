import react, { View, Text } from "react-native";
import Header from "../components/Header";
import Lottie from "react-lottie";
import user from "../lottie/user.json";
import { Link, redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getPostByPostId } from "../firebase/db";
import { useEffect, useState } from "react";
import { newPost } from "../interfaces/postInterface";
import examplePost from "../data/examplePost.json";
import { getUser } from "../auth/userState";
import ReplyModal from "../components/ReplyModal";

const Reply = () => {
  const location = useLocation();
  const { postId, loggedInUser, username } = location.state || {}; // vastaanotetaan posts.tsx komponentilta lähetetty id, jos tyhjä nii palauttaa tyhjän objektin
  const [post, setPost] = useState<newPost>() || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const get = async () => {
      let ref = await getPostByPostId(postId);
      if (ref) {
        setPost(ref);
        console.log(post);
      } else {
        console.log("Virhe haettaessa postId reply screeniä varten");
      }
    };
    get();
  }, []);

  const handleReply = () => {
    console.log(post, postId);
    setIsModalOpen(true);
  };
  const handleLogin = () => {
    console.log("KIRJAUDU");
  };

  // nyt lataa sivun uudellee aina kun submit reply , saattaa aiheuttaa ongelmia ku komponentit ladataa uudelleen nii ehkä jää tyhjäks ???
  return (
    <>
      <Header></Header>
      <div className="h-96 w-full flex justify-center items-center">
        <div className=" h-4/5 w-4/5 rounded-lg border-2  border-bor shadow-2xl lg:w-2/3  p-3">
          {post ? (
            <>
              <div className=" flex flex-row justify-center items-center">
                <div className="flex flex-col justify-between w-full ">
                  <p className="font-semibold text-xl  mb-2"> {post.school}</p>
                  <h1 className="font-semibold text-lg mb-2">{post.title}</h1>
                </div>
                {
                  <button
                    className="p-2 text-white rounded-lg w-fit justify-end bg-orange-500 font-bold hover:shadow-lg hover:shadow-orange-700"
                    onClick={handleReply}
                  >
                    {loggedInUser ? "Reply" : "LogIn to Reply"}
                  </button>
                }
                {isModalOpen && (
                  <ReplyModal postId={postId} username={username}></ReplyModal>
                )}
              </div>
              <hr className="h-1 bg-gray border-none" />
              <p className="font-medium mt-3"> {post.post}</p>
            </>
          ) : (
            <p>Error while fetching..</p>
          )}
        </div>
      </div>

      <div className="flex justify-center flex-col items-end">
        {/*uusin alimmaks voi lukee postauksesta eteepäi keskustelua */}
        {post &&
          Array.isArray(post.answers) &&
          post.answers.map((answer, id) => {
            return (
              <div
                key={id}
                className="w-full h-fit md:w-3/5 bg-postgray m-2 p-4 rounded-md"
              >
                <h2 className="flex justify-around">
                  <strong>{answer.title}</strong>
                  <strong>{answer.username}</strong>
                  <strong>{answer.time}</strong>
                </h2>
                <h3>{answer.post}</h3>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Reply;
