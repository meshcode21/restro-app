import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';
import { DUMMY_WAITER_REQUESTS, DUMMY_TABLES, DUMMY_ORDERS } from '@/lib/dummy-data';
import { BellRing, CheckCircle, Utensils } from 'lucide-react';

export default function WaiterDashboardPage() {
  const readyOrders = DUMMY_ORDERS.filter(o => o.status === 'READY'); // Empty in our dummy data for now
  
  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          Waiter Operations
        </h1>
      </header>
      
      <main className="flex-1 p-4 flex flex-col gap-6">
        {/* Waiter Requests Section */}
        <section>
          <h2 className="text-lg font-bold mb-3 flex items-center justify-between">
            Active Requests
            <Badge variant="destructive">{DUMMY_WAITER_REQUESTS.length}</Badge>
          </h2>
          <div className="flex flex-col gap-3">
            {DUMMY_WAITER_REQUESTS.map(req => (
              <Card key={req.id} className="border-l-4 border-l-destructive">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-destructive/10 p-2 rounded-full">
                      <BellRing className="size-4 text-destructive" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Table {req.tableId.split('-')[1]}</p>
                      <p className="text-sm text-muted-foreground">{req.type} requested {req.time}</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">
                    <CheckCircle className="size-4 mr-2" />
                    Resolve
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Ready to Serve Section */}
        <section>
          <h2 className="text-lg font-bold mb-3 flex items-center justify-between">
            Ready to Serve
            <Badge variant="secondary">{readyOrders.length}</Badge>
          </h2>
          {readyOrders.length === 0 ? (
            <Card className="border-dashed bg-muted/50">
              <CardContent className="p-8 text-center text-muted-foreground">
                No orders waiting to be served.
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Dummy rendering for future data */}
            </div>
          )}
        </section>

        {/* Table Overview Section */}
        <section>
          <h2 className="text-lg font-bold mb-3">Table Status</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DUMMY_TABLES.map(table => (
              <Card key={table.id} className={table.status === 'OCCUPIED' ? 'border-primary' : ''}>
                <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                  <span className="font-bold">{table.name}</span>
                  <Badge variant={table.status === 'OCCUPIED' ? 'default' : 'outline'}>
                    {table.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
