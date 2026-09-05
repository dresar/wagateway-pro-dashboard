import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const chats = [
  { id: 1, name: "John Smith", lastMessage: "Thanks for your help!", time: "2m", unread: 2, online: true },
  { id: 2, name: "Sarah Wilson", lastMessage: "When will my order arrive?", time: "15m", unread: 0, online: true },
  { id: 3, name: "Mike Johnson", lastMessage: "I need to reschedule", time: "1h", unread: 1, online: false },
  { id: 4, name: "Emily Davis", lastMessage: "Perfect, thank you!", time: "2h", unread: 0, online: false },
  { id: 5, name: "David Brown", lastMessage: "Can I get a refund?", time: "3h", unread: 0, online: true },
  { id: 6, name: "Lisa Anderson", lastMessage: "Hello, I have a question", time: "5h", unread: 0, online: false },
];

const messages = [
  { id: 1, sender: "them", text: "Hi there! I placed an order yesterday.", time: "10:30 AM" },
  { id: 2, sender: "me", text: "Hello John! I can help you with that. What's your order number?", time: "10:32 AM", status: "read" },
  { id: 3, sender: "them", text: "It's #ORD-2024-1234", time: "10:33 AM" },
  { id: 4, sender: "me", text: "Let me check that for you. One moment please.", time: "10:34 AM", status: "read" },
  { id: 5, sender: "me", text: "I found your order! It's currently being processed and should ship within 24 hours.", time: "10:36 AM", status: "read" },
  { id: 6, sender: "them", text: "Thanks for your help!", time: "10:37 AM" },
];

const Inbox = () => {
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <DashboardLayout title="Inbox" description="Live chat with your customers">
      <Card className="flex h-[calc(100vh-12rem)] overflow-hidden">
        {/* Chat List */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b",
                  selectedChat.id === chat.id && "bg-muted"
                )}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{chat.name}</span>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <Badge variant="destructive" className="h-5 min-w-5 px-1.5">
                    {chat.unread}
                  </Badge>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{selectedChat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedChat.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedChat.online ? "Online" : "Last seen recently"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === "me" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-4 py-2",
                      message.sender === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className={cn(
                      "flex items-center gap-1 mt-1",
                      message.sender === "me" ? "justify-end" : "justify-start"
                    )}>
                      <span className="text-xs opacity-70">{message.time}</span>
                      {message.sender === "me" && message.status === "read" && (
                        <CheckCheck className="h-3 w-3 opacity-70" />
                      )}
                      {message.sender === "me" && message.status === "sent" && (
                        <Check className="h-3 w-3 opacity-70" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Inbox;
