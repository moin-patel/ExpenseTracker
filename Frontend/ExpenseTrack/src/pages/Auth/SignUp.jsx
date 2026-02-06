import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input1 from "../../components/layouts/inputs/Input1";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import ProfilePhotoSelector from "../../components/layouts/inputs/ProfilePhotoSelector";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";
// import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileimageUrl = "";

    if (!name) {
      setError("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    setError("");

    // 👉 API CALL TO REGISTER USER WILL GO HERE
    try {
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileimageUrl = imageUploadRes.imageUrl || "";
      }

      // const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      //   name,
      //   email,
      //   password,
      //   profileimageUrl,
      // });

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: name,
        email,
        password,
        profileImageUrl: profileimageUrl,
      });

      const { token, ...userData } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(userData);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full flex flex-col justify-center">
        <h3 className="text-2xl mt-12">Create your account</h3>

        <p className="text-gray-600 mb-8 text-xs">
          Join us today by entering your details here
        </p>

        <form onSubmit={handleSignUp} className="space-y-4 mt-4 mb-8">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <Input1
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            label="Full Name"
          />

          <Input1
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            label="Email Address"
          />

          <Input1
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            label="Password"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-[77%] bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg mt-1 transition"
          >
            <h5>SIGN UP</h5>
          </button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
