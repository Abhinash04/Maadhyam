import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  // If the user is authenticated, redirect to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  // If not authenticated, redirect to login
  return <Navigate to="/login" />;
};

export default Index;