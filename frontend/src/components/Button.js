const Button = ({ label, onClick }) => {
  return (
    <button
      className="px-8 py-4 bg-primary rounded-lg text-white text-lg mt-8"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
