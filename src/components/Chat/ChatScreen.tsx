
import React, { useState } from 'react';
import { ArrowLeft, Search, Phone, Video, MoreVertical, Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MobileLayout from '@/components/Layout/MobileLayout';

interface ChatScreenProps {
  onBack: () => void;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
}

interface Message {
  id: string;
  text: string;
  time: string;
  sender: 'me' | 'other';
  status?: 'sent' | 'delivered' | 'read';
}

const ChatScreen = ({ onBack }: ChatScreenProps) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const mockChats: Chat[] = [
    {
      id: '1',
      name: 'Beach Cafe Varkala',
      lastMessage: 'When can you start?',
      time: '2:30 PM',
      unread: 2,
      avatar: '🏪',
      online: true
    },
    {
      id: '2',
      name: 'Local Grocery Store',
      lastMessage: 'Thank you for applying',
      time: '1:15 PM',
      unread: 0,
      avatar: '🏬',
      online: false
    },
    {
      id: '3',
      name: 'Hotel Paradise',
      lastMessage: 'Can you come for interview tomorrow?',
      time: '11:30 AM',
      unread: 1,
      avatar: '🏨',
      online: true
    }
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      text: 'Hi! I saw your application for the server position.',
      time: '2:15 PM',
      sender: 'other'
    },
    {
      id: '2',
      text: 'Thank you for considering my application!',
      time: '2:16 PM',
      sender: 'me',
      status: 'read'
    },
    {
      id: '3',
      text: 'Your experience looks great. When can you start?',
      time: '2:30 PM',
      sender: 'other'
    }
  ];

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
  };

  if (selectedChat) {
    return (
      <MobileLayout>
        <div className="flex flex-col h-screen bg-background">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleBackToChats}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <span className="text-2xl">{selectedChat.avatar}</span>
                  {selectedChat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedChat.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedChat.online ? 'Online' : 'Last seen recently'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Phone size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Video size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <MoreVertical size={20} />
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
                      : 'bg-muted text-foreground'
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
          </div>

          {/* Message Input */}
          <div className="px-4 py-3 border-t border-border/50 bg-background/95 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground">
                <Paperclip size={20} />
              </Button>
              <div className="flex-1">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="border-0 bg-muted/50 focus:bg-muted/80 transition-colors rounded-full"
                />
              </div>
              <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground">
                <Smile size={20} />
              </Button>
              <Button 
                onClick={handleSendMessage}
                size="icon" 
                className="h-10 w-10 bg-primary text-primary-foreground rounded-full"
                disabled={!newMessage.trim()}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center">
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold ml-2">Messages</h1>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus:bg-muted/80 transition-colors"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pb-24">
            {filteredChats.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-medium text-foreground mb-2">No conversations</h3>
                <p className="text-muted-foreground">Start applying to jobs to chat with employers</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className="w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="relative flex-shrink-0">
                      <span className="text-3xl">{chat.avatar}</span>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground flex-shrink-0">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center flex-shrink-0 ml-2">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ChatScreen;
