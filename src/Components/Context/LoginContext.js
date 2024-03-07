// LoginContext.js
import React, { createContext, useEffect, useState } from "react";

// Create the context
export const LoginContext = createContext();

// Create the provider component
export const LoginProvider = ({ children }) => {


  const token = localStorage.getItem("token")

  const [isLoggedIn, setIsLoggedIn] = useState (token ? true : false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
