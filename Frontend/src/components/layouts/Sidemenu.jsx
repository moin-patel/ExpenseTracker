

import React, { useContext, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvtar from "../cards/CharAvtar";
const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleClick = (route) => {
    if (route === "logout") {
      setShowLogoutModal(true);
      return;
    }
    navigate(route);
  };
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowLogoutModal(false);
    navigate("/login");
  };
  const imageUrl = user?.profileImageUrl
    ? `http://localhost:8000${user.profileImageUrl}`
    : "";
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      {/* Profile Section */}
      <div
        onClick={() => navigate("/updateProfile")}
        className="flex flex-col items-center justify-center gap-3 mt-3 mb-7 cursor-pointer hover:bg-gray-50 rounded-xl p-3 transition"
      >
        {
          user?.profileImageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
          ) : (
            <CharAvtar
              fullName={user?.fullName}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )
        }
        <h5 className="text-gray-900 font-semibold">
          {user?.fullName}
        </h5>
      </div>
      {/* Menu Items */}
      <div>
        {
          SIDE_MENU_DATA.map((item,index)=>(
            <button
              key={index}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition ${
                activeMenu === item.label
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="text-xl" />
              {item.label}
            </button>
          ))
        }
      </div>
      {/* Logout Confirmation Modal */}
      {
        showLogoutModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]">
            <div className="bg-white rounded-xl p-6 w-[350px] shadow-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Are you sure?
              </h2>
              <p className="text-gray-600 mb-6">
                Do you really want to logout?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"

                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"

                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};


export default SideMenu;