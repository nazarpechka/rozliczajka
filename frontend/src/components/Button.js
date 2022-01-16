const Button = ({ label, onClick }) => {
  return (
    <button
      className="px-8 py-4 bg-orange-500 hover:shadow-inner hover:scale-105 hover:bg-orange-600 transition rounded-lg text-white text-lg"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
