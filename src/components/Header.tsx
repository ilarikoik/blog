import { useState } from "react";
import AddPost from "./AddPost";
import Lottie from "react-lottie";
import blog from "../lottie/blog.json";
import { Link } from "react-router-dom";
import Slider from "./SliderMenu";
import { loggedInSites } from "../data/loggedInSites";

export default function Header() {
  const user = true;

  const options = {
    animationData: blog,
    loop: true,
    autoplay: true,
  };

  return (
    <>
      <div className="h-fit w-full bg-bor flex flex-row md:hidden">
        <div className="flex justify-start">
          <Lottie options={options} height={80} />
          <h1 className="flex items-center w-2/4 ">
            <strong>BLGO</strong>
          </h1>
        </div>
        <div className=" w-full flex justify-end items-center">
          <Slider></Slider>
        </div>
        <hr className="h-1 bg-gray border-none" />
      </div>
      {/*ylempi on md asti ja alempi sen jälkeen */}
      <div className="hidden h-fit w-full bg-bor md:flex flex-row justify-center">
        <div className="flex justify-evenly items-center w-3/6">
          <Lottie options={options} height={80} />
        </div>
      </div>
      <div className="h-fit flex justify-end bg-bor p-2">
        <div className="hidden md:flex w-3/6  justify-between">
          {user ? (
            Array.isArray(loggedInSites) &&
            loggedInSites.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.screen}
                  className="text-orange-500 text-xl hover:underline "
                >
                  {item.name}
                </Link>
              );
            })
          ) : (
            <p className="text-red-500 font-semibold hover:shadow-md cursor-pointer hover:shadow-red-700 border-2 border-postgray h-8 hover:border-red-300 p-3 rounded-md flex items-center ml-2">
              LogIn
            </p>
          )}
        </div>
      </div>
      <hr className="h-1 bg-gray border-none" />
    </>
  );
}
