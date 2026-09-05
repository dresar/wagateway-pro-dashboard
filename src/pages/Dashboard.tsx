import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, MessageSquare, Sparkles, MessageCircle } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const messageData = [
  { day: "Mon", messages: 124, aiReplies: 45 },
  { day: "Tue", messages: 156, aiReplies: 52 },
  { day: "Wed", messages: 189, aiReplies: 68 },
  { day: "Thu", messages: 203, aiReplies: 74 },
  { day: "Fri", messages: 178, aiReplies: 61 },
  { day: "Sat", messages: 98, aiReplies: 32 },
  { day: "Sun", messages: 87, aiReplies: 29 },
];

const recentActivity = [
  { id: 1, type: "incoming", from: "+1 234 567 8901", message: "Hello, I need help with my order", time: "2 min ago" },
  { id: 2, type: "bot", from: "Bot (Template)", message: "Thank you for contacting us! How can I help?", time: "2 min ago" },
  { id: 3, type: "ai", from: "Bot (AI Groq)", message: "I understand you need help with your order. Could you provide the order number?", time: "1 min ago" },
  { id: 4, type: "incoming", from: "+1 987 654 3210", message: "What are your business hours?", time: "5 min ago" },
  { id: 5, type: "bot", from: "Bot (Template)", message: "We're open Monday-Friday, 9 AM - 6 PM EST", time: "5 min ago" },
];

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard" description="Overview of your WhatsApp automation">
      <div className="flex flex-col gap-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Device Status"
            value="Connected"
            subtitle="Active since 3 days"
            icon={Smartphone}
          />
          <StatCard
            title="Messages Today"
            value="1,247"
            icon={MessageSquare}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="AI Credits Used"
            value="4,521"
            subtitle="of 10,000 monthly"
            icon={Sparkles}
          />
          <StatCard
            title="Auto-Replies"
            value="892"
            icon={MessageCircle}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Message Activity Chart */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Message Activity</CardTitle>
              <CardDescription>Messages and AI responses over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={messageData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="messages"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorMessages)"
                    />
                    <Area
                      type="monotone"
                      dataKey="aiReplies"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorAI)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]" />
                  <span className="text-sm text-muted-foreground">Total Messages</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-2))]" />
                  <span className="text-sm text-muted-foreground">AI Replies</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest messages and bot responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex flex-col gap-1 border-b border-border pb-3 last:border-0">
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={activity.type === 'incoming' ? 'secondary' : activity.type === 'bot' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {activity.from}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">{activity.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
