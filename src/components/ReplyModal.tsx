import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { addReply, addUserNameAndUid } from "../firebase/db";
import { getUser } from "../auth/userState";
import formatDate from "../hooks/formatDate";

interface Userdata {
  username: string;
}

interface Post {
  postId: string;
}

interface ModalProps extends Userdata, Post {}

export default function ReplyModal({ username, postId }: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [uid, setUid] = useState("");
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch user data when the component is mounted
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      //console.log(JSON.stringify(fetchedUser));
      if (fetchedUser && fetchedUser.uid) {
        setUid(fetchedUser.uid);
      } else {
        setIsModalOpen(true);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    if (!post || !title) {
      console.log("Please fill in the title and post.");
      return;
    }
    const now = formatDate(new Date());
    // laitetaa objekti kasaa vast enne lähettämistä muut ei oo kärryiil
    const data = {
      uid: uid,
      username: username,
      title: title,
      post: post,
      time: now,
    };

    try {
      console.log("Adding reply to Post data:", JSON.stringify(data));
      // await addreply(data,postId)
      await addReply(data, postId);
      closeModal();
      location.reload();
    } catch (error) {
      //console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        }}
        contentLabel="Input Modal"
      >
        <div className="h-full w-full  flex justify-center items-center ">
          <div className="flex-col  h-4/5 w-full flex justify-center items-center ">
            <h2 className="text-lg font-semibold">Title:</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Type here"
              className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <h2 className="text-lg font-semibold">Reply:</h2>
            <textarea
              className="border-none p-1 rounded-md bg-bor shadow-black shadow-sm transition-all"
              name="post"
              id="postContent"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              rows={6}
              cols={50}
            />

            <div className="mt-4 ">
              <button
                onClick={handleSubmit}
                className="mr-2 bg-blue-500 text-green rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
              <button
                onClick={() => console.log("cancel reply")}
                className="mr-2 bg-blue-500 text-red-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
