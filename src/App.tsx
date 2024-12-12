import "./App.css";
import Profile from "./screens/profile";
import Index from "./screens";
import Reply from "./screens/reply";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// sorttaus uusin eka postauksissa ei ota huomioo päivämäärää atm
// postauksiin pitää lisää taulukko vastauksille (objekti: title, kättäjätunnus, postaus, UID )
// postauksiin firebasen UID jotta voidaan profiilissa hakea ne kaikki omat postaukset
//
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
