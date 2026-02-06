import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
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

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again later", error);
    } finally {
      setLoading(false);
    }
  };

  // CALL API WHEN COMPONENT LOADS
  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <>
      <DashboardLayout activeMenu="Dashboard" >
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<IoMdCard />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              color="bg-primary"
            />

            <InfoCard
              icon={<LuHandCoins />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              color="bg-green-500"
            />

            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
              color="bg-red-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentTransactions
              transaction={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/expense")}
            />
          </div>
        </div>
      </DashboardLayout>

      <FinanceOverview
        totalBalance={dashboardData?.totalBalance || 0}
        totalIncome={dashboardData?.totalBalance || 0}
        totalExpense={dashboardData?.totalBalance || 0}
      />
    </>
  );
};

 export default Home;

// import React, { useState, useEffect } from "react";
// import DashboardLayout from "../../components/layouts/DashboardLayout";
// import { useUserAuth } from "../../hooks/useUserAuth";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import InfoCard from "../../components/cards/InfoCard";
// import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
// import { IoMdCard } from "react-icons/io";
// import { addThousandsSeparator } from "../../utils/helper";
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
//       <div className="max-w-7xl mx-auto px-4 pt-8 pb-10">
//         {/* Top Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <InfoCard
//             icon={<IoMdCard size={24} />}
//             label="Total Balance"
//             value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
//             color="bg-indigo-600 shadow-md"
//           />
//           <InfoCard
//             icon={<LuHandCoins size={24} />}
//             label="Total Income"
//             value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
//             color="bg-emerald-500 shadow-md"
//           />
//           <InfoCard
//             icon={<LuWalletMinimal size={24} />}
//             label="Total Expense"
//             value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
//             color="bg-rose-500 shadow-md"
//           />
//         </div>

//         {/* Bottom Section - Balanced Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
//           {/* Recent Transactions Card */}
//           <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 min-h-[520px] flex flex-col">
//             <RecentTransactions
//               transaction={dashboardData?.recentTransactions}
//               onSeeMore={() => navigate("/expense")}
//             />
//           </div>

//           {/* Finance Overview Card */}
//           <div className="lg:col-span-5 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 min-h-[520px] flex flex-col">
//             <div className="mb-4">
//               <h3 className="text-lg font-bold text-slate-800">
//                 Financial Overview
//               </h3>
//               <p className="text-xs text-slate-400">
//                 Analysis of your balance and spending
//               </p>
//             </div>

//             <div className="flex-1 flex items-center justify-center w-full">
//               <FinanceOverview
//                 totalBalance={dashboardData?.totalBalance || 0}
//                 totalIncome={dashboardData?.totalIncome || 0}
//                 totalExpense={dashboardData?.totalExpense || 0}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Home;
