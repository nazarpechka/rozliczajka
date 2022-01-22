import Alert from "./Alert";

const SuccessAlert = ({ text }) => {
  return (
    <Alert
      className="bg-green-100 border-green-400 text-green-700"
      label="Sukces! "
      text={text}
    />
  );
};

export default SuccessAlert;
