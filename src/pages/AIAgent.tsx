import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Zap, Database, Key, Save } from "lucide-react";

const AIAgent = () => {
  return (
    <DashboardLayout title="AI Agent (Groq)" description="Configure AI-powered intelligent responses">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Fallback Settings
            </CardTitle>
            <CardDescription>Enable AI to respond when no auto-reply matches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Groq AI Fallback</Label>
                <p className="text-sm text-muted-foreground">
                  Activate AI responses when no template matches
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Save AI Responses</Label>
                <p className="text-sm text-muted-foreground">
                  Store Groq outputs for future training
                </p>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <Label>AI Model</Label>
              <Select defaultValue="llama3-8b">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llama3-8b">Llama3-8b (Fast)</SelectItem>
                  <SelectItem value="llama3-70b">Llama3-70b (Powerful)</SelectItem>
                  <SelectItem value="mixtral-8x7b">Mixtral-8x7b (Balanced)</SelectItem>
                  <SelectItem value="gemma-7b">Gemma-7b</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>System Prompt</Label>
              <Textarea 
                placeholder="You are a helpful customer service assistant for our company. Be friendly, professional, and concise in your responses..."
                rows={6}
                defaultValue="You are a helpful customer service assistant. Be friendly, professional, and concise. Help users with their questions about our products and services."
              />
              <p className="text-xs text-muted-foreground">
                This instruction guides the AI's behavior and personality
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription>Connect your Groq API credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Groq API Key</Label>
                <Input type="password" placeholder="gsk_xxxxxxxxxxxxxxxxxxxxxxxx" />
                <p className="text-xs text-muted-foreground">
                  Get your API key from <a href="https://console.groq.com" target="_blank" className="text-primary hover:underline">console.groq.com</a>
                </p>
              </div>
              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save API Key
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Usage Statistics
              </CardTitle>
              <CardDescription>Your AI credit usage this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-muted-foreground">Requests Made</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-2xl font-bold">8,432</p>
                  <p className="text-sm text-muted-foreground">Credits Remaining</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm">API Status</span>
                <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                  Connected
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Response History
              </CardTitle>
              <CardDescription>Recent AI-generated responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg border p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                      <Badge variant="secondary" className="text-xs">llama3-8b</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      User asked about shipping times and delivery options...
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAgent;
