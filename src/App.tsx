import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Posts from "./components/Posts";
import AddPost from "./components/AddPost";
import config from "./config";
import { getData } from "./firebase/db";
import formatDate from "./hooks/formatDate";
import SortPostByDate from "./hooks/sortPostByDate";

interface newPost {
  postId: string;
  title: string;
  school: string;
  post: string;
  time: string;
}
function App() {
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
      let use = await getData();
      console.log(use);
      // aina tarkista että siellä on jotain muuten tulee se vi.. UNDEFINED
      if (use) {
        let sorted = SortPostByDate(use);
        console.log(sorted);
      }
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
}

export default App;
