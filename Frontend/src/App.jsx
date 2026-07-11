

import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/dashboard/Home";
import Expense from "./pages/dashboard/Expense";
import Income from "./pages/dashboard/Income";
import UpdateProfile from "./pages/dashboard/UpdateProfile";

import UserProvider from "./context/UserProvider";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <UserProvider>
      <div>
        <Routes>
          {/* Root */}
          <Route path="/" element={<Root />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
        </Routes>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          className: "text-sm font-medium",
          style: {
            fontSize: "13px",
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </UserProvider>
  );
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};