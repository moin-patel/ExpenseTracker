

import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Agar user already context me hai to dobara API call mat karo
    if (user) return;

    const fetchUserInfo = async () => {
      try {
        const { data } = await axiosInstance.get(
          API_PATHS.AUTH.GET_USER_INFO
        );

        // Context me latest user save karo
        updateUser(data);
      } catch (error) {
        console.log("Authentication Error:", error);

        // Invalid token ya login nahi hai
        localStorage.removeItem("token");
        clearUser();

        navigate("/login");
      }
    };

    fetchUserInfo();
  }, [user, updateUser, clearUser, navigate]);

  return user;
};