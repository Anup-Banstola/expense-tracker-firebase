import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import { Auth } from "./pages/auth/Auth";
import RootLayout from "./pages/RootLayout";
import MainCategory from "./pages/expense-tracker/MainCategory";
import MainExpense from "./pages/expense-tracker/MainExpense";
import MainIncome from "./pages/expense-tracker/MainIncome";
import Tabs from "./pages/expense-tracker/Tabs";
import Dashboard from "./pages/expense-tracker/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Auth />} />
        <Route element={<RootLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
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
