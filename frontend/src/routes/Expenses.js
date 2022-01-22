import { useContext, useState, useEffect } from "react";
import axios from "axios";

import ExpenseRow from "../components/Expenses/ExpenseRow";
import UserContext from "../contexts/UserContext";

const Expenses = () => {
  const { user } = useContext(UserContext);
  const [expenses, setExpenses] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    axios
      .get(`/api/user/expenses`, {
        headers: {
          "x-access-token": user.token,
        },
      })
      .then(({ data }) => {
        setExpenses(data);
      })
      .catch((err) => {
        if (err.response) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage(err.message);
        }
      });
  }, [user.token]);

  if (!expenses) {
    return (
      <section className="container mx-auto my-8">
        <h1 className="text-4xl font-medium">
          {errorMessage ? errorMessage : "Loading..."}
        </h1>
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
