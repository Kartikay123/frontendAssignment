import React, { createContext, useContext, useState } from 'react';

const UpdateStatusContext = createContext();

export const useUpdateStatus = () => useContext(UpdateStatusContext);

export const UpdateStatusProvider = ({ children }) => {
  const [updateStatus, setUpdateStatus] = useState(false);

  return (
    <UpdateStatusContext.Provider value={{ updateStatus, setUpdateStatus }}>
      {children}
    </UpdateStatusContext.Provider>
  );
};
