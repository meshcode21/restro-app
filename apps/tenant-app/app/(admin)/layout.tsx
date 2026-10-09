import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@workspace/ui/components/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb';
import { Separator } from '@workspace/ui/components/separator';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const authSession = cookieStore.get('auth_session');

  if (!authSession) {
    redirect('/login');
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "15rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 bg-background flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-8" />
            <DynamicBreadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col p-6 lg:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
