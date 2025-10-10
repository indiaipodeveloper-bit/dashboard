import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Admins from "./pages/Admins";
import Users from "./pages/Users";
import News from "./pages/News";
import Meetings from "./pages/Meetings";
import Blogs from "./pages/Blogs";
import BusinessDetails from "./pages/BusinessDetails";
import FinancialDetails from "./pages/FinancialDetails";
import Header from "../components/Header";
import Login from "./pages/Login";

function App() {
  const getuserDetails = async () => {};
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/dashboard" element={<Analytics />} />
        <Route path="/users" element={<Users />} />
        <Route path="/news" element={<News />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/financial-details" element={<FinancialDetails />} />
        <Route path="/business-details" element={<BusinessDetails />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
