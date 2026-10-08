import React from 'react';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@workspace/ui/components/card';
import { DUMMY_RESTAURANT } from '@/lib/dummy-data';
import Link from 'next/link';

export default async function CustomerLandingPage({
  params,
}: {
  params: Promise<{ restaurantSlug: string; tableId: string }>;
}) {
  const resolvedParams = await params;

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome to {DUMMY_RESTAURANT.name}</CardTitle>
          <CardDescription>
            You are at Table {resolvedParams.tableId}. Please enter the 6-digit session access code provided by your waiter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="code" className="text-sm font-medium">Session Access Code</label>
              <Input id="code" placeholder="e.g. 123456" maxLength={6} className="text-center tracking-widest" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button nativeButton={false} render={
            <Link href={`/r/${resolvedParams.restaurantSlug}/table/${resolvedParams.tableId}/menu`} />
          } className="w-full">
            Join Session
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
