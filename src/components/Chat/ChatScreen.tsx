
import React, { useState } from 'react';
import { Send, Phone, Video, MoreVertical, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MobileLayout from '@/components/Layout/MobileLayout';

const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState<string | null>('1');

  const conversations = [
    {
      id: '1',
      name: 'Beach Cafe Varkala',
      lastMessage: 'When can you start? We need someone for tomorrow.',
      time: '2:30 PM',
      unread: 2,
      avatar: '🏖️',
      online: true
    },
    {
      id: '2',
      name: 'Spice Market',
      lastMessage: 'Thanks for your interest. Can we schedule an interview?',
      time: '11:45 AM',
      unread: 0,
      avatar: '🌶️',
      online: false
    },
    {
      id: '3',
      name: 'Wedding Planners',
      lastMessage: 'The event is this Saturday. Are you available?',
      time: 'Yesterday',
      unread: 1,
      avatar: '💒',
      online: true
    },
    {
      id: '4',
      name: 'QuickMart Delivery',
      lastMessage: 'Your application has been reviewed.',
      time: '2 days ago',
      unread: 0,
      avatar: '🚚',
      online: false
    }
  ];

  const currentChatMessages = [
    {
      id: '1',
      text: 'Hi! I saw your application for the Server position.',
      sender: 'employer',
      time: '2:15 PM'
    },
    {
      id: '2',
      text: 'Hello! Yes, I\'m very interested in the position.',
      sender: 'user',
      time: '2:18 PM'
    },
    {
      id: '3',
      text: 'Great! We need someone who can work flexible hours. Are you available on weekends?',
      sender: 'employer',
      time: '2:20 PM'
    },
    {
      id: '4',
      text: 'Yes, I\'m available on weekends and have experience in restaurant service.',
      sender: 'user',
      time: '2:25 PM'
    },
    {
      id: '5',
      text: 'Perfect! When can you start? We need someone for tomorrow.',
      sender: 'employer',
      time: '2:30 PM'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const currentChat = conversations.find(c => c.id === activeChat);

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {activeChat ? (
          // Chat View
          <>
            {/* Chat Header */}
            <div className="p-4 bg-background border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setActiveChat(null)}
                  className="text-2xl"
                >
                  ←
                </button>
                <div className="text-2xl">{currentChat?.avatar}</div>
                <div>
                  <h3 className="font-semibold text-foreground">{currentChat?.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {currentChat?.online ? 'Online' : 'Last seen 2h ago'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical size={20} />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentChatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 rounded-full"
                />
                <Button onClick={handleSendMessage} size="icon" className="rounded-full">
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          // Conversations List
          <>
            {/* Header */}
            <div className="p-6 bg-background border-b">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Messages</h1>
                  <p className="text-muted-foreground mt-1">Chat with employers</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-lg">💬</span>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-12 h-12 bg-muted/30 border-border rounded-xl"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setActiveChat(conversation.id)}
                    className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-xl">
                        {conversation.avatar}
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-foreground">{conversation.name}</h3>
                        <span className="text-xs text-muted-foreground">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    
                    {conversation.unread > 0 && (
                      <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        {conversation.unread}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
};

export default ChatScreen;
