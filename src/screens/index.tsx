import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import Header from "../components/Header";
import Filter from "../components/Filter";
import Posts from "../components/Posts";

interface newPost {
  postId: string;
  title: string;
  school: string;
  post: string;
  time: string;
}

const Index = () => {
  const [searchBy, setSearchBy] = useState("Kaikki");
  const [allSchools, setAllSchools] = useState<string[][]>([]);

  // moduliin koulu vaihtoehdot
  const getAllSchools = (all: string[]) => {
    setAllSchools((prevState) => [...prevState, all]);
  };

  const getSchool = (item: string) => {
    setSearchBy(item);
  };

  useEffect(() => {
    const use = async () => {
      // aina tarkista että siellä on jotain muuten tulee se vi.. UNDEFINED
    };
    use();
  }, [searchBy]);

  // POSTAUKSELLE VASTAUS SIVUSTO eli lisää POST objektille vastaukset: string[]
  // klikatessa postausta lähetä postauksen id toiselle siuvlle ja sit hae se databasesta näytä postaus ja mapilla vastaukset
  // jos vastauksella on alle 0 upvote border red ja jos yli 0 nii green, jos 0 nii gray
  return (
    <div className="bg-white w-full min-h-screen ">
      <Header></Header>
      <Filter getSchool={getSchool}></Filter>
      <Posts searchBy={searchBy}></Posts>
    </div>
  );
};
export default Index;
