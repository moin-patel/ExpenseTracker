import React, { useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import Input1 from "../layouts/inputs/Input1";
import EmojiPickerPopup from "../layouts/EmojiPickerPopUp";

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "💸", // Default starting icon
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className="bg-white p-2 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
        <div className="flex-shrink-0">
          <EmojiPickerPopup
            icon={income.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
          />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-800 tracking-tight">
            Add New Expense
          </h4>
          <p className="text-xs text-slate-500">
            Record your spending to keep your budget on track
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Category Input */}
        <div className="relative group">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1 block">
            Category Name
          </label>
          <div className="relative">
            <Input1
              value={income.category}
              onChange={({ target }) => handleChange("category", target.value)}
              placeholder="Rent, Groceries, etc."
              type="text"
              className="w-full pl-11 pr-4 bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 rounded-2xl py-3.5 transition-all duration-300 outline-none border"
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="relative group">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1 block">
            Amount
          </label>
          <div className="relative">
            <Input1
              value={income.amount}
              onChange={({ target }) => handleChange("amount", target.value)}
              placeholder="0.00"
              type="number"
              className="w-full pl-11 pr-4 bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 rounded-2xl py-3.5 transition-all duration-300 outline-none border"
            />
          </div>
        </div>

        {/* Date Input */}
        <div className="relative group">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1 block">
            Transaction Date
          </label>
          <div className="relative">
            <Input1
              value={income.date}
              onChange={({ target }) => handleChange("date", target.value)}
              type="date"
              className="w-full pl-11 pr-4 bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 rounded-2xl py-3.5 transition-all duration-300 outline-none border text-slate-600"
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        className="group relative w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-slate-300 hover:-translate-y-1 active:scale-95 transition-all duration-300 overflow-hidden"
        onClick={() => onAddExpense(income)}
      >
        <div className="relative z-10 flex items-center justify-center gap-2">
          <span>ADD EXPENSE</span>
          <LuChevronRight className="group-hover:translate-x-1 transition-transform" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>
  );
};

export default AddExpenseForm;
