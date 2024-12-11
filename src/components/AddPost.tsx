import React, { ChangeEvent, useEffect, useRef } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import Lottie from "react-lottie";
import Modal from "react-modal";
import done from "../lottie/done.json";
import { addPostData } from "../firebase/db";
import formatDate from "../hooks/formatDate";

interface Post {
  postId: string;
  title: string;
  school: string;
  post: string;
  time: string;
}

//propseja lähetessä tää ja paramterinä pitää olla jotta errori hävii
interface User {
  user: boolean;
}

export default function AddPost({ user }: User) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [lottie, setLottie] = useState(false);
  let counter = useRef<number>(20);
  const [newPost, setNewPost] = useState<Post>({
    postId: "",
    title: "",
    school: "",
    post: "",
    time: "",
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
    // asetetaa aika tässä jo että se kerkii päivittyy enneku submit
    const now = formatDate(new Date());
    setNewPost({
      postId: "",
      title: "",
      school: "",
      post: "",
      time: now,
    });
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = () => {
    console.log("New Post Data:", newPost);
    closeModal();
    setLottie(true);
    addPostData(newPost);
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
    loop: false,
    animationData: done,
    autoplay: true,
  };
  return (
    <>
      {lottie ? (
        <div className="flex items-center justify-center ">
          <Lottie options={options} height={60}></Lottie>
        </div>
      ) : (
        <button className="text-yellow-400 font-semibold hover:shadow-sm hover:shadow-yellow-400 border-2 border-postgray h-8 hover:border-yellow-400 p-3 rounded-md flex items-center">
          {user ? (
            <p className="" onClick={openModal}>
              Post
            </p>
          ) : (
            <strong onClick={() => alert("KIRJAUDU SUISÖÖ")}>SingUp</strong>
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
