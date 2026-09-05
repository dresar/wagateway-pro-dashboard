import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Users, Link, Ghost, MoreVertical, RefreshCw, Search, UserPlus } from "lucide-react";

const groups = [
  { id: 1, name: "VIP Customers", participants: 156, lastActive: "2 hours ago", isAdmin: true },
  { id: 2, name: "Support Team", participants: 12, lastActive: "5 mins ago", isAdmin: true },
  { id: 3, name: "Product Updates", participants: 892, lastActive: "1 hour ago", isAdmin: false },
  { id: 4, name: "Flash Sale Alerts", participants: 2341, lastActive: "30 mins ago", isAdmin: true },
  { id: 5, name: "Beta Testers", participants: 45, lastActive: "3 hours ago", isAdmin: true },
  { id: 6, name: "Partner Network", participants: 78, lastActive: "1 day ago", isAdmin: false },
];

const GroupManager = () => {
  return (
    <DashboardLayout title="Group Manager" description="Manage your WhatsApp groups">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search groups..." className="pl-9" />
          </div>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Groups
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Groups</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <UserPlus className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Participants</p>
                <p className="text-2xl font-bold">3,524</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Ghost className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admin Rights</p>
                <p className="text-2xl font-bold">4 Groups</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Groups</CardTitle>
            <CardDescription>Groups where the bot is a member</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group Name</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">{group.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {group.participants.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{group.lastActive}</TableCell>
                    <TableCell>
                      <Badge variant={group.isAdmin ? "default" : "secondary"}>
                        {group.isAdmin ? "Admin" : "Member"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Users className="mr-1 h-3 w-3" />
                          Fetch
                        </Button>
                        <Button variant="outline" size="sm">
                          <Link className="mr-1 h-3 w-3" />
                          Invite Link
                        </Button>
                        <Button variant="outline" size="sm" disabled={!group.isAdmin}>
                          <Ghost className="mr-1 h-3 w-3" />
                          Ghost Mention
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Export Participants</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Leave Group</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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

export default GroupManager;
