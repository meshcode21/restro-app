import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { Receipt, Search } from 'lucide-react';
import { Input } from '@workspace/ui/components/input';

export default function DashboardBillingPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Billing & Payments</h2>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search bill or table..." className="pl-8 bg-background" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Session Bills</CardTitle>
              <CardDescription>Unsettled bills for currently dining tables</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table</TableHead>
                    <TableHead>Time Elapsed</TableHead>
                    <TableHead>Current Total</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Table 1</TableCell>
                    <TableCell>45 mins</TableCell>
                    <TableCell>NPR 632.80</TableCell>
                    <TableCell className="text-right">
                      <Button variant="secondary" size="sm">View Bill</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Table 3</TableCell>
                    <TableCell>20 mins</TableCell>
                    <TableCell>NPR 316.40</TableCell>
                    <TableCell className="text-right">
                      <Button variant="secondary" size="sm">View Bill</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recently Settled</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill #</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">#B-1042</TableCell>
                    <TableCell>Table 2</TableCell>
                    <TableCell>NPR 1,250.00</TableCell>
                    <TableCell><Badge variant="outline">eSewa QR</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">#B-1041</TableCell>
                    <TableCell>Table 5</TableCell>
                    <TableCell>NPR 450.00</TableCell>
                    <TableCell><Badge variant="outline">Cash</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="size-5" />
                Quick Settle
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-lg border">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Selected Table</span>
                  <span className="font-bold">Table 1</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-bold text-lg">NPR 632.80</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Record Payment As:</span>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-12 justify-start">Cash</Button>
                  <Button variant="outline" className="h-12 justify-start">Card</Button>
                  <Button variant="outline" className="h-12 justify-start">eSewa QR</Button>
                  <Button variant="outline" className="h-12 justify-start">Khalti QR</Button>
                </div>
              </div>
              
              <Button className="w-full mt-2" size="lg">Settle Bill</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
