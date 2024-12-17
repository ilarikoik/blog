import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { addUserNameAndUid, getUserByUsername } from "../firebase/db";
import { getUser } from "../auth/userState";

interface CustomAlertProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CustomAlert({ setShowModal }: CustomAlertProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [uid, setUid] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch user data when the component is mounted
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      if (fetchedUser && fetchedUser.uid) {
        setUid(fetchedUser.uid);
      } else {
        setIsModalOpen(true);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    if (!inputValue || !uid) {
      console.log("Please fill in the username and ensure uid is valid.");
      return;
    }

    // laitetaa objekti kasaa vast enne lähettämistä muut ei oo kärryiil
    const data = {
      username: inputValue,
      uid: uid,
    };

    let unique = await getUserByUsername(inputValue);
    if (unique !== null) {
      alert(`${inputValue} on jo käytössä, valitse toinen nimi.`);
      return;
    }
    try {
      //console.log("Submitting data:", JSON.stringify(data));
      await addUserNameAndUid(data);
      closeModal();
    } catch (error) {
      console.error("Error submitting data:", error);
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
            <h2 className="text-lg font-semibold">Username:</h2>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type here"
              className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 ">
              <button
                onClick={handleSubmit}
                className="mr-2 bg-blue-500 text-green rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
