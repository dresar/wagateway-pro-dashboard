import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Webhook, Copy, RefreshCw, Send, CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const RestApiWebhooks = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const apiKey = "wag_sk_live_SANITIZED_KEY";

  return (
    <DashboardLayout title="REST API & Webhooks" description="Integrate WAGateway with your applications">
      <Tabs defaultValue="api" className="space-y-6">
        <TabsList>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="docs">Quick Start</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Key
              </CardTitle>
              <CardDescription>Use this key to authenticate your API requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Your API Key</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input 
                      type={showApiKey ? "text" : "password"} 
                      value={apiKey} 
                      readOnly 
                      className="pr-10 font-mono"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Keep this key secret. Do not share it or expose it in client-side code.
                </p>
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <h4 className="font-medium">API Endpoints</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <code className="text-muted-foreground">POST /api/send-message</code>
                    <Badge variant="secondary">Send</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-muted-foreground">GET /api/messages</code>
                    <Badge variant="secondary">Read</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-muted-foreground">GET /api/contacts</code>
                    <Badge variant="secondary">Read</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-muted-foreground">POST /api/broadcast</code>
                    <Badge variant="secondary">Send</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhook Configuration
              </CardTitle>
              <CardDescription>Receive real-time notifications for incoming messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <div className="flex gap-2">
                  <Input placeholder="https://your-server.com/webhook" />
                  <Button>
                    Save
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll send POST requests to this URL when new messages arrive
                </p>
              </div>

              <div className="space-y-2">
                <Label>Webhook Secret</Label>
                <div className="flex gap-2">
                  <Input type="password" value="whsec_1234567890abcdef" readOnly className="font-mono" />
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use this to verify webhook signatures
                </p>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Test Webhook</p>
                  <p className="text-sm text-muted-foreground">Send a test payload to your webhook URL</p>
                </div>
                <Button variant="outline">
                  <Send className="mr-2 h-4 w-4" />
                  Send Test
                </Button>
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <h4 className="font-medium">Recent Webhook Deliveries</h4>
                <div className="space-y-2">
                  {[
                    { time: "2 mins ago", status: "success", event: "message.received" },
                    { time: "5 mins ago", status: "success", event: "message.received" },
                    { time: "12 mins ago", status: "failed", event: "message.received" },
                    { time: "1 hour ago", status: "success", event: "message.status" },
                  ].map((delivery, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {delivery.status === "success" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <code className="text-muted-foreground">{delivery.event}</code>
                      </div>
                      <span className="text-muted-foreground">{delivery.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
              <CardDescription>Get started with the WAGateway API in minutes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium mb-2">Send a Message (cURL)</p>
                <pre className="text-xs text-muted-foreground overflow-x-auto">
{`curl -X POST https://api.wagateway.com/send-message \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone": "+1234567890",
    "message": "Hello from WAGateway!"
  }'`}
                </pre>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium mb-2">Send a Message (JavaScript)</p>
                <pre className="text-xs text-muted-foreground overflow-x-auto">
{`const response = await fetch('https://api.wagateway.com/send-message', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    phone: '+1234567890',
    message: 'Hello from WAGateway!'
  })
});`}
                </pre>
              </div>

              <Button variant="outline" className="w-full">
                View Full Documentation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default RestApiWebhooks;
