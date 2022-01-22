import { useState } from "react";

import Button from "../components/Button";

const ConfirmModal = ({ children, title, text, onConfirm }) => {
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <span onClick={() => setHidden(false)}>{children}</span>
      {!hidden && (
        <div className="fixed z-20 top-0 left-0 right-0 bottom-0 w-full h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="w-1/3 m-auto flex flex-col items-start bg-white rounded-md shadow-lg">
            <div className="w-full p-6 mb-2 border-b border-primary">
              <h2 className="text-4xl font-medium">{title}</h2>
              <p className="text-2xl">{text}</p>
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
                  onConfirm();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
