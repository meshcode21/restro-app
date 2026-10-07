import React from 'react';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { Badge } from '@workspace/ui/components/badge';
import { DUMMY_MENU_ITEMS, DUMMY_MENU_CATEGORIES } from '@/lib/dummy-data';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function DashboardMenuPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Menu Management</h2>
        <Button>
          <Plus className="size-4 mr-2" />
          Add Item
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DUMMY_MENU_ITEMS.map((item) => {
                const category = DUMMY_MENU_CATEGORIES.find(c => c.id === item.categoryId);
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{category?.name}</TableCell>
                    <TableCell>NPR {item.price}</TableCell>
                    <TableCell><Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-600 border-emerald-500/20">Available</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="size-8">
                          <Pencil className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8 text-destructive">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
