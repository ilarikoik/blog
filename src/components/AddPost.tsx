import React, { ChangeEvent, useEffect, useRef } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import Lottie from "react-lottie";
import Modal from "react-modal";
import done from "../lottie/done.json";
import { addPostData } from "../firebase/db";
import formatDate from "../hooks/formatDate";
import { schools } from "../data/schools";
import { newPost } from "../interfaces/postInterface";

//propseja lähetessä tää ja paramterinä pitää olla jotta errori hävii
interface User {
  loggedInUser: boolean;
  uid: string;
}
interface Toggle {
  toggle: boolean;
  toggleState: () => void;
}
interface AddPostProps extends User, Toggle {}

export default function AddPost({
  loggedInUser,
  uid,
  toggle,
  toggleState,
}: AddPostProps) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [lottie, setLottie] = useState(false);
  const [newPost, setNewPost] = useState<newPost>({
    postId: "",
    posterUid: "",
    title: "",
    school: "",
    post: "",
    time: "",
    answers: [],
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
      posterUid: uid, // hae db käyttääjn nimi
      title: "",
      school: "",
      post: "",
      time: now,
      answers: [],
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
    toggleState(); // vaihellaa posts komponentin togglea
  };

  useEffect(() => {
    if (lottie) {
      setTimeout(() => {
        setLottie(false);
      }, 3000);
    }
  }, [lottie]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // muokataa objektia , attribuutti, arvo
    setNewPost({ ...newPost, school: e.target.value });
  };

  const handleInputChangeArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost({
      ...newPost,
      post: e.target.value, // Update the state with the new value from the textarea
    });
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
        <>
          {loggedInUser && (
            <div className="bg-white h-fit rounded-xl w-fit p-2 cursor-pointer border-2 border-postgray hover:border-orange-500 hover:shadow-md hover:shadow-orange-500 mb-5">
              <h1
                className=" text-orange-500 text-xl flex justify-center items-center"
                onClick={openModal}
              >
                {"-->"} uusi julkaisu
              </h1>
            </div>
          )}
        </>
      )}
      <div className="bg-red-500">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <h2>Write a post</h2>
          <br />

          <form className="flex flex-col w-60 md:w-full">
            <label htmlFor="postContent">Title:</label>
            <input
              name="title"
              className="border-none p-1 rounded-md bg-bor shadow-black shadow-sm transition-all"
              type="text"
              value={newPost.title}
              onChange={handleInputChange}
            />
            <label htmlFor="postContent">School:</label>

            <select
              id="postContent"
              onChange={handleSchoolChange}
              className="border-none p-1 rounded-md bg-bor shadow-black shadow-sm
            transition-all"
            >
              {schools.length > 0 ? (
                schools.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={item}
                      className="border-none p-1 rounded-md bg-bor shadow-black shadow-sm transition-all"
                    >
                      {item}
                    </option>
                  );
                })
              ) : (
                <option value="" disabled>
                  No schools available
                </option>
              )}
            </select>
            {/*<input
              name="school"
              className="bg-postgray rounded-md m-1"
              type="text"
              value={newPost.school}
              onChange={handleInputChange}
            />*/}
            <label htmlFor="postContent">Post Content:</label>
            <textarea
              className="border-none p-1 rounded-md bg-bor shadow-black shadow-sm transition-all"
              name="post"
              id="postContent"
              value={newPost.post}
              onChange={handleInputChangeArea}
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
