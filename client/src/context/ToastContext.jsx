import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = ({ message, type = 'info', duration = 3000 }) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-md text-white z-50 ${
            toast.type === 'error' ? 'bg-red-600' :
            toast.type === 'success' ? 'bg-green-600' :
            'bg-gray-800'
          }`}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);