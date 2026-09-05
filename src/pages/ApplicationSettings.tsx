import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Globe, FileText, Shield, Save } from "lucide-react";

const ApplicationSettings = () => {
  return (
    <DashboardLayout title="Application Settings" description="Configure your WAGateway instance">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic configuration options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>App OS Name</Label>
              <Select defaultValue="chrome">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chrome">Chrome (Windows)</SelectItem>
                  <SelectItem value="firefox">Firefox (Linux)</SelectItem>
                  <SelectItem value="safari">Safari (macOS)</SelectItem>
                  <SelectItem value="edge">Edge (Windows)</SelectItem>
                  <SelectItem value="ubuntu">Ubuntu Desktop</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This affects how WhatsApp identifies your connection
              </p>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                  <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                  <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                  <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                  <SelectItem value="cet">CET (Central European Time)</SelectItem>
                  <SelectItem value="ist">IST (India Standard Time)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Max File Size (MB)</Label>
              <Input type="number" defaultValue="16" min="1" max="100" />
              <p className="text-xs text-muted-foreground">
                Maximum file size for media uploads (1-100 MB)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Connection Settings
            </CardTitle>
            <CardDescription>Configure connection behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Auto-reconnect</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically reconnect when disconnected
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Keep session alive</Label>
                <p className="text-sm text-muted-foreground">
                  Send periodic pings to maintain connection
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Reconnect Delay (seconds)</Label>
              <Input type="number" defaultValue="5" min="1" max="60" />
            </div>

            <div className="space-y-2">
              <Label>Connection Timeout (seconds)</Label>
              <Input type="number" defaultValue="30" min="10" max="120" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Message Settings
            </CardTitle>
            <CardDescription>Configure message handling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Log all messages</Label>
                <p className="text-sm text-muted-foreground">
                  Store all incoming/outgoing messages
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Send read receipts</Label>
                <p className="text-sm text-muted-foreground">
                  Mark messages as read automatically
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Typing indicator</Label>
                <p className="text-sm text-muted-foreground">
                  Show typing status before sending
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Message log retention (days)</Label>
              <Input type="number" defaultValue="30" min="1" max="365" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Privacy
            </CardTitle>
            <CardDescription>Security configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Encrypt stored data</Label>
                <p className="text-sm text-muted-foreground">
                  Encrypt messages and contacts at rest
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">IP whitelist</Label>
                <p className="text-sm text-muted-foreground">
                  Only allow API access from specific IPs
                </p>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <Label>Rate limit (requests/minute)</Label>
              <Input type="number" defaultValue="60" min="1" max="1000" />
            </div>

            <Separator />

            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save All Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationSettings;
