import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Plus, Send, Upload, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";

const campaigns = [
  { id: 1, name: "New Year Sale", group: "All Customers", sent: 1250, delivered: 1180, failed: 70, status: "completed", date: "2024-01-01" },
  { id: 2, name: "Product Launch", group: "VIP Members", sent: 450, delivered: 445, failed: 5, status: "completed", date: "2024-01-05" },
  { id: 3, name: "Weekly Newsletter", group: "Newsletter Subscribers", sent: 0, delivered: 0, failed: 0, status: "scheduled", date: "2024-01-10" },
  { id: 4, name: "Flash Sale Alert", group: "Active Buyers", sent: 320, delivered: 0, failed: 0, status: "sending", date: "2024-01-08" },
  { id: 5, name: "Feedback Request", group: "Recent Orders", sent: 890, delivered: 850, failed: 40, status: "completed", date: "2024-01-03" },
];

const contactGroups = [
  "All Customers",
  "VIP Members",
  "Newsletter Subscribers",
  "Active Buyers",
  "Recent Orders",
  "New Customers",
];

const BroadcastCampaign = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [delay, setDelay] = useState([5]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20"><CheckCircle className="mr-1 h-3 w-3" />Completed</Badge>;
      case "sending":
        return <Badge variant="default" className="bg-blue-500/10 text-blue-500 border-blue-500/20"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Sending</Badge>;
      case "scheduled":
        return <Badge variant="default" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"><Clock className="mr-1 h-3 w-3" />Scheduled</Badge>;
      case "failed":
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout title="Broadcast Campaign" description="Send bulk messages to your contacts">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Total Campaigns</p>
              <p className="text-2xl font-bold">24</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Messages Sent</p>
              <p className="text-2xl font-bold">12,450</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold">94.2%</p>
            </Card>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary">
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>Set up a new broadcast campaign to send messages</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Campaign Name</Label>
                  <Input placeholder="e.g., Summer Sale Announcement" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Group</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactGroups.map((group) => (
                        <SelectItem key={group} value={group}>{group}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea placeholder="Type your message here..." rows={4} />
                </div>
                <div className="space-y-2">
                  <Label>Attach Media (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" className="flex-1" />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Random Delay (seconds between messages): {delay[0]}s</Label>
                  <Slider
                    value={delay}
                    onValueChange={setDelay}
                    min={1}
                    max={30}
                    step={1}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground">Adding delay helps prevent your number from being flagged</p>
                </div>
                <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                  <Send className="mr-2 h-4 w-4" />
                  Start Campaign
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campaign History</CardTitle>
            <CardDescription>View and manage your broadcast campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Contact Group</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Delivered</TableHead>
                  <TableHead>Failed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>{campaign.group}</TableCell>
                    <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600">{campaign.delivered.toLocaleString()}</TableCell>
                    <TableCell className="text-red-500">{campaign.failed}</TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{campaign.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BroadcastCampaign;
