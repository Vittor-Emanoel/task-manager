"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { CheckSquare, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    title: "Tarefas",
    url: "#",
    icon: CheckSquare,
    items: [
      { title: "Todas as Tarefas", url: "?all" },
      { title: "Pendentes", url: "?status=pending" },
      { title: "Em Andamento", url: "?status=in-progress" },
      { title: "Concluídas", url: "?status=completed" },
      { title: "Atrasadas", url: "?status=late" },
    ],
  },
];

export const NavMain = () => {
  const location = useLocation();
  const currentSearch = location.search;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActiveSubItem = item.items?.some(
            (subItem) => subItem.url === currentSearch
          );

          return (
            <Collapsible key={item.title} asChild defaultOpen={isActiveSubItem}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <button type="button">
                    <item.icon />
                    <span>{item.title}</span>
                  </button>
                </SidebarMenuButton>

                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const isSubActive = subItem.url === currentSearch;
                          return (
                            <SidebarMenuSubItem
                              key={subItem.title}
                              data-active={isSubActive}
                              className="[&[data-active='true']]:bg-zinc-800"
                            >
                              <SidebarMenuSubButton asChild>
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
