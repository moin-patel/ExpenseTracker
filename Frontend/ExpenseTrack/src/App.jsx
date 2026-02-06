// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Login from "./pages/Auth/Login";
// import SignUp from "./pages/Auth/SignUp";
// import Home from "./pages/dashboard/Home";
// import Expense from "./pages/dashboard/Expense";
// import Income from "./pages/dashboard/Income";
// import UserProvider from "./context/UserContext";

// export default function App() {
//   return (
//     <UserProvider>
//     <div>
//       <Routes>
//         <Route path="/" element={<Root />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/dashboard" element={<Home />} />
//         <Route path="/expense" element={<Expense />} />
//         <Route path="/income" element={<Income />} />
//       </Routes>
//     </div>
//     </UserProvider>
//   );
// }

// const Root = () => {
//   // check if user is authenticated
//   const isAuthenticated = !!localStorage.getItem("token");
//   // redirect based on authentication status
//   return isAuthenticated ? (
//     <Navigate to="/dashboard" />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/dashboard/Home";
import Expense from "./pages/dashboard/Expense";
import Income from "./pages/dashboard/Income";
import UserProvider from "./context/UserProvider";

export default function App() {
  return (
    <UserProvider>
      <div>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
