import React from 'react';

const CustomLegend = ({ payload }) => {
  return (
    // Container: Flexbox that wraps on small screens, centered with spacing
    <div className="flex flex-wrap justify-center gap-4 mt-4 space-x-6">
      {payload.map((entry, index) => (
        <div 
          key={`legend-${index}`} 
          className="flex items-center space-x-2"
        >
          {/* Color Indicator: Fixed size with rounded corners */}
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          
          {/* Label: Responsive text size */}
          <span className="text-xs md:text-base font-medium text-gray-700">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;