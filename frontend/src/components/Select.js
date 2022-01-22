const Select = ({
  label,
  name,
  options,
  value,
  onChange,
  className,
  multiple,
}) => {
  return (
    <div className="mb-2 mt-4 mr-4">
      <label htmlFor={name} className="mb-2 mt-4 font-medium text-slate-700">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        className={
          "w-full focus:border-secondary focus:ring-secondary border border-gray-300 rounded-md " +
          className
        }
        onChange={onChange}
        required
        multiple={multiple}
      >
        {options.map(({ key, val }) => (
          <option value={key} key={key}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
