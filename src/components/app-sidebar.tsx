"use client"

import * as React from "react"
import {
  Frame,
  Map,
  PieChart
} from "lucide-react"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navigation} />
      </SidebarContent>
      <SidebarRail />
      
    </Sidebar>
  )
}




const data = {
  navigation: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Frame,
    },
    {
      name: "Productos",
      url: "/products",
      icon: PieChart,
    },
    {
      name: "Proveedores",
      url: "/suppliers",
      icon: Map,
    },
  ],
}