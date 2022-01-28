import { useState, useContext } from "react";
import useRequest from "../../hooks/useRequest";

import Button from "../Button";
import Input from "../Input";

import AlertContext from "../../contexts/AlertContext";

const CreateGroupModal = ({ children, onCreation }) => {
  const [hidden, setHidden] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const { onError, onSuccess } = useContext(AlertContext);

  const createGroup = useRequest(
    `/api/groups/`,
    "POST",
    () => {
      onSuccess(`Utworzona grupa ${formData.name}`);
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

  return (
    <>
      <span onClick={() => setHidden(false)}>{children}</span>
      {!hidden && (
        <div className="fixed z-20 top-0 left-0 right-0 bottom-0 w-full h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="w-1/3 m-auto flex flex-col items-start bg-white rounded-md shadow-lg">
            <div className="w-full p-6 mb-2 border-b border-primary">
              <h2 className="text-4xl font-medium">Nowa grupa</h2>
              <form>
                <Input
                  label="Nazwa"
                  name="name"
                  type="text"
                  placeholder="Nazwa grupy"
                  value={formData.name}
                  onChange={onChange}
                />
                <Input
                  label="Opis"
                  name="description"
                  type="text"
                  placeholder="Opis grupy"
                  value={formData.description}
                  onChange={onChange}
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
              <Button
                label="Potwierdz"
                onClick={() => {
                  setHidden(true);
                  createGroup(formData);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroupModal;
