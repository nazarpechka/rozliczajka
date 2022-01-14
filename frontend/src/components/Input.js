const Input = ({
  label,
  name,
  type,
  value,
  innerRef,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block my-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        className="w-full focus:border-primary focus:ring-primary border border-gray-300 rounded-md"
        ref={innerRef}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Input;
