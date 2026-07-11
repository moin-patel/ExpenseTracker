// import React, { useState, useEffect } from "react";
// import DashboardLayout from "../../components/layouts/DashboardLayout";
// import { useUserAuth } from "../../hooks/useUserAuth";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import InfoCard from "../../components/cards/InfoCard";
// import { LuHandCoins, LuWalletMinimal, LuTrendingUp } from "react-icons/lu";
// import { IoMdCard } from "react-icons/io";
// import { addThousandsSeparator } from "../../utils/helper";

// import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
// import Last30DaysExpenses from "../../components/dashboard/Last30DaysExpenses";
// import RecentTransactions from "../../components/dashboard/RecentTransactions";
// import FinanceOverview from "../../components/dashboard/FinanceOverview";

// const Home = () => {
//   useUserAuth();
//   const navigate = useNavigate();
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchDashboardData = async () => {
//     if (loading) return;
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
//       if (response.data) setDashboardData(response.data);
//     } catch (error) {
//       console.log("Error fetching data", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   return (
//     <DashboardLayout activeMenu="Dashboard">
//       {/* MAIN CONTAINER */}
//       <div className="w-full mx-auto px-3 sm:px-6 lg:px-12 pt-6 sm:pt-8 pb-8 sm:pb-10">

//         {/* HEADER */}
//         <div className="mb-6 sm:mb-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
//             Dashboard
//           </h1>
//           <p className="text-xs sm:text-sm text-slate-500 mt-1">
//             Welcome back! Manage your finances globally.
//           </p>
//         </div>

//         {/* TOP INFO CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-8 sm:mb-10">
//           <InfoCard
//             icon={<IoMdCard size={26} />}
//             label="Total Balance"
//             value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
//             color="bg-indigo-600 shadow-xl shadow-indigo-100"
//           />
//           <InfoCard
//             icon={<LuHandCoins size={26} />}
//             label="Total Income"
//             value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
//             color="bg-emerald-500 shadow-xl shadow-emerald-100"
//           />
//           <InfoCard
//             icon={<LuWalletMinimal size={26} />}
//             label="Total Expense"
//             value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
//             color="bg-rose-500 shadow-xl shadow-rose-100"
//           />
//         </div>

//         {/* MAIN SECTIONS */}
//         <div className="flex flex-col gap-8 sm:gap-10">

//           {/* ROW 1 */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

//             {/* FINANCE OVERVIEW */}
//             <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-[2rem]
//               shadow-xl border border-slate-100 p-4 sm:p-6 lg:p-8">

//               <h3 className="text-lg sm:text-xl font-bold text-slate-800
//                 flex items-center gap-2 mb-4 sm:mb-6">
//                 <LuTrendingUp className="text-indigo-500" />
//                 Financial Overview
//               </h3>

//               <div className="h-[240px] sm:h-[300px] md:h-[340px] lg:h-[400px] w-full">
//                 <FinanceOverview
//                   totalBalance={dashboardData?.totalBalance || 0}
//                   totalIncome={dashboardData?.totalIncome || 0}
//                   totalExpense={dashboardData?.totalExpense || 0}
//                 />
//               </div>
//             </div>

//             {/* RECENT TRANSACTIONS */}
//             <div className="lg:col-span-4">
//               <RecentTransactions
//                 transaction={dashboardData?.recentTransactions}
//                 onSeeMore={() => navigate("/expense")}
//               />
//             </div>
//           </div>

//           {/* ROW 2 – EXPENSE TRANSACTIONS */}
//           <div className="w-full">
//             <ExpenseTransactions
//               transactions={dashboardData?.recentTransactions || []}
//               onSeeMore={() => navigate("/expense")}
//             />
//           </div>

//           {/* ROW 3 – LAST 30 DAYS CHART */}
//           <div className="w-full">
//             <Last30DaysExpenses
//               data={dashboardData?.recentTransactions || []}
//             />
//           </div>

//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/cards/InfoCard";
import { LuHandCoins, LuWalletMinimal, LuTrendingUp } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";

import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/dashboard/Last30DaysExpenses";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/dashboard/RecentIncome";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) setDashboardData(response.data);
    } catch (error) {
      console.log("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const incomeTransactions =
    dashboardData?.recentTransactions?.filter((t) => t.type === "income") || [];

  const expenseTransactions =
    dashboardData?.recentTransactions?.filter((t) => t.type === "expense") ||
    [];

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* CONTAINER */}
      <div className="w-full mx-auto px-3 sm:px-6 lg:px-12 pt-6 sm:pt-8 pb-8 sm:pb-10">
        {/* HEADER */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Welcome back! Manage your finances globally.
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-8 sm:mb-10">
          <InfoCard
            icon={<IoMdCard size={26} />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-indigo-600 shadow-xl shadow-indigo-100"
          />
          <InfoCard
            icon={<LuHandCoins size={26} />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-emerald-500 shadow-xl shadow-emerald-100"
          />
          <InfoCard
            icon={<LuWalletMinimal size={26} />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-rose-500 shadow-xl shadow-rose-100"
          />
        </div>

        {/* MAIN SECTIONS */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* ROW 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* FINANCE OVERVIEW */}
            <div className="lg:col-span-8">
              <FinanceOverview
                totalBalance={dashboardData?.totalBalance || 0}
                totalIncome={dashboardData?.totalIncome || 0}
                totalExpense={dashboardData?.totalExpense || 0}
              />
            </div>

            {/* RECENT TRANSACTIONS */}
            <div className="lg:col-span-4">
              <RecentTransactions
                transaction={dashboardData?.recentTransactions}
                onSeeMore={() => navigate("/expense")}
              />
            </div>
          </div>

          {/* ROW 2 – EXPENSES */}

          <ExpenseTransactions
            transactions={expenseTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          {/* ROW 3 – CHART */}
          <Last30DaysExpenses data={expenseTransactions} />

          <RecentIncomeWithChart
            data={incomeTransactions}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={incomeTransactions}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
