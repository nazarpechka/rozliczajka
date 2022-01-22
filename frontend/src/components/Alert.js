import { useState, useEffect } from "react";

const Alert = ({ className, label, text }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setTimeout(() => setHidden(true), 10000);
  }, []);

  if (hidden) {
    return null;
  }

  return hidden ? null : (
    <div
      className={
        "container w-1/3 mx-auto my-4 border px-4 py-3 rounded relative " +
        className
      }
      role="alert"
    >
      <strong className="font-bold">{label}</strong>
      <span className="block sm:inline">{text}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          className="fill-current h-6 w-6"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={() => setHidden(true)}
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
};

export default Alert;
