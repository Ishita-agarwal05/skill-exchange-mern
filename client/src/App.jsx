import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import Requests from "./pages/Requests";
import Connections from "./pages/Connections";
import ProposeSession from "./pages/ProposeSession";
import MySessions from "./pages/MySessions";
import Chat from "./pages/Chat";




function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/propose-session/:id" element={<ProposeSession />} />
        <Route path="/sessions" element={<MySessions />} />
        <Route path="/chat" element={<Chat />} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;

