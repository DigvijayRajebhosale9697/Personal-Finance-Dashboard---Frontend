import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  email: string | null;
  setEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));

  useEffect(() => {
    if (email) {
      localStorage.setItem('email', email);
    }
  }, [email]);

  return (
    <AuthContext.Provider value={{ email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
