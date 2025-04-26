import { useState, useEffect, useRef } from 'react';
import { Search, Send, User, Clock } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { ScrollArea } from '../../components/ui/scroll-area';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

// Mock data
const mockContacts = [
  {
    id: '1',
    name: 'John Smith',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    lastMessage: 'Thank you for your help!',
    lastMessageTime: '10:30 AM',
    unread: true,
    online: true,
    role: 'requester'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    lastMessage: 'I can help you with that.',
    lastMessageTime: 'Yesterday',
    unread: false,
    online: false,
    role: 'helper'
  },
  {
    id: '3',
    name: 'Michael Brown',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    lastMessage: 'The item is available for pickup.',
    lastMessageTime: 'Apr 22',
    unread: false,
    online: true,
    role: 'supporter'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    lastMessage: 'Let me know when you can meet.',
    lastMessageTime: 'Apr 20',
    unread: false,
    online: false,
    role: 'helper'
  }
];

const mockMessages = {
  '1': [
    { id: '1', senderId: '1', text: 'Hi, I need help moving some furniture.', timestamp: '2023-04-22T10:20:00Z' },
    { id: '2', senderId: 'current_user', text: 'I\'d be happy to help! When do you need assistance?', timestamp: '2023-04-22T10:22:00Z' },
    { id: '3', senderId: '1', text: 'This Saturday around 2pm, if that works for you?', timestamp: '2023-04-22T10:25:00Z' },
    { id: '4', senderId: 'current_user', text: 'Saturday at 2pm works for me. What\'s the address?', timestamp: '2023-04-22T10:28:00Z' },
    { id: '5', senderId: '1', text: 'Thank you for your help!', timestamp: '2023-04-22T10:30:00Z' },
  ],
  '2': [
    { id: '1', senderId: '2', text: 'Hello, I saw you needed help with grocery shopping.', timestamp: '2023-04-21T14:15:00Z' },
    { id: '2', senderId: 'current_user', text: 'Yes, I do. I\'m looking for someone to help me pick up groceries once a week.', timestamp: '2023-04-21T14:20:00Z' },
    { id: '3', senderId: '2', text: 'I can help you with that.', timestamp: '2023-04-21T14:25:00Z' },
  ],
  '3': [
    { id: '1', senderId: 'current_user', text: 'Hi Michael, I saw you have winter coats available?', timestamp: '2023-04-22T09:10:00Z' },
    { id: '2', senderId: '3', text: 'Yes, I have several in different sizes. What size do you need?', timestamp: '2023-04-22T09:15:00Z' },
    { id: '3', senderId: 'current_user', text: 'I\'m looking for a medium adult size.', timestamp: '2023-04-22T09:18:00Z' },
    { id: '4', senderId: '3', text: 'Great, I have a few options. The item is available for pickup.', timestamp: '2023-04-22T09:20:00Z' },
  ],
  '4': [
    { id: '1', senderId: '4', text: 'Hello, I can help with your computer setup.', timestamp: '2023-04-20T16:30:00Z' },
    { id: '2', senderId: 'current_user', text: 'That would be great! I\'m struggling with setting up my new laptop.', timestamp: '2023-04-20T16:35:00Z' },
    { id: '3', senderId: '4', text: 'Let me know when you can meet.', timestamp: '2023-04-20T16:40:00Z' },
  ]
};

const MessagingCenter = () => {
  const [activeContact, setActiveContact] = useState('1'); // Default to first contact
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const { user } = useAuth();

  // Populate messages when active contact changes
  useEffect(() => {
    if (activeContact) {
      setMessages(mockMessages[activeContact] || []);
    }
  }, [activeContact]);

  // Scroll to bottom of messages when new ones arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeContact) return;

    const newMsg = {
      id: Date.now().toString(),
      senderId: 'current_user',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatDateForGrouping = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDateForGrouping(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  const getActiveContact = () => {
    return mockContacts.find(contact => contact.id === activeContact);
  };

  return (
    <div className="flex h-[calc(100vh-112px)] overflow-hidden">
      {/* Sidebar - Contact List */}
      <div className="w-full max-w-xs border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search messages..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {mockContacts.map(contact => (
              <div
                key={contact.id}
                className={cn(
                  "flex items-center p-3 rounded-lg cursor-pointer transition-colors",
                  activeContact === contact.id 
                    ? "bg-maadhyam-purple/10 text-maadhyam-purple" 
                    : "hover:bg-muted"
                )}
                onClick={() => setActiveContact(contact.id)}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                  )}
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{contact.name}</h3>
                    <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                    {contact.unread && (
                      <span className="h-2 w-2 rounded-full bg-maadhyam-purple"></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      {activeContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={getActiveContact()?.avatarUrl} alt={getActiveContact()?.name} />
                <AvatarFallback>{getActiveContact()?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">{getActiveContact()?.name}</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  {getActiveContact()?.online ? (
                    <span className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Online
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-2" />
                      Offline
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Button variant="ghost" size="sm">View Profile</Button>
            </div>
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                <div key={date}>
                  <div className="flex justify-center mb-4">
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      {date}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {dateMessages.map(message => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.senderId === 'current_user' ? "justify-end" : "justify-start"
                        )}
                      >
                        <div className="flex items-end space-x-2">
                          {message.senderId !== 'current_user' && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={getActiveContact()?.avatarUrl} alt={getActiveContact()?.name} />
                              <AvatarFallback>{getActiveContact()?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={cn(
                              "max-w-md px-4 py-2 rounded-lg",
                              message.senderId === 'current_user'
                                ? "bg-maadhyam-purple text-white"
                                : "bg-muted"
                            )}
                          >
                            <p>{message.text}</p>
                            <div
                              className={cn(
                                "text-xs mt-1",
                                message.senderId === 'current_user'
                                  ? "text-white/70"
                                  : "text-muted-foreground"
                              )}
                            >
                              {formatMessageTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-maadhyam-purple hover:bg-maadhyam-purple-dark"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-muted/20">
          <div className="text-center">
            <User className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
            <h3 className="mt-4 text-lg font-medium">No conversation selected</h3>
            <p className="text-muted-foreground">
              Select a contact to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingCenter;