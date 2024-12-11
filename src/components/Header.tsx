import { useState } from "react";
import AddPost from "./AddPost";
import Lottie from "react-lottie";
import blog from "../lottie/blog.json";
export default function Header() {
  const user = true;

  const options = {
    animationData: blog,
    loop: true,
    autoplay: true,
  };
  return (
    <>
      <div className="h-fit w-full bg-bor flex flex-row justify-center items-center">
        <div className="flex justify-start">
          <Lottie options={options} height={80} />
          <h1 className="flex items-center w-2/4 ">
            <strong>BLGO</strong>
          </h1>
        </div>
        <div className="h-16 w-4/5 bg-bor p-3 flex justify-end">
          <AddPost user={user}></AddPost>
          {!user ? (
            <p className="text-green font-semibold hover:shadow-sm hover:shadow-green border-2 border-postgray h-8 hover:border-green p-3 rounded-md flex items-center ml-2">
              LogIn
            </p>
          ) : (
            <p className="text-red-500 font-semibold hover:shadow-md hover:shadow-red-700 border-2 border-postgray h-8 hover:border-red-300 p-3 rounded-md flex items-center ml-2">
              LogOut
            </p>
          )}
        </div>
      </div>
      <hr className="h-1 bg-gray border-none" />
    </>
  );
}
