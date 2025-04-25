
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'message' | 'request_update' | 'system';
  title: string;
  content: string;
  timestamp: Date;
  read: boolean;
  linkTo?: string;
}

interface NotificationContextType {
  messages: Message[];
  notifications: Notification[];
  unreadCount: number;
  sendMessage: (recipientId: string, content: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      userId: '1',
      type: 'system',
      title: 'Welcome to Maadhyam',
      content: 'Thank you for joining our community.',
      timestamp: new Date(),
      read: false
    }
  ]);

  // Calculate unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate socket.io connection
  useEffect(() => {
    console.log('Initializing notification system...');
    
    // Clean up on unmount
    return () => {
      console.log('Closing notification connections...');
    };
  }, []);

  const sendMessage = (recipientId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: '1', // Current user ID, in a real app would come from auth context
      recipientId,
      content,
      timestamp: new Date(),
      read: false
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // In a real app, this would send through socket.io or an API
    console.log('Sending message:', newMessage);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <NotificationContext.Provider
      value={{
        messages,
        notifications,
        unreadCount,
        sendMessage,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
