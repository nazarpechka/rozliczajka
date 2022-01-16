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
        className="w-full px-3 py-2 focus:border-primary focus:ring-primary border border-slate-300 rounded-md shadow-sm placeholder-slate-400 invalid:border-red-500 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
        required
      />
    </div>
  );
};

export default Input;
