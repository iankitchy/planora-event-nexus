
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  name: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // In a real app, these would connect to a backend service
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Simple validation
      if (email === "" || password === "") {
        toast({
          title: "Error",
          description: "Email and password are required",
          variant: "destructive",
        });
        return false;
      }
      
      // Mock successful login
      setUser({
        id: "user-1",
        email: email,
        name: email.split('@')[0],
      });
      
      // Save to localStorage for persistence
      localStorage.setItem('auth', JSON.stringify({
        id: "user-1",
        email: email,
        name: email.split('@')[0],
      }));
      
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login",
        variant: "destructive",
      });
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Simple validation
      if (name === "" || email === "" || password === "") {
        toast({
          title: "Error",
          description: "All fields are required",
          variant: "destructive",
        });
        return false;
      }
      
      // Mock successful signup
      setUser({
        id: "user-1",
        email: email,
        name: name,
      });
      
      // Save to localStorage for persistence
      localStorage.setItem('auth', JSON.stringify({
        id: "user-1",
        email: email,
        name: name,
      }));
      
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth');
    toast({
      title: "Success",
      description: "You have been logged out",
    });
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setUser(parsedAuth);
      } catch (error) {
        localStorage.removeItem('auth');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
