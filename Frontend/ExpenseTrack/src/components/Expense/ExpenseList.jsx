import React from "react";
import moment from "moment";
import { LuDownload, LuTrendingDown } from "react-icons/lu";
import TransactionInfoCard from "./../cards/TransactionInfoCard";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 mt-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <LuTrendingDown size={20} />
          </div>
          <div>
            <h5 className="text-lg font-bold text-slate-800 tracking-tight">
              Expense History
            </h5>
            <p className="text-xs text-slate-500">
              View and manage your recent outgoings
            </p>
          </div>
        </div>

        <button
          className="group flex items-center gap-2 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
          onClick={onDownload}
        >
          <LuDownload className="text-base group-hover:bounce" />
          <span>Download CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {transactions?.length > 0 ? (
          transactions.map((expense) => (
            <div
              key={expense._id}
              className="hover:scale-[1.02] transition-transform duration-300"
            >
              <TransactionInfoCard
                title={expense.category} // Changed from source to category
                icon={expense.icon}
                date={moment(expense.date).format("Do MMM YYYY")}
                amount={expense.amount}
                type="expense" // Passing type as expense for red styling in the card
                onDelete={() => onDelete(expense._id)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl">
            <p className="text-slate-400 text-sm italic font-medium">
              No expenses recorded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
