import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';
import { DUMMY_ORDERS } from '@/lib/dummy-data';
import { Check, ChefHat } from 'lucide-react';

export default function KitchenDisplayPage() {
  const pendingOrders = DUMMY_ORDERS.filter(o => o.status === 'PENDING');
  const preparingOrders = DUMMY_ORDERS.filter(o => o.status === 'PREPARING');

  const renderOrderCard = (order: typeof DUMMY_ORDERS[0], actionLabel: string, actionVariant: "default" | "secondary") => (
    <Card key={order.id} className="flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center text-lg">
          <span>Table {order.tableId.split('-')[1]}</span>
          <Badge variant="outline">{order.time}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="flex flex-col gap-2">
          {order.items.map(item => (
            <li key={item.id} className="flex justify-between text-sm font-medium">
              <span><span className="text-muted-foreground mr-1">{item.quantity}x</span> {item.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-3">
        <Button className="w-full" variant={actionVariant}>
          {actionVariant === 'default' ? <ChefHat className="size-4 mr-2" /> : <Check className="size-4 mr-2" />}
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex flex-col h-screen bg-muted/20">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <ChefHat className="size-5" /> Kitchen Display System
        </h1>
      </header>
      
      <main className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full items-start">
          {/* Pending Column */}
          <div className="flex flex-col gap-4 bg-muted/40 rounded-lg p-4 h-full overflow-auto border">
            <h2 className="font-semibold text-lg flex items-center justify-between">
              Pending
              <Badge>{pendingOrders.length}</Badge>
            </h2>
            <div className="flex flex-col gap-4">
              {pendingOrders.map(order => renderOrderCard(order, "Start Preparing", "default"))}
            </div>
          </div>

          {/* Preparing Column */}
          <div className="flex flex-col gap-4 bg-muted/40 rounded-lg p-4 h-full overflow-auto border">
            <h2 className="font-semibold text-lg flex items-center justify-between">
              Preparing
              <Badge variant="secondary">{preparingOrders.length}</Badge>
            </h2>
            <div className="flex flex-col gap-4">
              {preparingOrders.map(order => renderOrderCard(order, "Mark as Ready", "secondary"))}
            </div>
          </div>

          {/* Ready (Recent) Column - Dummy empty for now */}
          <div className="flex flex-col gap-4 bg-muted/40 rounded-lg p-4 h-full overflow-auto border opacity-50">
            <h2 className="font-semibold text-lg flex items-center justify-between">
              Ready (Recent)
              <Badge variant="outline">0</Badge>
            </h2>
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
              No recent ready orders.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
