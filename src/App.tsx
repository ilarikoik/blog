import "./App.css";
import Profile from "./screens/profile";
import Index from "./screens";
import Reply from "./screens/reply";
import LoginPage from "./screens/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// sorttaus uusin eka postauksissa ei ota huomioo päivämäärää atm
// jos poistaa postauksen nii pelkkä käyttäjän nimi hävii siitä ? taisit postaus tyhjenee mut vastaukset näkyy kuitenki JA delete nappi profiiliin omiin postauksiin vaan
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reply" element={<Reply />} />
      </Routes>
    </Router>
  );
}

export default App;
