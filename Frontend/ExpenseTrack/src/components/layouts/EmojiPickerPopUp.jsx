
import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="group flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
        onClick={() => setIsOpen(true)}
      >     
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
          {icon ? (
            <img src={icon} alt="Icon" className="w-10 h-10 object-contain" />
          ) : (
            <LuImage size={24} />
          )}
        </div>

        <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {isOpen && (
        /* Changed 'left-0' to 'left-full ml-4' and adjusted origin */
        <div className="absolute z-50 top-0 left-full ml-4 bg-white shadow-2xl rounded-2xl border border-gray-100 p-2 transform transition-all scale-100 origin-left">
          <button
            className="absolute top-2 right-2 z-10 p-1 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border border-gray-100 shadow-sm"
            onClick={() => setIsOpen(false)}
          >
            <LuX size={18} />
          </button>

          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => {
                onSelect(emoji?.imageUrl || "");
                setIsOpen(false); // Added for better UX: close after picking
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;