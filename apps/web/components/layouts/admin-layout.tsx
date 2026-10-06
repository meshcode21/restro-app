"use client"

import * as React from "react"
import Link from "next/link"
import { LayoutDashboard, Building2, Users, Settings, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@workspace/ui/components/button"

export function AdminLayout({ children, isSuperAdmin = false }: { children: React.ReactNode, isSuperAdmin?: boolean }) {
  const items = isSuperAdmin ? [
    { title: "Organizations", url: "/organizations", icon: Building2 },
    { title: "Global Settings", url: "#", icon: Settings },
  ] : [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Staff", url: "#", icon: Users },
    { title: "Settings", url: "#", icon: Settings },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="h-14 flex items-center px-4 border-b">
            <span className="font-bold text-lg">{isSuperAdmin ? "Super Admin" : "Restaurant Admin"}</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton render={<Link href={item.url} />}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-medium">Theme</span>
              <ThemeToggle />
            </div>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center px-4 border-b lg:hidden gap-4 sticky top-0 bg-background z-10">
            <SidebarTrigger />
            <span className="font-bold text-lg truncate">Kora Kitchen</span>
          </header>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
