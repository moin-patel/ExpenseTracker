import React, { useEffect, useState } from "react";

// Icon import karna zaroori hai
import { LuPlus } from "react-icons/lu";
// Agar aapke paas CustomBarChart hai to ise uncomment karein
import CustomBarChart from "../charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    // Transactions data ko chart format mein convert karna
    const result = prepareIncomeBarChartData(transactions);
    setIncomeData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          {/* LuPlus tabhi dikhega jab ise import kiya gaya ho */}
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={incomeData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
