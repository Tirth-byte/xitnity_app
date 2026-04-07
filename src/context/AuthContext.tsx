import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'participant' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('xin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email: string, role: UserRole) => {
    // Mock login logic
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
    };
    setUser(newUser);
    localStorage.setItem('xin_user', JSON.stringify(newUser));
  };

  const register = (name: string, email: string) => {
    // Mock register logic
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'participant' as UserRole,
    };
    setUser(newUser);
    localStorage.setItem('xin_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('xin_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
