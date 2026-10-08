import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { ChefHat, LayoutDashboard, QrCode, Utensils } from 'lucide-react';

export default function RootHomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/20">
      <div className="max-w-3xl w-full flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Restaurant Platform (V1)</h1>
          <p className="text-muted-foreground">Select a portal to view the dummy UI prototypes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="size-5" />
                Restaurant Dashboard
              </CardTitle>
              <CardDescription>Admin overview, menu, and billing</CardDescription>
            </CardHeader>
            <CardContent>
              <Button nativeButton={false} render={
                <Link href="/dashboard" />
              } variant="default" className="w-full">
                View Dashboard
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="size-5" />
                Kitchen Display (KDS)
              </CardTitle>
              <CardDescription>Order preparation kanban board</CardDescription>
            </CardHeader>
            <CardContent>
              <Button nativeButton={false} render={
                <Link href="/kds" />
              } variant="default" className="w-full">
                View KDS
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="size-5" />
                Waiter Operations
              </CardTitle>
              <CardDescription>Table status and active requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Button nativeButton={false} render={
                <Link href="/waiter" />
              } variant="default" className="w-full">
                View Waiter UI
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
