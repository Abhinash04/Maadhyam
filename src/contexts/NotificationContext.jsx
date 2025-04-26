import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([
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

  const sendMessage = (recipientId, content) => {
    const newMessage = {
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

  const markNotificationAsRead = (id) => {
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