import { ReactNode, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

const useSnackbar = () => {
  const { addToast } = useToasts();

  const showError = (message: ReactNode) => {
    addToast(message, { appearance: 'error', autoDismiss: true });
  };

  return { showError };
};

export default useSnackbar;
