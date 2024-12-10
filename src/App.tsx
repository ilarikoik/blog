import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Posts from "./components/Posts";
import AddPost from "./components/AddPost";
function App() {
  const [searchBy, setSearchBy] = useState("Kaikki");

  const getSchool = (item: string) => {
    setSearchBy(item);
  };

  useEffect(() => {
    console.log("Updated searchBy:", searchBy);
  }, [searchBy]);
  return (
    <div className="bg-white w-full min-h-screen ">
      <Header></Header>
      <Filter getSchool={getSchool}></Filter>
      <Posts searchBy={searchBy}></Posts>
    </div>
  );
}

export default App;
