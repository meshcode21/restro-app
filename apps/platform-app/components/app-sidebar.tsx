'use client';

import * as React from 'react';
import {
  Building2,
  LayoutDashboard,
  Settings,
  CreditCard,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/ui/components/sidebar';
import { Button } from '@workspace/ui/components/button';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

const navItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Tenants',
    url: '/tenants',
    icon: Building2,
  },
  {
    title: 'Subscriptions',
    url: '/subscriptions',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const logoutMutation = useMutation({
    mutationFn: () => api.post('/admin/logout'),
    onSuccess: () => {
      window.location.href = '/login';
    },
  });

  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold">Restro Platform</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={pathname === item.url || pathname.startsWith(item.url + '/')}
                  >
                      <item.icon />
                      <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          <LogOut data-icon="inline-start" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
