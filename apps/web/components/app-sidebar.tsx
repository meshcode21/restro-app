"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@workspace/ui/components/sidebar";
import { BadgeCheck, Banknote, BarChart3, Bell, ChevronDown, ChevronRight, ChevronsUpDown, ConciergeBell, CreditCard, Globe, Grid, LayoutDashboard, LogOut, Package, ShoppingCart, Sparkles, Store, User2, UserCircle, Users, UtensilsCrossed, Zap } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar();

    return (
        <Sidebar
            collapsible={isMobile ? "offcanvas" : "icon"}
            className="border-r bg-background"
        >
            <SidebarHeader className="border-b">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={false}
                            className="hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary active:bg-transparent active:text-primary data-open:bg-transparent data-open:text-primary"
                            size="lg"
                            render={<Link href="/dashboard" />}
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <UtensilsCrossed className="size-4" />
                            </div>
                            <span className="truncate font-bold text-2xl text-primary">RestroApp</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>Main</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive
                                    className="h-10 px-3"
                                    render={<Link href="/dashboard" />}
                                >
                                    <LayoutDashboard className="size-4" />
                                    <span>Dashboard</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={false} className="h-10 px-3" render={<Link href="/dashboard/orders" />}>
                                    <ShoppingCart className="size-4 mr-2" />
                                    <span>Orders</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton className="h-10 px-3" render={<Link href="/dashboard/notification" />}>
                                    <Bell className="size-4 mr-2" />
                                    <span>Notification</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <Collapsible className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger render={
                                        <SidebarMenuButton className="h-10 px-3 justify-between" />
                                    }>
                                        <div className="flex items-center">
                                            <UtensilsCrossed className="size-4 mr-2" />
                                            <span>Menu</span>
                                        </div>
                                        <ChevronRight className="size-4 text-muted-foreground transition-transform group-data-open/collapsible:rotate-90" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton render={<Link href="/menu" />}>
                                                    <span>Dishes</span>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton render={<Link href="#" />}>
                                                    <span>Category</span>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton render={<Link href="#" />}>
                                                    <span>Add-Ons & Extras</span>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton render={<Link href="#" />}>
                                                    <span>Menu Set</span>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton render={<Link href="#" />}>
                                                    <span>Sub Menu</span>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton render={<Link href="#" />}>
                                                    <span>Combo Offer</span>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>

                            <SidebarMenuItem>
                                <SidebarMenuButton className="h-10 px-3 justify-between" render={<Link href="#" />}>
                                    <div className="flex items-center">
                                        <ConciergeBell className="size-4 mr-2" />
                                        <span>Services</span>
                                    </div>
                                    <ChevronRight className="size-4 text-muted-foreground" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton className="h-10 px-3 justify-between" render={<Link href="#" />}>
                                    <div className="flex items-center">
                                        <Grid className="size-4 mr-2" />
                                        <span>Table & Space</span>
                                    </div>
                                    <ChevronRight className="size-4 text-muted-foreground" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton className="h-10 px-3 justify-between" render={<Link href="#" />}>
                                    <div className="flex items-center">
                                        <Package className="size-4 mr-2" />
                                        <span>Inventory</span>
                                    </div>
                                    <ChevronRight className="size-4 text-muted-foreground" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton className="h-10 px-3" render={<Link href="#" />}>
                                    <Banknote className="size-4 mr-2" />
                                    <span>Finance</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton className="h-10 px-3" render={<Link href="#" />}>
                                    <BarChart3 className="size-4 mr-2" />
                                    <span>Reports</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton className="h-10 px-3" render={<Link href="#" />}>
                                    <Globe className="size-4 mr-2" />
                                    <span>Website</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton className="h-10 px-3" render={<Link href="#" />}>
                                    <Users className="size-4 mr-2" />
                                    <span>Customer</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton className="h-10 px-3" render={<Link href="#" />}>
                                    <UserCircle className="size-4 mr-2" />
                                    <span>Staff</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
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
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage />
                                    <AvatarFallback className="rounded-lg">MU</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Mahesh Udas</span>
                                    <span className="truncate text-xs">maheshudas@gmail.com</span>
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
                                                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">Mahesh Udas</span>
                                                <span className="truncate text-xs">maheshudas@gmail.com</span>
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
                                <DropdownMenuItem>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}