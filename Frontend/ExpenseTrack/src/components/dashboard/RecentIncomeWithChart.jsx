import React, { useEffect, useState } from "react";
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr || []);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div
      className="
        w-full
        bg-white
        rounded-2xl
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        p-4 sm:p-6
        border border-gray-100
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 mb-4">
        <h5 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          💼 Income Insights
        </h5>

        <span className="text-xs sm:text-sm text-gray-400 font-medium text-center flex-1">
          Visualize Your Income Performance
        </span>

        <span className="text-xs sm:text-sm font-semibold text-purple-600">
          Growth
        </span>
      </div>

      {/* Chart Area */}
      <div className="bg-purple-50/40 rounded-xl p-3">
        <div
          className="
            w-full
            min-h-[210px]
            sm:min-h-[240px]
            md:min-h-[270px]
            flex
            items-center
            justify-center
          "
        >
          <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            showTextAnchor
            colors={COLORS}
          />
        </div>
      </div>

      {/* Bottom Info */}
      <p className="text-xs text-gray-500 text-center mt-3">
        Track your earnings distribution and growth trends
      </p>
    </div>
  );
};

export default RecentIncomeWithChart;
