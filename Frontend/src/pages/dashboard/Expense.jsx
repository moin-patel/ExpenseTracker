import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

// Hooks & Utils
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

// Components
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Modal from "../../components/layouts/Modal";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // 1. Fetch Expenses
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`,
      );
      if (response.data) {
        setExpenseData(response.data.expenses || response.data);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast.error("Failed to load expenses.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category || !category.trim()) {
      toast.error("Category is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be greater than zero");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Add Expense Error:", error);
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };

  // 3. Delete Expense
  const deleteExpense = async () => {
    const id = openDeleteAlert.data;
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  // 4. Download Excel
  const handleDownloadExpenseDetails = () => {
    if (expenseData.length === 0) {
      toast.error("No data available to download");
      return;
    }

    const dataToExport = expenseData.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: new Date(item.date).toLocaleDateString(),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, `Expense_Details_${Date.now()}.xlsx`);
    toast.success("Downloading started...");
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* Overview Chart Section */}
          <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)}
          />

          {/* List Section */}
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        {/* Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* Delete Confirmation Alert */}
        {openDeleteAlert.show && (
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <div className="p-4 text-center">
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete this expense? This action cannot
                be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() =>
                    setOpenDeleteAlert({ show: false, data: null })
                  }
                  className="px-4 py-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteExpense}
                  className="px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Expense;
