import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
// import AppLayout from "./pages/expense-tracker/AppLayout";
// import Categories from "./pages/expense-tracker/Categories";
// import Expenses from "./pages/expense-tracker/Expenses";
// import Incomes from "./pages/expense-tracker/Incomes";
// import DailyReport from "./pages/expense-tracker/DailyReport";
// import MonthlyReport from "./pages/expense-tracker/MonthlyReport";
// import YearlyReport from "./pages/expense-tracker/YearlyReport";
import Reports from "./pages/expense-tracker/Reports";
import { Auth } from "./pages/auth/index";
import RootLayout from "./pages/RootLayout";
import Hero from "./components/dashboard/Hero";
import MainCategory from "./components/categories/MainCategory";
import MainExpense from "./components/expenses/MainExpense";
import MainIncome from "./components/incomes/MainIncome";
import MainReport from "./components/reports/daily/DailyReport";
import MonthlyReport from "./components/reports/monthly/MonthlyReport";
import YearlyReport from "./components/reports/yearly/YearlyReport";
import Tabs from "./components/tab/Tabs";
import DailyReport from "./components/reports/daily/DailyReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Auth />} />
        <Route element={<RootLayout />}>
          <Route path="dashboard" element={<Hero />} />
          <Route path="categories" element={<MainCategory />} />
          <Route path="expenses" element={<MainExpense />} />
          <Route path="incomes" element={<MainIncome />} />
          <Route path="reports" element={<Tabs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
