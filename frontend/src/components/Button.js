const Button = ({ className, label, onClick }) => {
  return (
    <button
      className={
        "px-4 py-2 bg-orange-500 hover:shadow-inner hover:scale-105 hover:bg-orange-600 transition rounded-lg text-white text-lg " +
        className
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
