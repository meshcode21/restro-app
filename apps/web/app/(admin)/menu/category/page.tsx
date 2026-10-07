"use client";

import React, { useState } from "react";
import { Search, Plus, LayoutGrid, List, MoreVertical, UploadCloud, Info } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { ToggleGroup, ToggleGroupItem } from "@workspace/ui/components/toggle-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@workspace/ui/components/dialog";
import { Label } from "@workspace/ui/components/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

// Vercel Best Practice: rendering-hoist-jsx (hoist static data outside component)
// const MOCK_STATS = [
//   { title: "Total", value: "4/100", subtitle: "", icon: "📦" },
//   { title: "Top Sold", value: "Beverages", subtitle: "1 order", icon: "⭐" },
//   { title: "Most Dishes", value: "Beverages", subtitle: "4 dishes", icon: "🏆" },
//   { title: "Avg. Dishes Per Category", value: "1", subtitle: "", icon: "📈" },
// ];

const MOCK_CATEGORIES = [
  { id: 1, name: "Breakfast", dishes: 0, image: "🍳" },
  { id: 2, name: "Lunch", dishes: 2, image: "🍱" },
  { id: 3, name: "Dinner", dishes: 0, image: "🍝" },
  { id: 4, name: "Beverages", dishes: 4, image: "🍹" },
];

export default function CategoryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl font-bold">Category</h1>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-background"
            />
          </div>
          
          <ToggleGroup value={[viewMode]} onValueChange={(v) => v.length > 0 && setViewMode(v[0] as any)} className="hidden sm:flex bg-background border rounded-md">
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Dialog>
            <DialogTrigger render={<Button className="bg-primary hover:bg-primary/90 text-primary-foreground" />}>
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl text-center">Add Category</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    Category Name <span className="text-destructive">*</span>
                  </Label>
                  <Input id="name" placeholder="Category Name" />
                </div>
                <div className="grid gap-2">
                  <Label>Category Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                    <UploadCloud className="h-8 w-8 mb-2" />
                    <span className="text-sm">Click here to upload your image</span>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex sm:justify-end gap-2">
                <DialogClose render={<Button variant="ghost" />}>
                  Reset
                </DialogClose>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map((stat, i) => (
          <Card key={i} className="bg-card hover:shadow-sm transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">{stat.icon}</span>
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </div>
              {stat.subtitle && (
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">
                  {stat.subtitle}
                </span>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{stat.value}</div>
                <Info className="h-4 w-4 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}

      {/* Categories Grid */}
      <div className={
        viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          : "flex flex-col gap-4"
      }>
        {MOCK_CATEGORIES.map((category) => (
          <Card key={category.id} className="relative group overflow-hidden hover:border-primary/50 transition-colors">
            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger render={
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" />
                }>
                  <MoreVertical className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <CardContent className={
              viewMode === "grid"
                ? "flex flex-col items-center justify-center pt-8 pb-6 px-6 text-center"
                : "flex flex-row items-center gap-4 p-4"
            }>
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-4xl mb-4 shadow-sm border border-border/50">
                {category.image}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.dishes} Dish{category.dishes !== 1 ? 'es' : ''}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
