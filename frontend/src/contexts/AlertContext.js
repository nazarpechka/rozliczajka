import React from "react";

const AlertContext = React.createContext({
  errors: [],
  successes: [],
  onError: (message) => {},
  onSuccess: (message) => {},
  clearAll: () => {},
});

export default AlertContext;
