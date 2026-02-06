import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import CustomToolTip from "./CustomToolTip";

const CustomPieChart = ({
  data = [],
  colors = [],
  showTextAnchor = false,
  label = "",
  totalAmount = "",
}) => {
  // Safety check – agar data nahi hai to empty chart na bane
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-[380px] text-gray-500">
        No Data Available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length] || "#8884d8"}
            />
          ))}
        </Pie>

        {/* FIXED TOOLTIP */}
        <Tooltip content={<CustomToolTip />} />
        <Legend />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-20}
              textAnchor="middle"
              fill="#666"
              fontSize="14"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={10}
              textAnchor="middle"
              fill="#333"
              fontSize="22"
              fontWeight="600"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
