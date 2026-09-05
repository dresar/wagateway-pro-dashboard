import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Upload, Download, MoreVertical, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const contacts = [
  { id: 1, name: "John Smith", phone: "+1 234 567 8900", tags: ["VIP", "Active"], lastContact: "2 hours ago", messagesCount: 45 },
  { id: 2, name: "Sarah Wilson", phone: "+1 234 567 8901", tags: ["New Customer"], lastContact: "1 day ago", messagesCount: 12 },
  { id: 3, name: "Mike Johnson", phone: "+1 234 567 8902", tags: ["VIP"], lastContact: "3 days ago", messagesCount: 89 },
  { id: 4, name: "Emily Davis", phone: "+1 234 567 8903", tags: ["Support"], lastContact: "5 hours ago", messagesCount: 23 },
  { id: 5, name: "David Brown", phone: "+1 234 567 8904", tags: ["Partner", "VIP"], lastContact: "1 week ago", messagesCount: 156 },
  { id: 6, name: "Lisa Anderson", phone: "+1 234 567 8905", tags: ["Inactive"], lastContact: "2 weeks ago", messagesCount: 8 },
];

const availableTags = ["VIP", "New Customer", "Active", "Inactive", "Support", "Partner", "Lead"];

const ContactList = () => {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleContact = (id: number) => {
    setSelectedContacts(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedContacts(prev => 
      prev.length === contacts.length ? [] : contacts.map(c => c.id)
    );
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "VIP": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "Active": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Inactive": return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      case "New Customer": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Support": return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "Partner": return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout title="Contact List" description="Manage your WhatsApp contacts">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search contacts..." className="pl-9" />
            </div>
            {selectedContacts.length > 0 && (
              <Badge variant="secondary">{selectedContacts.length} selected</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Contact</DialogTitle>
                  <DialogDescription>Add a new contact to your list</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Contact name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input placeholder="+1 234 567 8900" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className={`cursor-pointer hover:bg-muted ${getTagColor(tag)}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Notes (Optional)</Label>
                    <Input placeholder="Any additional notes..." />
                  </div>
                  <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                    Add Contact
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Contacts</CardTitle>
            <CardDescription>Your saved WhatsApp contacts ({contacts.length} total)</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedContacts.length === contacts.length}
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Messages</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={() => toggleContact(contact.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{contact.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{contact.phone}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className={getTagColor(tag)}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{contact.lastContact}</TableCell>
                    <TableCell>{contact.messagesCount}</TableCell>
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
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>View History</DropdownMenuItem>
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

export default ContactList;
