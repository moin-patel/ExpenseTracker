// import React from "react";
// import { LuArrowRight } from "react-icons/lu";
// import moment from "moment";
// import TransactionInfoCard from "../cards/TransactionInfoCard";

// const RecentTransactions = ({ transaction, onSeeMore }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 w-full">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h5 className="text-lg font-semibold text-gray-800">
//           Recent Transactions
//         </h5>

//         <button
//           className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
//           onClick={onSeeMore}
//         >
//           See All
//           <LuArrowRight className="text-base" />
//         </button>
//       </div>

//       {/* Transactions List */}
//       <div className="mt-6">
//         {transaction && transaction.length > 0 ? (
//           transaction
//             .slice(0, 5)
//             .map((item) => (
//               <TransactionInfoCard
//                 key={item._id}
//                 title={item.type === "expense" ? item.category : item.source}
//                 icon={item.icon}
//                 date={moment(item.date).format("Do MMM YYYY")}
//                 amount={item.amount}
//                 type={item.type}
//                 hideDeleteBtn
//               />
//             ))
//         ) : (
//           <p className="text-sm text-gray-500 text-center py-4 ">
//             No transactions found
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecentTransactions;

import React from "react";
import { LuArrowRight, LuInbox } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const RecentTransactions = ({ transaction, onSeeMore }) => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h5 className="text-xl font-bold text-slate-900 tracking-tight">
            Recent Transactions
          </h5>
          <p className="text-xs text-slate-400 mt-0.5">Your latest activities</p>
        </div>

        <button
          className="group flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-primary bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-all active:scale-95"
          onClick={onSeeMore}
        >
          See All
          <LuArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* List Container - Fixed Height Scrollable */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {transaction && transaction.length > 0 ? (
          <div className="space-y-3">
            {transaction.slice(0, 5).map((item) => (
              <TransactionInfoCard
                key={item._id}
                title={item.type === "expense" ? item.category : item.source}
                icon={item.icon}
                date={moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-10 opacity-60">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
              <LuInbox size={30} className="text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-500">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;