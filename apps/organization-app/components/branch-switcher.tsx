"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { Building2, ChevronsUpDown, Check } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@workspace/ui/components/sidebar"
import api from "@/lib/axios"

interface Branch {
  id: string
  name: string
  slug: string
}

export function BranchSwitcher() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = React.useState(false)

  // Use URL search param as the source of truth, fallback to local storage
  const activeBranchIdFromUrl = searchParams.get("branchId")
  
  // We'll manage the currently active branch in a state, initialized by URL or localStorage
  const [activeBranchId, setActiveBranchId] = React.useState<string | null>(null)

  const { data: branches = [], isLoading } = useQuery<Branch[]>({
    queryKey: ["branches"],
    queryFn: async () => {
      const response = await api.get("/branches")
      return response.data.data
    },
  })

  // Synchronize state with URL or local storage once branches are loaded
  React.useEffect(() => {
    if (branches.length > 0) {
      let nextActiveId = activeBranchIdFromUrl || localStorage.getItem("active_branch_id")
      
      // Validate that the ID actually exists in the fetched branches
      if (!nextActiveId || !branches.some(b => b.id === nextActiveId)) {
        nextActiveId = branches[0]?.id || null // Fallback to first branch
      }
      
      if (nextActiveId && nextActiveId !== activeBranchId) {
        setActiveBranchId(nextActiveId)
        localStorage.setItem("active_branch_id", nextActiveId)
        
        // Only update URL if it's missing or different to avoid infinite loops
        if (activeBranchIdFromUrl !== nextActiveId) {
          const params = new URLSearchParams(searchParams.toString())
          params.set("branchId", nextActiveId)
          router.replace(`?${params.toString()}`)
        }
      }
    }
  }, [branches, activeBranchIdFromUrl, activeBranchId, router, searchParams])

  const activeBranch = branches.find(b => b.id === activeBranchId) || branches[0]

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="h-8 w-full animate-pulse rounded-md bg-muted" />
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  if (branches.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <span className="text-xs text-muted-foreground p-2">No branches available</span>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            />
          }>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{activeBranch?.name || "Select Branch"}</span>
                <span className="text-xs text-muted-foreground">Active Branch</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search branch..." />
              <CommandList>
                <CommandEmpty>No branch found.</CommandEmpty>
                <CommandGroup>
                  {branches.map((branch) => (
                    <CommandItem
                      key={branch.id}
                      value={branch.name}
                      onSelect={() => {
                        setActiveBranchId(branch.id)
                        localStorage.setItem("active_branch_id", branch.id)
                        
                        const params = new URLSearchParams(searchParams.toString())
                        params.set("branchId", branch.id)
                        router.push(`?${params.toString()}`)
                        
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          activeBranchId === branch.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {branch.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
