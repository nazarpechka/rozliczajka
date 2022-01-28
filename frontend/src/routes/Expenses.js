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
  const [expenses, setExpenses] = useState([]);
  const { onError } = useContext(AlertContext);

  const fetchGroups = useRequest(
    `/api/users/${user._id}/groups`,
    "GET",
    (groups) => {
      setGroups(groups);
      setSelectedGroup(groups[0]);
    },
    onError
  );
  const fetchExpenses = useRequest(
    `/api/groups/${selectedGroup._id}/expenses`,
    "GET",
    setExpenses,
    (err) => {
      onError(err);
      setExpenses([]);
    }
  );

  useEffect(fetchGroups, []);
  useEffect(() => {
    if (!selectedGroup._id) {
      return;
    }
    fetchExpenses();
  }, [selectedGroup]);

  return (
    <Section title="Lista wydatków">
      <div className="mb-4">
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
            <Button label="Nowy wydatek" />
          </CreateExpenseModal>
        )}
      </div>

      {expenses.length ? (
        <div className="border border-[#AAAAAA]/50 rounded-lg">
          <div className="grid grid-cols-5 gap-4 px-5 py-7 border border-primary bg-[#E5E5E5]/25 text-lg rounded-lg">
            <span>Data</span>
            <span>Status</span>
            <span>Opis</span>
            <span>Kwota</span>
            <span>Podwydatki</span>
          </div>
          {expenses.map((expense) => (
            <ExpenseRow key={expense._id} expense={expense} />
          ))}
        </div>
      ) : (
        <h2 className="text-2xl font-medium">
          W tej grupie jeszcze nie stworzono wydatków.
        </h2>
      )}
    </Section>
  );
};
export default Expenses;
