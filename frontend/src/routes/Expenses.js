import { useContext, useState, useEffect } from "react";
import useRequest from "../hooks/useRequest";

import Section from "../components/Section";
import Button from "../components/Button";
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

  return expenses ? (
    <Section title="Lista wydatków">
      <Button className="mb-8" label="Nowy wydatek" />
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
    </Section>
  ) : (
    <Section title="Loading..." />
  );
};
export default Expenses;
