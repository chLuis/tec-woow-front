"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import { useOutletContext } from "react-router-dom"
import Logout from "./logout"

export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const { user, role } = useOutletContext<{ user: string, role: string }>();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary select-none text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-full uppercase">
                {user.at(0)}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium capitalize">{user}</span>
                <span className="truncate text-xs lowercase first-letter:uppercase">{role}</span>
              </div>
              
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Opciones
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-0">
              <AnimatedThemeToggler className="w-full p-2"/>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 p-2">
              <SidebarTrigger className="m-0! p-0!"/>
              
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
