import { useContext, useState, useEffect } from "react";
import useRequest from "../hooks/useRequest";

import UserContext from "../contexts/UserContext";

import Section from "../components/Section";
import Button from "../components/Button";
import Select from "../components/Select";
import ExpenseRow from "../components/Expenses/ExpenseRow";
import CreateExpenseModal from "../components/Expenses/CreateExpenseModal";
import AlertContext from "../contexts/AlertContext";

const Expenses = () => {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [selectedExpenses, setSelectedExpenses] = useState();
  const [expenses, setExpenses] = useState([]);
  const { onError } = useContext(AlertContext);

  const fetchGroups = useRequest(
    `/api/user/groups`,
    "GET",
    (groups) => {
      setGroups(groups);
      setSelectedGroup(groups[0]);
    },
    onError
  );
  const fetchExpenses = useRequest(
    `/api/user/expenses`,
    "GET",
    setExpenses,
    onError
  );

  useEffect(() => {
    fetchGroups();
    fetchExpenses();
  }, []);

  useEffect(() => {
    setSelectedExpenses(
      expenses.filter((expense) => expense.group === selectedGroup._id)
    );
  }, [expenses, selectedGroup]);

  return selectedExpenses ? (
    <Section title="Lista wydatków">
      <div className="inline-block">
        <Select
          label="Grupa"
          name="group"
          options={groups.map(({ _id, name }) => {
            return { key: _id, val: name };
          })}
          onChange={(e) => {
            setSelectedGroup(
              groups.find((group) => group._id === e.target.value)
            );
          }}
        />
      </div>

      {selectedGroup && user.isParticipant && (
        <CreateExpenseModal onCreation={fetchExpenses} group={selectedGroup}>
          <Button className="mb-8" label="Nowy wydatek" />
        </CreateExpenseModal>
      )}
      <div className="border border-[#AAAAAA]/50 rounded-lg">
        <div className="grid grid-cols-6 gap-4 px-5 py-7 border border-primary bg-[#E5E5E5]/25 text-lg rounded-lg">
          <span>ID</span>
          <span>Data</span>
          <span>Status</span>
          <span>Opis</span>
          <span>Kwota</span>
          <span>Twój dług</span>
        </div>
        {selectedExpenses.map((expense) => (
          <ExpenseRow key={expense._id} expense={expense} />
        ))}
      </div>
    </Section>
  ) : (
    <Section title="Loading..." />
  );
};
export default Expenses;
