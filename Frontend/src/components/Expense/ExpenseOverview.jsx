import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import CustomLineChart from "../charts/CustomLineChart";
import { prepareExpenseLineChartData } from "../../utils/helper";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg font-semibold">Expense Overview</h5>
          <p className="text-sm text-slate-500">
            Track your spending trends over time and gain insights where your
            money goes.
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-80 transition-all"
          onClick={onExpenseIncome}
        >
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div> // This was followed by an extra </div> which I removed
  );
};

export default ExpenseOverview;
