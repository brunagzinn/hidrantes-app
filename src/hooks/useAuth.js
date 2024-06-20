'use client'
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken'

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const decoded = jwt.decode(token);        
        setIsAuthenticated(true);
        if (decoded.perfil === "Administrador") {
          setIsAdmin(true);
        }
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

  return { isAuthenticated, isAdmin };
}
