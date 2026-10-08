import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import {
  Home,
  Wallet,
  ShoppingCart,
  Package,
  Calendar,
  Download,
  TrendingDown,
  Bell,
  Utensils,
  Car,
  ShoppingBag,
  Users
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';

export default function DashboardOverviewPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs defaultValue="overview" className="w-full sm:w-auto">
          <TabsList className="bg-transparent gap-2 h-auto p-0">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-4 py-2 flex gap-2 shadow-sm border border-transparent data-[state=inactive]:border-border data-[state=inactive]:bg-background"
            >
              <Home className="size-4" /> Overview
            </TabsTrigger>
            <TabsTrigger
              value="finance"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-4 py-2 flex gap-2 shadow-sm border border-transparent data-[state=inactive]:border-border data-[state=inactive]:bg-background"
            >
              <Wallet className="size-4" /> Finance
            </TabsTrigger>
            <TabsTrigger
              value="order"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-4 py-2 flex gap-2 shadow-sm border border-transparent data-[state=inactive]:border-border data-[state=inactive]:bg-background"
            >
              <ShoppingCart className="size-4" /> Order
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-4 py-2 flex gap-2 shadow-sm border border-transparent data-[state=inactive]:border-border data-[state=inactive]:bg-background"
            >
              <Package className="size-4" /> Inventory
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="bg-background flex-1 sm:flex-none">
            <Calendar className="size-4 mr-2 text-muted-foreground" />
            Today: Oct 7
          </Button>
          <Button variant="outline" className="bg-background flex-1 sm:flex-none">
            <Download className="size-4 mr-2 text-muted-foreground" />
            Export
          </Button>
        </div>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-blue-50/50">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-medium text-sm text-foreground">
              <div className="bg-blue-600 text-white p-1.5 rounded-full">
                <Wallet className="size-4" />
              </div>
              Sales
            </div>
            <div className="text-3xl font-bold">Rs 0</div>
            <div className="text-xs text-muted-foreground">No changes!</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-orange-50/50">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-medium text-sm text-foreground">
              <div className="bg-orange-500 text-white p-1.5 rounded-full">
                <ShoppingCart className="size-4" />
              </div>
              Purchase
            </div>
            <div className="text-3xl font-bold">Rs 0</div>
            <div className="text-xs text-muted-foreground">No changes!</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-green-50/50">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-medium text-sm text-foreground">
              <div className="bg-green-500 text-white p-1.5 rounded-full">
                <TrendingDown className="size-4 rotate-180" />
              </div>
              Income
            </div>
            <div className="text-3xl font-bold">Rs 0</div>
            <div className="text-xs text-muted-foreground">No changes!</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-red-50/50">
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-medium text-sm text-foreground">
              <div className="bg-red-600 text-white p-1.5 rounded-full">
                <TrendingDown className="size-4" />
              </div>
              Expenses
            </div>
            <div className="text-3xl font-bold">Rs 0</div>
            <div className="text-xs text-muted-foreground">No changes!</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Sales Breakdown */}
        <Card className="border-none shadow-sm bg-primary/5 lg:col-span-1 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">Sales</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="text-4xl font-bold mb-1">Rs 0</div>
            <div className="text-lg font-medium mb-6">Total Sales</div>

            <div className="flex items-center justify-between mb-8">
              <div className="bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <TrendingDown className="size-3" /> No changes!
              </div>
              {/* Fake mini sparkline */}
              <div className="w-24 h-8 text-primary opacity-80 flex items-center">
                <svg viewBox="0 0 100 30" className="w-full h-full stroke-current fill-none stroke-2" preserveAspectRatio="none">
                  <path d="M0 10 Q 15 15, 30 10 T 50 20 T 70 15 T 85 25 L 100 20" />
                </svg>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 text-white p-1.5 rounded-lg">
                    <Bell className="size-4" />
                  </div>
                  <span className="font-medium text-sm">Dine In Service</span>
                </div>
                <span className="font-bold">Rs 0</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500 text-white p-1.5 rounded-lg">
                    <Utensils className="size-4" />
                  </div>
                  <span className="font-medium text-sm">Reservation Services</span>
                </div>
                <span className="font-bold">Rs 0</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 text-white p-1.5 rounded-lg">
                    <Car className="size-4" />
                  </div>
                  <span className="font-medium text-sm">Delivery Services</span>
                </div>
                <span className="font-bold">Rs 0</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 text-white p-1.5 rounded-lg">
                    <ShoppingBag className="size-4" />
                  </div>
                  <span className="font-medium text-sm">Takeaway Services</span>
                </div>
                <span className="font-bold">Rs 0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Overview Chart */}
        <Card className="border-none shadow-sm lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between pb-6">
            <div>
              <CardTitle className="text-xl">Sales Overview</CardTitle>
              <div className="text-sm text-muted-foreground mt-1">Here is a live overview of your sales</div>
            </div>
            <div className="text-sm text-muted-foreground">7 Oct 2026</div>
          </CardHeader>
          <CardContent className="h-[300px] flex items-end">
            {/* Fake chart grid */}
            <div className="w-full h-full flex flex-col justify-between text-xs text-muted-foreground pb-6">
              {[4, 3, 2, 1, 0].map((val) => (
                <div key={val} className="flex items-center gap-4 w-full">
                  <div className="w-8 text-right">Rs {val}</div>
                  <div className="flex-1 border-b border-border border-dashed h-px w-full"></div>
                </div>
              ))}
              <div className="flex justify-between pl-12 pt-4">
                <span>0:00 AM</span>
                <span>3:00 AM</span>
                <span>6:00 AM</span>
                <span>9:00 AM</span>
                <span>12:00 PM</span>
                <span>3:00 PM</span>
                <span>6:00 PM</span>
                <span>11:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 text-white p-2 rounded-lg">
                <Users className="size-5" />
              </div>
              <div>
                <CardTitle className="text-md">Sales By Staff</CardTitle>
                <div className="text-xs text-muted-foreground">Top Staffs</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">View All &gt;</Button>
          </CardHeader>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 text-white p-2 rounded-lg">
                <Users className="size-5" />
              </div>
              <div>
                <CardTitle className="text-md">Top Customers</CardTitle>
                <div className="text-xs text-muted-foreground">Customers By Spend</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">View All &gt;</Button>
          </CardHeader>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white p-2 rounded-lg">
                <Car className="size-5" />
              </div>
              <div>
                <CardTitle className="text-md">Delivery Platform</CardTitle>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">View All &gt;</Button>
          </CardHeader>
        </Card>
      </div>

    </div>
  );
}
