import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, MoreVertical, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const autoReplies = [
  { id: 1, keyword: "hello", matchType: "contains", responseType: "text", response: "Hi there! How can I help you today?", active: true, triggered: 234 },
  { id: 2, keyword: "price", matchType: "contains", responseType: "text", response: "Please check our pricing at example.com/pricing", active: true, triggered: 156 },
  { id: 3, keyword: "!menu", matchType: "exact", responseType: "text", response: "Here are our available commands...", active: true, triggered: 89 },
  { id: 4, keyword: "order status", matchType: "contains", responseType: "text", response: "Please provide your order number and we'll check the status.", active: false, triggered: 45 },
  { id: 5, keyword: "support", matchType: "contains", responseType: "image", response: "[Image: Support contact card]", active: true, triggered: 67 },
  { id: 6, keyword: "bye", matchType: "exact", responseType: "text", response: "Thank you for contacting us. Have a great day!", active: true, triggered: 123 },
];

const AutoReplyBot = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [replies, setReplies] = useState(autoReplies);

  const toggleActive = (id: number) => {
    setReplies(prev => 
      prev.map(reply => 
        reply.id === id ? { ...reply, active: !reply.active } : reply
      )
    );
  };

  return (
    <DashboardLayout title="Auto-Reply Bot" description="Configure automatic responses to keywords">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search keywords..." className="pl-9" />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Auto-Reply
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Auto-Reply</DialogTitle>
                <DialogDescription>Set up an automatic response for a keyword trigger</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Trigger Keyword</Label>
                  <Input placeholder="e.g., hello, price, !menu" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Match Type</Label>
                    <Select defaultValue="contains">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exact">Exact Match</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="startsWith">Starts With</SelectItem>
                        <SelectItem value="endsWith">Ends With</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Response Type</Label>
                    <Select defaultValue="text">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="buttons">Interactive Buttons</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Response Message</Label>
                  <Textarea placeholder="Type your auto-reply message..." rows={4} />
                </div>
                <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                  Create Auto-Reply
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Auto-Reply Rules</CardTitle>
            <CardDescription>Manage your keyword-based automatic responses</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trigger Keyword</TableHead>
                  <TableHead>Match Type</TableHead>
                  <TableHead>Response Type</TableHead>
                  <TableHead>Response Preview</TableHead>
                  <TableHead>Triggered</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {replies.map((reply) => (
                  <TableRow key={reply.id}>
                    <TableCell className="font-mono font-medium">{reply.keyword}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{reply.matchType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{reply.responseType}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {reply.response}
                    </TableCell>
                    <TableCell>{reply.triggered}x</TableCell>
                    <TableCell>
                      <Switch 
                        checked={reply.active} 
                        onCheckedChange={() => toggleActive(reply.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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

export default AutoReplyBot;
