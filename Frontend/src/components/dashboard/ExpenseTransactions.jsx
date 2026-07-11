


import React from "react";
import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="bg-white w-full rounded-2xl sm:rounded-[2rem] border border-slate-100 
      p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition flex flex-col">

      <div className="flex flex-col sm:flex-row items-start sm:items-center 
        justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">

        <div>
          <h5 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">
            Recent Expenses
          </h5>
          <p className="text-xs sm:text-sm text-slate-400">
            Detailed view of your latest spending
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm 
            font-semibold text-indigo-600 bg-indigo-50 rounded-xl 
            hover:bg-indigo-100 transition shadow-sm"
          onClick={onSeeMore}
        >
          View All <span className="hidden sm:inline">Transactions</span>
          <LuArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 
        gap-3 sm:gap-5 lg:gap-6">

        {transactions?.length > 0 ? (
          transactions.slice(0, 6).map((expense) => (
            <div
              key={expense._id}
              className="bg-slate-50/50 rounded-xl sm:rounded-2xl 
                p-2 hover:bg-white transition border border-transparent 
                hover:border-slate-100 w-full"
            >
              <TransactionInfoCard
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format("Do MMM YYYY")}
                amount={expense.amount}
                type="expense"
                hideDeleteBtn
              />
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 sm:py-16 text-center">
            <p className="text-slate-400 italic text-sm">
              No expense records found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
