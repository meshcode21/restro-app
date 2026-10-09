import { cookies } from 'next/headers';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Building2, CreditCard, Users } from 'lucide-react';

async function getMetrics() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('platform_session')?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/admin/metrics`, {
      headers: {
        'Cookie': `platform_session=${sessionToken}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return { totalTenants: 0, activeSubscriptions: 0, totalPlatformMembers: 0 };
    }
    return res.json();
  } catch (err) {
    console.error('Failed to fetch metrics', err);
    return { totalTenants: 0, activeSubscriptions: 0, totalPlatformMembers: 0 };
  }
}

export default async function DashboardPage() {
  const metrics = await getMetrics();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Platform overview and cross-tenant metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Building2 className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalTenants}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeSubscriptions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Platform Members</CardTitle>
            <Users className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalPlatformMembers}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}