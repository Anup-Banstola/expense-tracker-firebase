import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import AppLayout from "./pages/expense-tracker/AppLayout";
import Categories from "./pages/expense-tracker/Categories";
import Expenses from "./pages/expense-tracker/Expenses";
import Incomes from "./pages/expense-tracker/Incomes";
import DailyReport from "./pages/expense-tracker/DailyReport";
import MonthlyReport from "./pages/expense-tracker/MonthlyReport";
import YearlyReport from "./pages/expense-tracker/YearlyReport";
import Reports from "./pages/expense-tracker/Reports";
import { Auth } from "./pages/auth/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Auth />} />
        <Route path="dashboard" element={<AppLayout />} />
        <Route path="categories" element={<Categories />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="incomes" element={<Incomes />} />
        <Route path="reports" element={<Reports />}>
          <Route index element={<Navigate to="dailyreport" />} />
          <Route path="dailyreport" element={<DailyReport />} />
          <Route path="monthlyreport" element={<MonthlyReport />} />
          <Route path="yearlyreport" element={<YearlyReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
