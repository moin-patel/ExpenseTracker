// import React from "react";
// import CustomPieChart from "../charts/CustomPieChart";

// const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

// const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
//   const balanceData = [
//     { name: "Total Balance", amount: totalBalance },
//     { name: "Total Expenses", amount: totalExpense },
//     { name: "Total Income", amount: totalIncome },
//   ];

//   return (
//     <div className="card">
//       <div className="flex items-center justify-between">
//         <h5 className="text-lg">Financial Overview</h5>
//       </div>

//       <CustomPieChart
//         data={balanceData}
//         label="Total Balance"
//         totalAmount={`$${totalBalance}`}
//         colors={COLORS}
//         showTextAnchor
//       />
//     </div>
//   );
// };

// export default FinanceOverview;


import React from "react";
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div
      className="
        w-full h-full bg-white 
        rounded-2xl sm:rounded-[2rem]
        border border-slate-100
        p-4 sm:p-6 lg:p-8
        shadow-xl
        flex flex-col
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h5 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800">
          Financial Overview
        </h5>
      </div>

      {/* Chart Wrapper */}
      <div
        className="
          flex-1 w-full 
          min-h-[220px] 
          sm:min-h-[260px] 
          md:min-h-[300px] 
          lg:min-h-[340px]
          flex items-center justify-center
        "
      >
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`$${totalBalance}`}
          colors={COLORS}
          showTextAnchor
        />
      </div>
    </div>
  );
};

export default FinanceOverview;
