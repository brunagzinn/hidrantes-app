'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token);
        setIsAuthenticated(true);
        setIsAdmin(decoded.perfil === 'Administrador');
      } catch (error) {
        console.error("Invalid token", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwt.decode(token);
    setIsAuthenticated(true);
    setIsAdmin(decoded.perfil === 'Administrador');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
