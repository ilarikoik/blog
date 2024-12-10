import React, { ChangeEvent, useEffect, useRef } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import Lottie from "react-lottie";
import Modal from "react-modal";
import done from "../lottie/done.json";

interface Post {
  postId: number;
  title: string;
  school: string;
  post: string;
  time: Date;
}

//propseja lähetessä tää ja paramterinä pitää olla jotta errori hävii
interface User {
  user: boolean;
}

export default function AddPost({ user }: User) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [lottie, setLottie] = useState(false);
  let counter = useRef<number>(20);
  const [newPost, setNewPost] = useState({
    postId: 0,
    title: "",
    school: "",
    post: "",
    time: new Date(),
  });
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // tallanne DB tai jtn
  const handleSubmit = () => {
    console.log("New Post Data:", newPost);
    closeModal();
    setNewPost({
      postId: (counter.current += 1),
      title: "",
      school: "",
      post: "",
      time: new Date(),
    });
    setLottie(true);
  };

  useEffect(() => {
    if (lottie) {
      setTimeout(() => {
        setLottie(false);
      }, 3000);
    }
  }, [lottie]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, [e.currentTarget.name]: e.currentTarget.value });
  };

  const options = {
    animationData: done,
    loop: false,
    autoplay: true,
  };
  return (
    <>
      {lottie ? (
        <div className="flex items-center ">
          <Lottie options={options} height={60}></Lottie>
        </div>
      ) : (
        <button className="bg-bor w-2/6 border-2 text-green border-green hover:bg-green hover:text-white rounded-lg mr-2 h-full lg:w-60 ">
          {user ? (
            <strong className=" text-lg" onClick={openModal}>
              Post
            </strong>
          ) : (
            <strong
              className=" text-lg"
              onClick={() => alert("KIRJAUDU SUISÖÖ")}
            >
              SingUp
            </strong>
          )}
        </button>
      )}
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Write a post</h2>
          <br />

          <form className="flex flex-col">
            <label htmlFor="postContent">Title:</label>
            <input
              name="title"
              className="bg-postgray rounded-md m-1"
              type="text"
              value={newPost.title}
              onChange={handleInputChange}
            />
            <label htmlFor="postContent">School:</label>
            <input
              name="school"
              className="bg-postgray rounded-md m-1"
              type="text"
              value={newPost.school}
              onChange={handleInputChange}
            />
            <label htmlFor="postContent">Post Content:</label>
            <textarea
              className="bg-postgray rounded-md m-1"
              name="post"
              id="postContent"
              value={newPost.post}
              onChange={handleInputChange}
              rows={6} // You can adjust this value for more/less space
              cols={50} // You can adjust this value for more/less space
            />
            <div className="flex flex-row">
              <button
                className="bg-green w-20 rounded-sm m-2"
                onClick={handleSubmit}
              >
                Post
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 w-20 rounded-sm m-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}
