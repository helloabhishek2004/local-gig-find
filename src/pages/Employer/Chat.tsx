import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, Video, MoreVertical, Send, Paperclip, Smile, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MobileLayout from '@/components/Layout/MobileLayout';
import EmployerBottomNav from '@/components/Navigation/EmployerBottomNav';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
  jobTitle: string;
}

interface Message {
  id: string;
  text: string;
  time: string;
  sender: 'me' | 'other';
  status?: 'sent' | 'delivered' | 'read';
}

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const mockChats: Chat[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      lastMessage: 'When should I start?',
      time: '2:30 PM',
      unread: 2,
      avatar: 'RK',
      online: true,
      jobTitle: 'Restaurant Server'
    },
    {
      id: '2',
      name: 'Amit Sharma',
      lastMessage: 'Thank you for considering my application',
      time: '1:15 PM',
      unread: 0,
      avatar: 'AS',
      online: false,
      jobTitle: 'Delivery Boy'
    },
    {
      id: '3',
      name: 'Priya Nair',
      lastMessage: 'I have experience in customer service',
      time: '11:30 AM',
      unread: 1,
      avatar: 'PN',
      online: true,
      jobTitle: 'Restaurant Server'
    }
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      text: 'Hi! I reviewed your application for the server position.',
      time: '2:15 PM',
      sender: 'me'
    },
    {
      id: '2',
      text: 'Thank you for considering my application!',
      time: '2:16 PM',
      sender: 'other'
    },
    {
      id: '3',
      text: 'When should I start?',
      time: '2:30 PM',
      sender: 'other'
    }
  ];

  // Handle keyboard visibility on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const viewport = window.visualViewport;
        const keyboardHeight = window.innerHeight - viewport.height;
        setKeyboardHeight(keyboardHeight > 0 ? keyboardHeight : 0);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      return () => window.visualViewport?.removeEventListener('resize', handleResize);
    }
  }, []);

  // Scroll to bottom when keyboard appears or messages change
  useEffect(() => {
    if (selectedChat && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat, keyboardHeight]);

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
  };

  if (selectedChat) {
    return (
      <MobileLayout>
        <div 
          ref={chatContainerRef}
          className="flex flex-col bg-background fixed inset-0"
          style={{ 
            height: keyboardHeight > 0 ? `calc(100vh - ${keyboardHeight}px)` : '100vh' 
          }}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm safe-area-top">
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleBackToChats}
                className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{selectedChat.avatar}</span>
                  </div>
                  {selectedChat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedChat.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    Applied for {selectedChat.jobTitle}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-9 w-9 ios-button">
                <Phone size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 ios-button">
                <Video size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 ios-button">
                <MoreVertical size={18} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                    message.sender === 'me'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center justify-end space-x-1 mt-1">
                    <span className="text-xs opacity-70">{message.time}</span>
                    {message.sender === 'me' && message.status && (
                      <span className="text-xs opacity-70">✓✓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input - Fixed at bottom */}
          <div 
            className="px-4 py-3 border-t border-border bg-background/95 backdrop-blur-sm"
            style={{ marginBottom: keyboardHeight > 0 ? 0 : 'env(safe-area-inset-bottom)' }}
          >
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground ios-button">
                <Paperclip size={18} />
              </Button>
              <div className="flex-1">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="ios-input"
                />
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground ios-button">
                <Smile size={18} />
              </Button>
              <Button 
                onClick={handleSendMessage}
                size="icon" 
                className="h-9 w-9 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 ios-button"
                disabled={!newMessage.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background pb-20">
        <div className="gradient-bg" />
        
        {/* Header */}
        <div className="px-4 pt-safe pb-6 bg-background/95 backdrop-blur-sm relative z-10">
          <div className="max-w-sm mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-4 animate-fade-in">Messages</h1>
            
            {/* Search */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 ios-input"
              />
            </div>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 px-4 overflow-y-auto relative z-10">
          <div className="max-w-sm mx-auto">
            {filteredChats.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-medium text-foreground mb-2">No conversations</h3>
                <p className="text-muted-foreground">Chat with job applicants here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredChats.map((chat, index) => (
                  <button
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className="w-full card-enhanced p-4 ios-list-item text-left group animate-fade-in"
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">{chat.avatar}</span>
                        </div>
                        {chat.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground flex-shrink-0">{chat.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">Applied for: {chat.jobTitle}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                          {chat.unread > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center flex-shrink-0 ml-2">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <EmployerBottomNav />
      </div>
    </MobileLayout>
  );
};

export default Chat;
