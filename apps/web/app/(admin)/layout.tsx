import React from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@workspace/ui/components/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@workspace/ui/components/separator';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "17rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 bg-background flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-8" />
            <div className="text-sm font-medium text-muted-foreground">
              Dashboard
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-6 lg:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
