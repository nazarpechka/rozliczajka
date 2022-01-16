const Input = ({ label, name, type, placeholder, value, onChange }) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 mt-4">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full focus:border-primary focus:ring-primary border border-gray-300 rounded-md"
        required
      />
    </div>
  );
};

export default Input;
