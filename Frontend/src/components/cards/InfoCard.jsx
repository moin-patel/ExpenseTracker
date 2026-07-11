import React from "react";

const InfoCard = ({ icon, label, value, color = "bg-blue-500" }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer w-full">
      {/* Icon Box */}
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-xl text-white text-2xl ${color}`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <h6 className="text-sm text-gray-500 font-medium">{label}</h6>
        <span className="text-xl font-bold text-gray-800 mt-1">{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
