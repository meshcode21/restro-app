import React from 'react';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import { Separator } from '@workspace/ui/components/separator';
import { DUMMY_ORDERS } from '@/lib/dummy-data';
import { Bell, FileText, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

export default async function CustomerStatusPage({
  params,
}: {
  params: Promise<{ restaurantSlug: string; tableId: string }>;
}) {
  const resolvedParams = await params;
  
  // Dummy active order for this table
  const activeOrder = DUMMY_ORDERS[0];
  const orderStatus = activeOrder?.status; // PENDING, PREPARING, READY, SERVED

  return (
    <div className="p-4 flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Order Status</h2>
        <Button nativeButton={false} variant="outline" size="sm" render={
          <Link href={`/r/${resolvedParams.restaurantSlug}/table/${resolvedParams.tableId}/menu`} />
        }>
          Add More Items
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Order #{activeOrder?.id}</span>
            <Badge variant={orderStatus === 'READY' ? 'default' : 'secondary'}>
              {orderStatus}
            </Badge>
          </CardTitle>
          <CardDescription>Placed at {activeOrder?.time}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <CheckCircle2 className="size-5 text-primary" />
              <span>Order Received</span>
            </div>
            <div className="w-0.5 h-4 bg-primary/20 ml-2.5"></div>
            <div className={`flex items-center gap-3 ${orderStatus === 'PENDING' ? 'text-muted-foreground' : ''}`}>
              {orderStatus !== 'PENDING' ? <CheckCircle2 className="size-5 text-primary" /> : <Clock className="size-5" />}
              <span>Preparing</span>
            </div>
            <div className="w-0.5 h-4 bg-border ml-2.5"></div>
            <div className="flex items-center gap-3 text-muted-foreground">
               <Clock className="size-5" />
              <span>Ready to Serve</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-sm text-muted-foreground">Items</h4>
            {(activeOrder?.items || []).map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>NPR {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-auto flex flex-col gap-4">
        <Card>
          <CardContent className="p-4 flex gap-4">
            <Button variant="secondary" className="flex-1 flex flex-col gap-2 h-auto py-4">
              <Bell className="size-6" />
              <span>Call Waiter</span>
            </Button>
            <Button variant="outline" className="flex-1 flex flex-col gap-2 h-auto py-4">
              <FileText className="size-6" />
              <span>View Bill</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
