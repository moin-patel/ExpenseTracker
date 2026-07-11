import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  // Fixed: Added return and corrected 'br-red' typo to 'bg-red'
  const getAmountStyles = () => {
    return type === "income"
      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
      : "bg-rose-50 text-rose-600 border-rose-100";
  };

  return (
    <div className="group relative flex items-center gap-4 mt-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">
      {/* Icon Section - Added soft shadow and better centering */}
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 group-hover:scale-110 transition-transform duration-300 shadow-inner">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils size={22} />
        )}
      </div>

      {/* Info Section - Improved spacing and font weights */}
      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-bold text-slate-800 truncate leading-tight">
          {title}
        </h4>
        <p className="text-xs font-medium text-slate-400 mt-0.5">{date}</p>
      </div>

      {/* Action and Amount Section */}
      <div className="flex items-center gap-2">
        {!hideDeleteBtn && (
          <button
            className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
            onClick={onDelete}
            title="Delete Transaction"
          >
            <LuTrash2 size={18} />
          </button>
        )}

        {/* Amount Badge - Added border and semi-bold text */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] font-bold shadow-sm ${getAmountStyles()}`}
        >
          <span>
            {type === "income" ? "+" : "-"} ${amount}
          </span>
          {type === "income" ? (
            <LuTrendingUp size={14} className="stroke-[3px]" />
          ) : (
            <LuTrendingDown size={14} className="stroke-[3px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
