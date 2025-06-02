import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const recentsPrompts = [
  {
    date: "Today",
    prompt: [
      {
        id: 1,
        text: "How to push to github",
      },
      {
        id: 2,
        text: "How to cook Nigeria Jollof",
      },
      {
        id: 3,
        text: "How to make a good impression on a first date",
      },
    ],
  },
  {
    date: "Yesterday",
    prompt: [
      {
        id: 1,
        text: "How to push to github",
      },
      {
        id: 2,
        text: "How to cook Nigeria Jollof",
      },
      {
        id: 3,
        text: "How to make a good impression on a first date",
      },
    ],
  },
  {
    date: "24th March",
    prompt: [
      {
        id: 1,
        text: "How to push to github",
      },
      {
        id: 2,
        text: "How to cook Nigeria Jollof",
      },
      {
        id: 3,
        text: "How to make a good impression on a first date",
      },
    ],
  },
];

export default function Navbar() {
  return (
    <>
      <Sidebar className="ease-in-out duration-300 transition-all transform-gpu">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg font-medium py-4 bg-sidebar fixed top-0 z-50">BeeChat</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {recentsPrompts.map((prompt, index) => (
            <Collapsible defaultOpen className="group/collapsible" key={index}>
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="pl-3 cursor-pointer text-accent-foreground">
                    {prompt.date}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                {prompt.prompt.map((text) => (
                  <CollapsibleContent key={text.id}>
                    <SidebarGroupContent className="pl-3 py-2">
                      {text.text}
                    </SidebarGroupContent>
                  </CollapsibleContent>
                ))}
              </SidebarGroup>
            </Collapsible>
          ))}
        </SidebarContent>
      </Sidebar>
    </>
  );
}
