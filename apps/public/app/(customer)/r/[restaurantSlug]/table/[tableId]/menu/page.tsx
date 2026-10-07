import React from 'react';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { DUMMY_MENU_CATEGORIES, DUMMY_MENU_ITEMS } from '@/lib/dummy-data';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

export default async function CustomerMenuPage({
  params,
}: {
  params: Promise<{ restaurantSlug: string; tableId: string }>;
}) {
  const resolvedParams = await params;
  
  // Dummy cart data for visualization
  const cartItemsCount = 2;
  const cartTotal = 560;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Our Menu</h2>
        <Tabs defaultValue={DUMMY_MENU_CATEGORIES[0]?.id} className="w-full">
          <TabsList className="w-full overflow-x-auto justify-start h-auto p-1 mb-4">
            {DUMMY_MENU_CATEGORIES.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="min-w-fit">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {DUMMY_MENU_CATEGORIES.map((category) => (
            <TabsContent key={category.id} value={category.id} className="flex flex-col gap-4 outline-none">
              {DUMMY_MENU_ITEMS.filter((item) => item.categoryId === category.id).map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="flex-1 p-4 flex flex-col justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        {item.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">NPR {item.price}</span>
                        <Button size="sm" variant="secondary">Add</Button>
                      </div>
                    </div>
                    {item.image && (
                      <div className="relative w-32 h-auto hidden sm:block">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Sticky Bottom Bar for Cart */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="container max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">{cartItemsCount} items in cart</span>
              <span className="font-bold text-lg">NPR {cartTotal}</span>
            </div>
            <Button nativeButton={false} render={
              <Link href={`/r/${resolvedParams.restaurantSlug}/table/${resolvedParams.tableId}/cart`} />
            } size="lg">
              <ShoppingCart data-icon="inline-start" className="size-4 mr-2" />
              View Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
