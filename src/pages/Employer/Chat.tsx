import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, Video, MoreVertical, Send, Paperclip, Smile, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MobileLayout from '@/components/Layout/MobileLayout';
import EmployerBottomNav from '@/components/Navigation/EmployerBottomNav';
import { useKeyboardAwareBottom } from '@/hooks/useKeyboardAwareBottom';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);

  const mockChats: Chat[] = [
    { id: '1', name: 'Rajesh Kumar', lastMessage: 'When should I start?', time: '2:30 PM', unread: 2, avatar: 'RK', online: true, jobTitle: 'Restaurant Server' },
    { id: '2', name: 'Amit Sharma', lastMessage: 'Thank you for considering my application', time: '1:15 PM', unread: 0, avatar: 'AS', online: false, jobTitle: 'Delivery Boy' },
    { id: '3', name: 'Priya Nair', lastMessage: 'I have experience in customer service', time: '11:30 AM', unread: 1, avatar: 'PN', online: true, jobTitle: 'Restaurant Server' }
  ];

  const mockMessages: Message[] = [
    { id: '1', text: 'Hi! I reviewed your application for the server position.', time: '2:15 PM', sender: 'me' },
    { id: '2', text: 'Thank you for considering my application!', time: '2:16 PM', sender: 'other' },
    { id: '3', text: 'When should I start?', time: '2:30 PM', sender: 'other' }
  ];

  // Always call hooks at the top-level; inside useKeyboardAwareBottom handle non-active state gracefully
  useKeyboardAwareBottom(messagesAreaRef, inputAreaRef);

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
      <div className="flex flex-col h-screen bg-background">
        {/* Chat Header */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm safe-area-top">
          <div className="flex items-center justify-between">
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
        </div>

        {/* Scrollable Messages Area */}
        <div
          ref={messagesAreaRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4 transition-all duration-150"
        >
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

        {/* Message Input Area - Fixed at bottom */}
        <div
          ref={inputAreaRef}
          className="fixed inset-x-0 bottom-0 z-50 px-4 py-3 border-t border-border bg-background safe-area-bottom"
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
    );
  }

  return (
    <MobileLayout>
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 pt-safe px-4 py-6 bg-background/95 backdrop-blur-sm">
          <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2 pb-24">
          <div className="max-w-sm mx-auto space-y-6">
            {/* Search */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 ios-input"
              />
            </div>
            {/* Render chat list */}
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {filteredChats.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  No conversations found.
                </div>
              ) : (
                filteredChats.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className="w-full flex items-center p-3 rounded-xl transition hover:bg-accent/10 group ios-list-item gap-3"
                  >
                    <div className="relative">
                      <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                        <span className="text-base font-semibold text-primary">{chat.avatar}</span>
                      </div>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-medium text-foreground truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground truncate">{chat.lastMessage}</span>
                        {chat.unread > 0 && (
                          <span className="ml-1 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-semibold">{chat.unread}</span>
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">Applied for {chat.jobTitle}</div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
        {/* Bottom Navigation (keep as is if exists) */}
        <EmployerBottomNav />
      </div>
    </MobileLayout>
  );
};

export default Chat;
