import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Download, RefreshCw, MessageCircle, Bot, Sparkles, ArrowDownLeft, ArrowUpRight } from "lucide-react";

const messageLogs = [
  { id: 1, time: "14:32:15", direction: "incoming", from: "+1 234 567 8901", to: "Bot", message: "Hello, I need help with my order", source: "user", status: "received" },
  { id: 2, time: "14:32:16", direction: "outgoing", from: "Bot", to: "+1 234 567 8901", message: "Hi there! I'd be happy to help you with your order. Could you please provide your order number?", source: "template", status: "sent" },
  { id: 3, time: "14:32:45", direction: "incoming", from: "+1 234 567 8901", to: "Bot", message: "It's #12345", source: "user", status: "received" },
  { id: 4, time: "14:32:47", direction: "outgoing", from: "Bot", to: "+1 234 567 8901", message: "Thank you! I found order #12345. It was shipped yesterday and should arrive by tomorrow. Is there anything else I can help you with?", source: "groq", status: "sent" },
  { id: 5, time: "14:33:20", direction: "incoming", from: "+1 987 654 3210", to: "Bot", message: "What are your business hours?", source: "user", status: "received" },
  { id: 6, time: "14:33:21", direction: "outgoing", from: "Bot", to: "+1 987 654 3210", message: "We're open Monday through Friday, 9 AM to 6 PM EST. Weekend support is available via email.", source: "template", status: "sent" },
  { id: 7, time: "14:34:05", direction: "incoming", from: "+1 555 123 4567", to: "Bot", message: "!menu", source: "user", status: "received" },
  { id: 8, time: "14:34:06", direction: "outgoing", from: "Bot", to: "+1 555 123 4567", message: "📋 Main Menu:\n1. View Products\n2. Track Order\n3. Contact Support\n4. FAQs\n\nReply with the number of your choice.", source: "template", status: "sent" },
  { id: 9, time: "14:35:12", direction: "incoming", from: "+1 444 789 0123", to: "Bot", message: "Do you have any discounts available?", source: "user", status: "received" },
  { id: 10, time: "14:35:14", direction: "outgoing", from: "Bot", to: "+1 444 789 0123", message: "Yes! We currently have a 20% discount with code SAVE20. This offer is valid until the end of the month. Would you like me to tell you more about our products?", source: "groq", status: "sent" },
  { id: 11, time: "14:36:30", direction: "incoming", from: "+1 333 456 7890", to: "Bot", message: "Thanks for the help!", source: "user", status: "received" },
  { id: 12, time: "14:36:31", direction: "outgoing", from: "Bot", to: "+1 333 456 7890", message: "You're welcome! If you have any other questions, feel free to reach out. Have a great day! 😊", source: "template", status: "sent" },
];

const getSourceBadge = (source: string) => {
  switch (source) {
    case 'user':
      return <Badge variant="secondary" className="gap-1"><MessageCircle className="h-3 w-3" /> User (WA)</Badge>;
    case 'template':
      return <Badge className="gap-1 bg-primary/10 text-primary hover:bg-primary/20"><Bot className="h-3 w-3" /> Bot (Template)</Badge>;
    case 'groq':
      return <Badge variant="outline" className="gap-1 border-primary/50 text-primary"><Sparkles className="h-3 w-3" /> Bot (AI Groq)</Badge>;
    default:
      return <Badge variant="outline">{source}</Badge>;
  }
};

export default function MessageLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSource, setFilterSource] = useState("all");

  const filteredLogs = messageLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.from.includes(searchQuery) ||
                         log.to.includes(searchQuery);
    const matchesFilter = filterSource === "all" || log.source === filterSource;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout title="Message Logs" description="Real-time message monitoring">
      <div className="flex flex-col gap-6">
        {/* Stats Bar */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold text-foreground">2,847</p>
              </div>
              <MessageCircle className="h-8 w-8 text-muted-foreground/50" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Template Replies</p>
                <p className="text-2xl font-bold text-foreground">1,523</p>
              </div>
              <Bot className="h-8 w-8 text-primary/50" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">AI Responses</p>
                <p className="text-2xl font-bold text-foreground">892</p>
              </div>
              <Sparkles className="h-8 w-8 text-primary/50" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold text-foreground">1.2s</p>
              </div>
              <RefreshCw className="h-8 w-8 text-muted-foreground/50" />
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="user">User (WA)</SelectItem>
                <SelectItem value="template">Bot (Template)</SelectItem>
                <SelectItem value="groq">Bot (AI Groq)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Console-like Log View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/70" />
                <div className="h-3 w-3 rounded-full bg-primary/50" />
                <div className="h-3 w-3 rounded-full bg-primary" />
              </div>
              Live Message Console
            </CardTitle>
            <CardDescription>Real-time incoming and outgoing messages</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] rounded-lg border border-border bg-card/50 p-4">
              <div className="space-y-3 font-mono text-sm">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`flex flex-col gap-2 rounded-lg border p-3 transition-colors ${
                      log.direction === 'incoming' 
                        ? 'border-border bg-accent/30' 
                        : 'border-primary/20 bg-primary/5'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground">[{log.time}]</span>
                      {log.direction === 'incoming' ? (
                        <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                      )}
                      <span className="text-xs text-foreground">
                        {log.from} → {log.to}
                      </span>
                      {getSourceBadge(log.source)}
                    </div>
                    <p className="text-foreground whitespace-pre-wrap">{log.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
