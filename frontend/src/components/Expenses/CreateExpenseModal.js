import { useState, useContext } from "react";
import useRequest from "../../hooks/useRequest";

import Button from "../Button";
import Input from "../Input";
import Select from "../Select";

import AlertContext from "../../contexts/AlertContext";
import ConfirmModal from "../ConfirmModal";

const currencies = ["PLN", "USD", "EUR"];

const CreateExpenseModal = ({ children, group, onCreation }) => {
  const [hidden, setHidden] = useState(true);
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    currency: currencies[0],
    subexpenses: [],
  });
  const [users, setUsers] = useState([]);
  const { onError, onSuccess } = useContext(AlertContext);

  const createExpense = useRequest(
    `/api/expense/`,
    "POST",
    () => {
      onSuccess(`Utworzony wydatek o kwocie ${formData.amount}`);
      onCreation();
    },
    onError
  );

  const onChange = (e) => {
    const target = e.target;

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const onConfirm = () => {
    const amount = formData.amount / users.length;
    const subexpenses = users.map((user) => {
      return { user, amount };
    });

    createExpense({
      ...formData,
      subexpenses,
      group: group._id,
    });

    setHidden(true);
  };

  return (
    <>
      <span onClick={() => setHidden(false)}>{children}</span>
      {!hidden && (
        <div className="fixed z-20 top-0 left-0 right-0 bottom-0 w-full h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="w-1/3 m-auto flex flex-col items-start bg-white rounded-md shadow-lg">
            <div className="w-full p-6 mb-2 border-b border-primary">
              <h2 className="text-4xl font-medium">Nowy wydatek</h2>
              <form>
                <Input
                  label="Opis"
                  name="description"
                  type="text"
                  placeholder="Opis wydatku"
                  value={formData.description}
                  onChange={onChange}
                />
                <Input
                  label="Kwota"
                  name="amount"
                  type="number"
                  placeholder="Kwota wydatku"
                  value={formData.amount}
                  onChange={onChange}
                />
                <Select
                  label="Waluta"
                  name="currency"
                  options={currencies.map((currency) => {
                    return { key: currency, val: currency };
                  })}
                  value={formData.currency}
                  onChange={onChange}
                />
                <Select
                  label="Uczestniki"
                  name="users"
                  options={group.participants.map(({ _id, name, surname }) => {
                    return { key: _id, val: name + " " + surname };
                  })}
                  value={users}
                  onChange={(e) => {
                    setUsers(
                      [...e.target.options]
                        .filter(({ selected }) => selected)
                        .map(({ value }) => value)
                    );
                  }}
                  className="form-multiselect"
                  multiple={true}
                />
              </form>
            </div>
            <div className="w-full p-6 flex justify-end gap-4">
              <Button
                label="Anuluj"
                onClick={() => {
                  setHidden(true);
                }}
              />
              <ConfirmModal
                title="Potwierdzasz naznaczenie wydatku?"
                text={`Pomiędzy ${
                  users.length
                } uczestnikami będzie rozdzielony wydatek ${
                  formData.description
                }. Na każdego zostanie przypisany dług w wysokości ${
                  formData.amount / users.length
                } ${formData.currency}?`}
                onConfirm={onConfirm}
              >
                <Button label="Dalej" />
              </ConfirmModal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateExpenseModal;
