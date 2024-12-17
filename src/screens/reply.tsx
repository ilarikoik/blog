import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { getPostByPostId, getUserByUid } from "../firebase/db";
import { useEffect, useState } from "react";
import { newPost } from "../interfaces/postInterface";
import ReplyModal from "../components/ReplyModal";

const Reply = () => {
  const location = useLocation();
  const { postId, loggedInUser, username } = location.state || {}; // vastaanotetaan posts.tsx komponentilta lähetetty id, jos tyhjä nii palauttaa tyhjän objektin
  const [post, setPost] = useState<newPost>() || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [poster, setPoster] = useState("");

  useEffect(() => {
    const get = async () => {
      let ref = await getPostByPostId(postId);
      if (ref) {
        let poster = await getUserByUid(ref?.posterUid);
        if (poster && poster.username) {
          setPoster(poster.username);
        }
      }
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
      <div className="h-fit w-full flex justify-center items-center">
        <div className=" h-4/5 w-4/5 rounded-lg border-2  border-bor shadow-2xl lg:w-2/3  p-3">
          {post ? (
            <>
              <div className=" flex flex-row justify-center items-center">
                <div className="flex flex-col justify-between w-full ">
                  <p className="  mb-2">{post.time}</p>
                  <p className="  mb-2 underline">{poster}</p>
                  <p className="font-semibold text-xl  mb-2"> {post.school}</p>
                  <h1 className="font-semibold text-lg mb-2">{post.title}</h1>
                </div>
                {
                  <button
                    className="p-2 text-white rounded-lg w-fit justify-end bg-orange-500 font-bold hover:shadow-lg hover:shadow-orange-700"
                    onClick={handleReply}
                  >
                    Reply
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

      <div className="flex justify-center flex-col items-end mt-10">
        {/*uusin alimmaks voi lukee postauksesta eteepäi keskustelua */}
        {post &&
          Array.isArray(post.answers) &&
          post.answers.map((answer, id) => {
            return (
              <>
                <div
                  key={id}
                  className="w-full h-fit md:w-3/5 bg-postgray m-2 p-4 rounded-md"
                >
                  <div className="flex justify-around mb-2">
                    <p className="underline">{answer.username}</p>
                    <p>{answer.time}</p>
                  </div>
                  <hr className="h-1 bg-gray border-none" />
                  <h1 className="font-semibold mb-3">
                    <strong>{answer.title}</strong>
                  </h1>
                  <h3>{answer.post}</h3>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Reply;
