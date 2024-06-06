import React, { useEffect } from 'react';
import { useRegistration } from '../contexts/RegistrationContext';
import { navigate } from '../navigationService';
import RegisterScreen from '../screens/RegisterScreen';

const RequireRegistration = ({ children }) => {
  const { isRegistered } = useRegistration();

  useEffect(() => {
    if (isRegistered === false) {
      navigate('Register');
    }
  }, [isRegistered]);

  if (isRegistered === null) {
    return null; // Render nothing or a loading spinner while checking registration status
  }

  return isRegistered ? children : null;
};

export default RequireRegistration;