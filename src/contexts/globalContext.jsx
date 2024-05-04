import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    return storedExpenses || [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const [incomes, setIncomes] = useState(() => {
    const storedIncomes = JSON.parse(localStorage.getItem("incomes"));
    return storedIncomes || [];
  });

  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  const [error, setError] = useState(null);

  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
};
