
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(
    user?.profileImageUrl
      ? `http://localhost:8000${user.profileImageUrl}?t=${Date.now()}`
      : ""
  );

  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
  const file = e.target.files[0];

  console.log("Selected File:", file);

  if (!file) return;

  setImage(file);
  setPreview(URL.createObjectURL(file));
};

  // Update Profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      return toast.error("Full Name is required");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("fullName", fullName);

      if (image) {
        formData.append("profileImage", image);
      }
      console.log([...formData.entries()]);
      // Update Profile
      await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      // Get Latest User
      const { data } = await axiosInstance.get(
        API_PATHS.AUTH.GET_USER_INFO
      );

      // Update Context
      updateUser(data);

      toast.success("Profile Updated Successfully");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
     
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Only JPG, JPEG and PNG images are allowed."
      );


    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-center mb-8">
          Update Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Profile Image */}
          <div className="flex justify-center">
            <label className="cursor-pointer">

              {preview ? (
                <img
                  src={preview}
                  alt="profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-primary text-white flex justify-center items-center text-5xl font-bold uppercase">
                  {fullName
                    ? fullName.charAt(0)
                    : "U"}
                </div>
              )}

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />

            </label>
          </div>

          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter Full Name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition-all"
          >
            {loading
              ? "Updating..."
              : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;