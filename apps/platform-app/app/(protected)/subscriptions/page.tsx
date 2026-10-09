import { cookies } from 'next/headers';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';
import { SubscriptionActions } from '@/components/subscription-actions';

async function getSubscriptions() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('platform_session')?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/admin/subscriptions`, {
      headers: {
        'Cookie': `platform_session=${sessionToken}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch (err) {
    console.error('Failed to fetch subscriptions', err);
    return [];
  }
}

export default async function SubscriptionsPage() {
  const subscriptions = await getSubscriptions();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage tenant subscriptions and renewals.
          </p>
        </div>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expires At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                  No subscriptions found.
                </TableCell>
              </TableRow>
            ) : (
              subscriptions.map((sub: any) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.tenantName}</TableCell>
                  <TableCell className="capitalize">{sub.plan}</TableCell>
                  <TableCell>
                    <Badge variant={sub.status === 'active' ? 'default' : (sub.status === 'pending' ? 'secondary' : 'destructive')}>
                      {sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{sub.endsAt ? new Date(sub.endsAt).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <SubscriptionActions 
                      tenantId={sub.tenantId} 
                      status={sub.status} 
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
