import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // In a real app, these would connect to a backend
  const login = async (email, password, role) => {
    // Simulate API call
    console.log('Logging in with:', email, password, role);
    
    // Mock user for demo
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
      role: role,
      verified: true,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    });
  };

  const register = async (email, password, name, role) => {
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

  const updateUserRole = (role) => {
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