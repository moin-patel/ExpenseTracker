import React, { useState } from "react";
import Input1 from "./../layouts/inputs/Input1";
import EmojiPickerPopUp from "../layouts/EmojiPickerPopUp";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className="space-y-5">
      {/* Decorative Header Sticker */}
      <div className="bg-indigo-50 p-4 rounded-2xl flex items-center gap-3 border border-indigo-100/50">
        <div className="bg-white p-2 rounded-xl shadow-sm text-xl">💰</div>
        <div>
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            Entry Details
          </p>
          <p className="text-sm text-indigo-900/60 font-medium italic">
            Fill in your earnings below
          </p>
        </div>
      </div>

      <EmojiPickerPopUp
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <div className="space-y-4">
        {/* Income Source Section */}
        <div className="group">
          <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1">
            SOURCE NAME
          </label>
          <Input1
            value={income.source}
            onChange={({ target }) => handleChange("source", target.value)}
            placeholder="e.g. Freelance project"
            type="text"
            className="w-full bg-slate-50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-100 rounded-2xl py-3.5 transition-all duration-300"
          />
        </div>

        {/* Amount Section */}
        <div className="group">
          <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1">
            TOTAL AMOUNT
          </label>
          <div className="relative">
            <Input1
              value={income.amount}
              onChange={({ target }) => handleChange("amount", target.value)}
              placeholder="0.00"
              type="number"
              className="w-full pl-9 bg-slate-50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-emerald-100 rounded-2xl py-3.5 transition-all duration-300"
            />
          </div>
        </div>

        {/* Date Section */}
        <div className="group">
          <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1">
            RECEIVED DATE
          </label>
          <Input1
            value={income.date}
            onChange={({ target }) => handleChange("date", target.value)}
            type="date"
            className="w-full bg-slate-50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-2xl py-3.5 transition-all duration-300"
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <button
          type="button"
          className="w-full group flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all duration-300 active:scale-[0.98]"
          onClick={() => onAddIncome(income)}
        >
          <span>Add incomne </span>
          <span className="text-lg group-hover:rotate-12 transition-transform">
            ✨
          </span>
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
