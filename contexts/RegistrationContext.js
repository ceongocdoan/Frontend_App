
import React, { createContext, useState, useContext } from 'react';


const RegistrationContext = createContext();


export const RegistrationProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(null); // null: not checked, false: not registered, true: registered

  const register = () => {
    setIsRegistered(true);
  };

  return (
    <RegistrationContext.Provider value={{ isRegistered, register }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  return useContext(RegistrationContext);
};
