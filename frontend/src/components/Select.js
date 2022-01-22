const Select = ({ label, name, options, value, onChange }) => {
  return (
    <div className="inline-block mr-4">
      <label htmlFor={name} className="mb-2 mt-4 font-medium text-slate-700">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        className="w-full focus:border-secondary focus:ring-secondary border border-gray-300 rounded-md"
        onChange={onChange}
        required
      >
        {options.map(({ _id, name, surname }) => (
          <option value={_id} key={_id}>
            {name + surname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
