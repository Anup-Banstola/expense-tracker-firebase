import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";

import { Auth } from "./pages/auth/Auth";
import RootLayout from "./pages/RootLayout";
import MainCategory from "./pages/expense-tracker/MainCategory";
import MainExpense from "./pages/expense-tracker/MainExpense";
import MainIncome from "./pages/expense-tracker/MainIncome";
import Tabs from "./pages/expense-tracker/Tabs";
import Dashboard from "./pages/expense-tracker/Dashboard";
import { useEffect, useState } from "react";
import { auth } from "./config/firebase-config";
import Loader from "./components/reports/daily/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Auth />} />
        <Route element={<RootLayout />}>
          {user ? (
            <>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="categories" element={<MainCategory />} />
              <Route path="expenses" element={<MainExpense />} />
              <Route path="incomes" element={<MainIncome />} />
              <Route path="reports" element={<Tabs />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
