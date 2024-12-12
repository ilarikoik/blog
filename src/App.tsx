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
import Profile from "./screens/profile";
import Index from "./screens";
import Reply from "./screens/reply";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reply" element={<Reply />} />
      </Routes>
    </Router>
  );
}

export default App;
