"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail, useSidebar } from "@workspace/ui/components/sidebar";
import { BadgeCheck, Banknote, BarChart3, Bell, ChevronRight, ChevronsUpDown, ConciergeBell, CreditCard, Globe, Grid, LayoutDashboard, LogOut, Package, ShoppingCart, Sparkles, UserCircle, Users, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BranchSwitcher } from "./branch-switcher";
import api from "@/lib/axios";

export function getSubItemUrl(parentUrl: string, subUrl: string): string {
    if (!parentUrl || parentUrl === "#") return subUrl;
    if (subUrl.startsWith(parentUrl)) return subUrl;
    return `${parentUrl.replace(/\/+$/, "")}/${subUrl.replace(/^\/+/, "")}`;
}

export const sidebarData = {
    user: {
        name: "Mahesh Udas",
        email: "maheshudas@gmail.com",
        avatar: "MU",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        // {
        //     title: "Orders",
        //     url: "/dashboard/orders",
        //     icon: ShoppingCart,
        // },
        // {
        //     title: "Notification",
        //     url: "/dashboard/notification",
        //     icon: Bell,
        // },
        {
            title: "Menu",
            url: "/menu",
            icon: UtensilsCrossed,
            items: [
                {
                    title: "Dishes",
                    url: "/dish-setup",
                },
                {
                    title: "Category",
                    url: "/category",
                },
                // {
                //     title: "Add-Ons & Extras",
                //     url: "#",
                // },
                // {
                //     title: "Menu Set",
                //     url: "#",
                // },
                // {
                //     title: "Sub Menu",
                //     url: "#",
                // },
                // {
                //     title: "Combo Offer",
                //     url: "#",
                // },
            ],
        },
        // {
        //     title: "Services",
        //     url: "#",
        //     icon: ConciergeBell,
        // },
        // {
        //     title: "Table & Space",
        //     url: "#",
        //     icon: Grid,
        // },
        // {
        //     title: "Inventory",
        //     url: "#",
        //     icon: Package,
        // },
        // {
        //     title: "Finance",
        //     url: "#",
        //     icon: Banknote,
        // },
        // {
        //     title: "Reports",
        //     url: "#",
        //     icon: BarChart3,
        // },
        // {
        //     title: "Website",
        //     url: "#",
        //     icon: Globe,
        // },
        // {
        //     title: "Customer",
        //     url: "#",
        //     icon: Users,
        // },
        // {
        //     title: "Staff",
        //     url: "#",
        //     icon: UserCircle,
        // },
    ]
};

const data = sidebarData;

export function AppSidebar() {
    const { isMobile } = useSidebar();
    const pathname = usePathname();

    return (
        <Sidebar
            collapsible={isMobile ? "offcanvas" : "icon"}
            className="border-r bg-background"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            className="hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground active:bg-transparent active:text-foreground data-open:bg-transparent data-open:text-foreground"
                            size="lg"
                            render={<Link href="/dashboard" />}
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <UtensilsCrossed className="size-4" />
                            </div>
                            <div className="text-2xl font-bold">Restro
                                <span className="italic text-primary font-normal">App</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                
                {/* Branch Switcher Injection */}
                <BranchSwitcher />
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navMain.map((item) => {
                                if (item.items && item.items.length > 0) {
                                    return (
                                        <Collapsible defaultOpen={false} key={item.title} className="group/collapsible">
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger render={
                                                    <SidebarMenuButton className="h-10 px-3 justify-between" />
                                                }>
                                                    <div className="flex items-center gap-2">
                                                        {item.icon && <item.icon className="size-4" />}
                                                        <span>{item.title}</span>
                                                    </div>
                                                    <ChevronRight className="size-4 text-muted-foreground transition-transform group-data-open/collapsible:rotate-90" />
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.items.map((subItem) => {
                                                            const fullUrl = getSubItemUrl(item.url, subItem.url);
                                                            const isSubActive = pathname === fullUrl;

                                                            return (
                                                                <SidebarMenuSubItem key={subItem.title}>
                                                                    <SidebarMenuSubButton isActive={isSubActive} render={<Link href={fullUrl} />}>
                                                                        <span>{subItem.title}</span>
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            );
                                                        })}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    );
                                }

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton isActive={pathname === item.url} className="h-10 px-3 flex gap-2" render={<Link href={item.url} />}>
                                            {item.icon && <item.icon className="size-4" />}
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger render={
                                <SidebarMenuButton
                                    size="lg"
                                    className="hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground active:bg-transparent active:text-foreground"
                                />
                            }>
                                <Avatar className="h-8 w-8 rounded-lg shrink-0">
                                    <AvatarImage />
                                    <AvatarFallback className="rounded-lg">{data.user.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{data.user.name}</span>
                                    <span className="truncate text-xs">{data.user.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarFallback className="rounded-lg">{data.user.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">{data.user.name}</span>
                                                <span className="truncate text-xs">{data.user.email}</span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={async () => {
                                    try {
                                        await api.post('/auth/tenant/logout');
                                    } catch (e) {
                                        console.error('Logout failed', e);
                                    } finally {
                                        localStorage.removeItem('active_branch_id');
                                        window.location.href = '/login';
                                    }
                                }}>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}