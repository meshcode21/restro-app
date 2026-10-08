import React from 'react';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { ChefHat, QrCode, Smartphone, Zap } from 'lucide-react';

export default function MarketingLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex h-16 items-center px-4 md:px-6 border-b">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <ChefHat className="size-6" />
          <span>RestroApp</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">Features</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">Pricing</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">About</Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center bg-muted/30">
          <div className="container px-4 md:px-6 flex flex-col items-center text-center gap-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Modern Restaurant Operations
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Digital menus, self-ordering, kitchen display systems, and analytics. All in one unified SaaS platform for restaurants.
            </p>
            <div className="flex gap-4 mt-6">
              <Button size="lg" nativeButton={false} render={<Link href="/r/kathmandu-kitchen/table/t-1" />}>
                Try Customer Menu Demo
              </Button>
              <Button variant="outline" size="lg">Book a Demo</Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-4 bg-primary/10 rounded-full mb-2">
                  <QrCode className="size-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">QR Ordering</h3>
                <p className="text-muted-foreground">Customers scan to view the menu and order without waiting for a waiter.</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-4 bg-primary/10 rounded-full mb-2">
                  <Zap className="size-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Instant KDS</h3>
                <p className="text-muted-foreground">Orders are sent instantly to the kitchen display system for preparation.</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-4 bg-primary/10 rounded-full mb-2">
                  <Smartphone className="size-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Waiter Notifications</h3>
                <p className="text-muted-foreground">Waiters receive alerts when food is ready or when customers need assistance.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2026 RestroApp SaaS. All rights reserved.</p>
      </footer>
    </div>
  );
}
