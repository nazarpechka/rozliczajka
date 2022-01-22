import { useContext, useState, useEffect } from "react";
import useRequest from "../hooks/useRequest";

import ExpenseRow from "../components/Expenses/ExpenseRow";
import AlertContext from "../contexts/AlertContext";

const Expenses = () => {
  const [expenses, setExpenses] = useState();
  const { onError } = useContext(AlertContext);
  const fetchExpenses = useRequest(
    `/api/user/expenses`,
    "GET",
    setExpenses,
    onError
  );

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (!expenses) {
    return (
      <section className="container mx-auto my-8">
        <h1 className="text-4xl font-medium">Loading...</h1>
      </section>
    );
  }

  return (
    <section className="container mx-auto my-8">
      <h1 className="text-4xl font-medium mb-8">Lista wydatków</h1>
      <div className="border border-[#AAAAAA]/50 rounded-lg">
        <div className="grid grid-cols-5 gap-4 px-5 py-7 border border-primary bg-[#E5E5E5]/25 text-lg rounded-lg">
          <span>ID</span>
          <span>Data</span>
          <span>Status</span>
          <span>Opis</span>
          <span>Kwota</span>
        </div>
        {expenses.map((expense) => (
          <ExpenseRow key={expense._id} expense={expense} />
        ))}
      </div>
    </section>
  );
};
export default Expenses;
