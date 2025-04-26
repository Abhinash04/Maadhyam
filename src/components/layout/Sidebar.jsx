import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { 
  Home,
  MessageSquare, 
  FileText, 
  User, 
  Users, 
  HelpCircle,
  Gift,
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const NavItem = ({ icon: Icon, text, to, active }) => {
    return (
      <Link to={to} className={cn(
        "flex items-center space-x-2 px-4 py-2.5 rounded-md transition-all", 
        active ? "bg-maadhyam-purple/20 text-maadhyam-purple" : 
        "hover:bg-maadhyam-purple/10 text-muted-foreground hover:text-maadhyam-purple"
      )}>
        <Icon size={20} />
        {!collapsed && <span>{text}</span>}
      </Link>
    );
  };

  const getNavItems = () => {
    const role = user?.role;
    const baseItems = [
      { icon: Home, text: 'Dashboard', to: '/' }
    ];

    const roleSpecificItems = {
      requester: [
        { icon: FileText, text: 'My Requests', to: '/requests' },
        { icon: MessageSquare, text: 'Messages', to: '/messages' }
      ],
      helper: [
        { icon: HelpCircle, text: 'Help Requests', to: '/help-requests' },
        { icon: MessageSquare, text: 'Messages', to: '/messages' }
      ],
      supporter: [
        { icon: Gift, text: 'Support Offers', to: '/support-offers' },
        { icon: MessageSquare, text: 'Messages', to: '/messages' }
      ],
      admin: [
        { icon: ShieldCheck, text: 'Moderation', to: '/moderation' },
        { icon: Users, text: 'Users', to: '/users' },
        { icon: BarChart, text: 'Analytics', to: '/analytics' },
        { icon: Settings, text: 'Settings', to: '/settings' }
      ]
    };

    return [
      ...baseItems,
      ...(role && role in roleSpecificItems ? roleSpecificItems[role] : [])
    ];
  };

  return (
    <div 
      className={cn(
        "h-screen border-r border-border bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-maadhyam-purple flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="font-bold text-xl">Maadhyam</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto h-8 w-8 rounded bg-maadhyam-purple flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground" 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex flex-col justify-between h-[calc(100vh-64px)]">
        <div className="py-4 space-y-1 px-2">
          {getNavItems().map((item, idx) => (
            <NavItem 
              key={idx} 
              icon={item.icon} 
              text={item.text} 
              to={item.to}
              active={location.pathname === item.to} 
            />
          ))}
        </div>

        <div className="p-4 border-t border-border mt-auto">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start text-muted-foreground hover:text-maadhyam-purple hover:bg-maadhyam-purple/10",
              collapsed && "justify-center"
            )}
            onClick={logout}
          >
            <LogOut size={18} className="mr-2" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;