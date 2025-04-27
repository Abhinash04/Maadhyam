import { useAuth } from '../../contexts/AuthContext';
import RequesterDashboard from './RequesterDashboard';
import HelperDashboard from './HelperDashboard';
import SupporterDashboard from './SupporterDashboard';
import AdminDashboard from './AdminDashboard';
import data from '/data.json';

const Dashboard = () => {
  const { user } = useAuth();

  // Determine which dashboard to render based on user role
  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'requester':
        return <RequesterDashboard />;
      case 'helper':
        return <HelperDashboard />;
      case 'supporter':
        return <SupporterDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome to Maadhyam</h2>
              <p className="text-muted-foreground">Please select a role to continue</p>
            </div>
          </div>
        );
    }
  };

  return <>{renderDashboard()}</>;
};

export default Dashboard;