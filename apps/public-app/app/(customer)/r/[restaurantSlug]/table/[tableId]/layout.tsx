import React from 'react';
import { DUMMY_RESTAURANT } from '@/lib/dummy-data';

export default async function CustomerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ restaurantSlug: string; tableId: string }>;
}) {
  const resolvedParams = await params;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <h1 className="text-lg font-semibold">{DUMMY_RESTAURANT.name}</h1>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
          Table {resolvedParams.tableId}
        </div>
      </header>
      <main className="flex-1 flex flex-col relative pb-20">
        {children}
      </main>
    </div>
  );
}
