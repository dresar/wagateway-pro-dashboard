import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QrCode, Smartphone, Battery, Wifi, RefreshCw, Power } from "lucide-react";

const DeviceManager = () => {
  return (
    <DashboardLayout title="Device Manager" description="Manage your WhatsApp device connections">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Scan QR Code
            </CardTitle>
            <CardDescription>Scan this QR code with your WhatsApp app to connect</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50">
              <div className="text-center">
                <QrCode className="mx-auto h-32 w-32 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">QR Code will appear here</p>
              </div>
            </div>
            <Button className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New QR Code
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Device Status
            </CardTitle>
            <CardDescription>Current connection and device information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Connection Status</span>
              <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                Connected
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Battery className="h-4 w-4" />
                  Battery Level
                </span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Wifi className="h-4 w-4" />
                  Connection Quality
                </span>
                <span className="font-medium">Excellent</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>

            <div className="space-y-2 rounded-lg border p-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phone Number</span>
                <span className="font-medium">+1 234 567 8900</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Device Model</span>
                <span className="font-medium">iPhone 14 Pro</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">WhatsApp Version</span>
                <span className="font-medium">2.24.1.6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Connected Since</span>
                <span className="font-medium">2 days ago</span>
              </div>
            </div>

            <Button variant="destructive" className="w-full">
              <Power className="mr-2 h-4 w-4" />
              Disconnect Device
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DeviceManager;
