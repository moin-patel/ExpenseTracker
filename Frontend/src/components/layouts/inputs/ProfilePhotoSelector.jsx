import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewURL(null);
  };

  return (
    <div className="flex justify-center mb-4 mr-44">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div
          onClick={() => inputRef.current.click()}
          className="relative w-28 h-28 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 
          flex items-center justify-center cursor-pointer hover:border-purple-500 transition"
        >
          <LuUser size={42} className="text-gray-400" />

          <div
            className="absolute bottom-1 right-1 bg-purple-600 text-white p-2 rounded-full 
            hover:bg-purple-700 shadow-md"
          >
            <LuUpload size={16} />
          </div>
        </div>
      ) : (
        <div className="relative w-28 h-28">
          <img
            src={previewURL}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-gray-200"
          />

          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute bottom-1 right-1 bg-red-600 text-white p-2 rounded-full 
            hover:bg-red-700 shadow-md"
          >
            <LuTrash size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
