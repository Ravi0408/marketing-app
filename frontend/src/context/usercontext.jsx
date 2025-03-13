import React, { createContext, useContext, useState, useMemo, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "@/utils/utils"; 
import {
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
  useMaterialTailwindController,
} from "@/context";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateCredits = () => {
    setUser((prevUser) => ({
      ...prevUser,
      credits:0,
    }));
  };
  const addContextCategory = (category) => {
    setUser((prevUser) => ({
      ...prevUser,
      categories: [...prevUser.categories, category],
    }));
  };
  const removeContextCategory = (category) => {
    setUser((prevUser) => ({
      ...prevUser,
      categories: prevUser.categories.filter((cat) => cat !== category),
    }));
  };

  const updateLocalPreference = (key, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        [key]: value, 
      },
    }));
  };
  
  useEffect(() => {
    if (user?.preferences) {
      const { sidenavColor, sidenavType, fixedNavbar } = user.preferences;

      if (sidenavColor) setSidenavColor(dispatch, sidenavColor);
      if (sidenavType) setSidenavType(dispatch, sidenavType);
      if (typeof fixedNavbar !== "undefined") setFixedNavbar(dispatch, fixedNavbar);
    }
  }, [user, dispatch]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user && token) {
      if (isTokenExpired(token)) {
        alert("Session expired. Please log in again.");
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/auth/sign-in"); 
      }
    }
  }, [user, navigate]); 
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const value = useMemo(() => ({ user, setUser,addContextCategory,removeContextCategory,updateLocalPreference,updateCredits }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
