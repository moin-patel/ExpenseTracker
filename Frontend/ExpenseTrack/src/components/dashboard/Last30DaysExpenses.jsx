
import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../charts/CustomBarChart";

const Last30DaysExpenses = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  return (
    <div className="bg-white w-full h-full rounded-2xl sm:rounded-[2rem] 
      border border-slate-100 p-4 sm:p-6 lg:p-8 shadow-xl 
      hover:shadow-2xl transition flex flex-col">

      <h5 className="text-base sm:text-lg lg:text-xl 
        font-bold text-slate-800 mb-1 sm:mb-2">
        Last 30 Days Expenses
      </h5>

      <p className="text-[11px] sm:text-xs text-slate-400 mb-4 sm:mb-6">
        Daily spending visualization
      </p>

      <div className="flex-1 min-h-[220px] sm:min-h-[280px] 
        lg:min-h-[350px] w-full mt-auto">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default Last30DaysExpenses;
