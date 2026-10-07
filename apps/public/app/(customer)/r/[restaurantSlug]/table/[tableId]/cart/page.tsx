import React from 'react';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default async function CustomerCartPage({
  params,
}: {
  params: Promise<{ restaurantSlug: string; tableId: string }>;
}) {
  const resolvedParams = await params;
  
  // Dummy cart items
  const cartItems = [
    { id: "oi-1", name: "Steam Buff Momo", quantity: 2, price: 200 },
    { id: "oi-2", name: "Coke", quantity: 2, price: 80 },
  ];
  const subtotal = 560;
  const vat = subtotal * 0.13;
  const total = subtotal + vat;

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <Button nativeButton={false} variant="ghost" size="sm" render={
          <Link href={`/r/${resolvedParams.restaurantSlug}/table/${resolvedParams.tableId}/menu`} />
        }>
          Back to Menu
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {cartItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <span className="font-semibold">{item.name}</span>
                <span className="font-medium">NPR {item.price * item.quantity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">NPR {item.price} each</span>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" className="size-8">
                    <Minus className="size-4" />
                  </Button>
                  <span className="w-4 text-center font-medium">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="size-8">
                    <Plus className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 text-destructive ml-2">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-auto">
        <CardHeader className="pb-4">
          <CardTitle>Bill Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 pb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>NPR {subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">VAT (13%)</span>
            <span>NPR {vat.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>NPR {total.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button nativeButton={false} render={
            <Link href={`/r/${resolvedParams.restaurantSlug}/table/${resolvedParams.tableId}/status`} />
          } className="w-full" size="lg">
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
