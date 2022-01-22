import Alert from "./Alert";

const ErrorAlert = ({ text }) => {
  return (
    <Alert
      className="bg-red-100 border-red-400 text-red-700"
      label="Wystąpił bląd! "
      text={text}
    />
  );
};

export default ErrorAlert;
