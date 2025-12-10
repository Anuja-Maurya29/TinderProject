import React from "react";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import Requests from "../pages/Request";
import Connections from "../pages/Connection";
import EditProfile from "../pages/EditProfile";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/feed" element={<Feed />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfile/>}/>
        <Route path="/connections" element={<Connections />} />
        <Route path="/requests" element={<Requests />} />
      </Route>
    </Routes>
  );
};

export default Routing;
