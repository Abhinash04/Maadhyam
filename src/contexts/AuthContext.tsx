
import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'requester' | 'helper' | 'supporter' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  updateUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // In a real app, these would connect to a backend
  const login = async (email: string, password: string) => {
    // Simulate API call
    console.log('Logging in with:', email, password);
    
    // Mock user for demo
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
      role: 'requester',
      verified: true,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    });
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    // Simulate API call
    console.log('Registering with:', email, password, name, role);
    
    // Mock user for demo
    setUser({
      id: '1',
      name: name,
      email: email,
      role: role,
      verified: false,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateUserRole,
      }}
    >
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
