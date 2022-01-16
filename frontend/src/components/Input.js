const Input = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  invalidMessage,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 mt-4 font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="peer w-full px-3 py-2 focus:border-primary focus:ring-primary border border-slate-300 rounded-md shadow-sm placeholder-slate-400 invalid:border-red-500 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
        required
      />
      <p className="mt-2 hidden peer-invalid:block text-red-500 text-sm">
        {invalidMessage}
      </p>
    </div>
  );
};

export default Input;
