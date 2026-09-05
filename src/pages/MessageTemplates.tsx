import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText, Image, MousePointer, MoreVertical, Edit, Trash2, Copy, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const templates = [
  { id: 1, name: "Welcome Message", type: "text", preview: "Welcome to our service! We're glad to have you...", usedCount: 345 },
  { id: 2, name: "Order Confirmation", type: "text", preview: "Your order #{{order_id}} has been confirmed...", usedCount: 234 },
  { id: 3, name: "Product Catalog", type: "image", preview: "[Image with caption: Check out our latest products!]", usedCount: 156 },
  { id: 4, name: "Main Menu", type: "buttons", preview: "Interactive menu with 3 buttons: Products, Support, FAQ", usedCount: 567 },
  { id: 5, name: "Shipping Update", type: "text", preview: "Great news! Your package is on its way...", usedCount: 89 },
  { id: 6, name: "Promo Banner", type: "image", preview: "[Image: 50% OFF Sale Banner]", usedCount: 123 },
  { id: 7, name: "Quick Actions", type: "buttons", preview: "Interactive: Track Order, Contact Support, View FAQ", usedCount: 78 },
  { id: 8, name: "Thank You", type: "text", preview: "Thank you for your purchase! We appreciate your business.", usedCount: 456 },
];

const MessageTemplates = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text": return <FileText className="h-4 w-4" />;
      case "image": return <Image className="h-4 w-4" />;
      case "buttons": return <MousePointer className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "text": return <Badge variant="secondary">Text</Badge>;
      case "image": return <Badge variant="default" className="bg-purple-500/10 text-purple-500 border-purple-500/20">Image</Badge>;
      case "buttons": return <Badge variant="default" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Interactive</Badge>;
      default: return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <DashboardLayout title="Message Templates" description="Create and manage reusable message templates">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search templates..." className="pl-9" />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Template</DialogTitle>
                <DialogDescription>Create a new reusable message template</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Template Name</Label>
                  <Input placeholder="e.g., Welcome Message" />
                </div>
                <div className="space-y-2">
                  <Label>Template Type</Label>
                  <Select defaultValue="text">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Message</SelectItem>
                      <SelectItem value="image">Image with Caption</SelectItem>
                      <SelectItem value="buttons">Interactive Buttons</SelectItem>
                      <SelectItem value="list">List Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Message Content</Label>
                  <Textarea 
                    placeholder="Type your template message... Use {{variable}} for dynamic content"
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: Use {"{{name}}"}, {"{{order_id}}"} etc. for dynamic placeholders
                  </p>
                </div>
                <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                  Create Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template) => (
            <Card key={template.id} className="relative group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(template.type)}
                    <CardTitle className="text-base">{template.name}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {getTypeBadge(template.type)}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {template.preview}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Used {template.usedCount} times</span>
                  <Button variant="outline" size="sm">Use</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessageTemplates;
