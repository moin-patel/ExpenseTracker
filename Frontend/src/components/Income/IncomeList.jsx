import React from "react";
import moment from "moment";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "./../cards/TransactionInfoCard";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card mt-6">
      <div className="flex items-center justify-between mb-5">
        <h5 className="text-lg font-bold text-slate-800">Income Sources</h5>

        <button
          className="card-btn flex items-center gap-2"
          onClick={onDownload}
        >
          <LuDownload className="text-base" /> Download CSV
        </button>
      </div>

      {/* Grid mein gap-4/6 add kiya hai spacing ke liye */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {transactions?.length > 0 ? (
          transactions.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          <p className="text-slate-400 text-sm italic py-4">
            No income sources found.
          </p>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
