import { useState } from "react";

import Modal from "../components/Modal";
import Button from "../components/Button";

const ConfirmModal = ({
  children,
  label,
  title,
  text,
  onCancel,
  onConfirm,
}) => {
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <span onClick={() => setHidden(false)}>{children}</span>

      <Modal hidden={hidden}>
        <div className="w-full p-6 mb-2 border-b border-primary">
          <h2 className="text-4xl font-medium">{title}</h2>
          <p className="text-2xl">{text}</p>
        </div>
        <div className="w-full p-6 flex justify-end gap-4">
          <Button
            label="Anuluj"
            onClick={() => {
              setHidden(true);
              onCancel();
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
      </Modal>
    </>
  );
};

export default ConfirmModal;
