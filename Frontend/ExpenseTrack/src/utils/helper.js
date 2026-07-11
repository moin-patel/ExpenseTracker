// export const validateEmail = (email) => {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// };

// export const getInitials = (name) => {
//   if (!name) return "";

//   const words = name.split(" ");
//   let initials = "";

//   for (let i = 0; i < Math.min(words.length, 2); i++) {
//     initials += words[i][0];
//   }

//   return initials.toUpperCase();
// };
// export const addThousandsSeparator = (num) => {
//   if (num == null || isNaN(num)) return "";

//   const [integerPart, fractionalPart] = num.toString().split(".");
//   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//   return fractionalPart
//     ? `${formattedInteger}.${fractionalPart}`
//     : formattedInteger;
// };

// export const prepareExpenseBarChartData = (data = []) => {
//   const chartData = data.map((item) => ({
//     category: item.category,
//     amount: item.amount,
//   }));

//   return chartData;
// };

import moment from "moment";
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

// 🔥 FIXED FUNCTION
export const prepareExpenseBarChartData = (data = []) => {
  return data.map((item, index) => ({
    month: `Day ${index + 1}`, // X axis label
    category: item.category,
    amount: item.amount,
  }));
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  return sortedData.map((item) => ({
    month: moment(item?.date).format("DD MMM"), // Example: 16 Feb
    amount: item?.amount,
    source: item?.source,
  }));
};

export const prepareExpenseLineChartData = (data = []) => {
  if (!data || !Array.isArray(data)) return [];

  // Data ko date ke hisaab se sort karein
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sortedData.map((item) => ({
    month: item?.date ? moment(item.date).format("D MMM") : "N/A",
    amount: Number(item?.amount) || 0,
    category: item?.category || "General",
  }));
};