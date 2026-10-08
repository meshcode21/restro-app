import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@workspace/ui/components/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('platform_session'); // Example cookie name

  if (!sessionToken) {
    redirect('/login');
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 overflow-auto bg-muted/50 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
