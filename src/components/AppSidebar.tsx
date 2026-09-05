import { 
  LayoutDashboard, 
  Smartphone, 
  MessageCircle,
  Send,
  Users,
  Contact,
  Reply,
  Bot,
  FileText,
  Webhook,
  ScrollText,
  Settings,
  ChevronDown,
  Zap
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  badge?: number;
  highlight?: boolean;
}

interface NavCategory {
  label: string;
  items: NavItem[];
}

const navCategories: NavCategory[] = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Device Manager", url: "/device", icon: Smartphone },
    ],
  },
  {
    label: "Communication",
    items: [
      { title: "Inbox / Live Chat", url: "/inbox", icon: MessageCircle, badge: 3 },
      { title: "Broadcast Campaign", url: "/broadcast", icon: Send, highlight: true },
      { title: "Group Manager", url: "/groups", icon: Users },
      { title: "Contact List", url: "/contacts", icon: Contact },
    ],
  },
  {
    label: "Automation",
    items: [
      { title: "Auto-Reply Bot", url: "/auto-reply", icon: Reply },
      { title: "AI Agent (Groq)", url: "/ai-agent", icon: Bot },
      { title: "Message Templates", url: "/templates", icon: FileText },
    ],
  },
  {
    label: "Developer Zone",
    items: [
      { title: "REST API & Webhooks", url: "/api", icon: Webhook },
      { title: "Message Logs", url: "/logs", icon: ScrollText },
    ],
  },
  {
    label: "Settings",
    items: [
      { title: "Application", url: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">WAGateway</span>
              <span className="text-xs text-muted-foreground">Enterprise Edition</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {navCategories.map((category) => (
          <Collapsible key={category.label} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors">
                  {!collapsed && (
                    <>
                      <span>{category.label}</span>
                      <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </>
                  )}
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {category.items.map((item) => {
                      const isActive = location.pathname === item.url;
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            tooltip={item.title}
                            className={cn(
                              item.highlight && !isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                            )}
                          >
                            <NavLink 
                              to={item.url} 
                              className="flex items-center gap-3"
                            >
                              <item.icon className={cn(
                                "h-4 w-4",
                                item.highlight && !isActive && "text-primary"
                              )} />
                              <span className="flex-1">{item.title}</span>
                              {item.badge && !collapsed && (
                                <Badge variant="destructive" className="h-5 min-w-5 px-1.5 text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
