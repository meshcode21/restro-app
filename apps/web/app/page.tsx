import { SearchIcon, MoreVertical, Plus, ShoppingBag } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { ToggleGroup, ToggleGroupItem } from "@workspace/ui/components/toggle-group"
import { Card, CardContent } from "@workspace/ui/components/card"
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area"

const MENU_ITEMS = [
  {
    id: "1",
    name: "Chicken Momo",
    description: "Steamed dumplings, sesame tomato achar",
    price: 320,
    image: "https://placehold.co/240x160/ea580c/ffffff?text=Momo",
  },
  {
    id: "2",
    name: "Chowmein",
    description: "Wok-tossed noodles, seasonal vegetables",
    price: 280,
    image: "https://placehold.co/240x160/ea580c/ffffff?text=Chowmein",
  },
  {
    id: "3",
    name: "Margherita Pizza",
    description: "Tomato, basil, mozzarella",
    price: 650,
    image: "https://placehold.co/240x160/ea580c/ffffff?text=Pizza",
  },
  {
    id: "4",
    name: "Coke",
    description: "330 ml chilled bottle",
    price: 120,
    image: "https://placehold.co/240x160/ea580c/ffffff?text=Coke",
  },
]

const CATEGORIES = ["Popular", "Momo", "Noodles", "Pizza", "Drinks"]

export default function CustomerUIPage() {
  return (
    <div className="relative mx-auto flex h-dvh max-w-md flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Kora Kitchen</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-primary">Table 12</span>
            <span>&bull;</span>
            <span>Order at your table</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="-mr-2">
          <MoreVertical className="size-5" />
          <span className="sr-only">More options</span>
        </Button>
      </header>

      {/* Search */}
      <div className="px-4 py-2">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search menu" 
            className="pl-9 bg-muted/50 rounded-xl"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="py-2">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-2 px-4 pb-2">
            <ToggleGroup defaultValue={["Popular"]} className="justify-start gap-2">
              {CATEGORIES.map((cat) => (
                <ToggleGroupItem 
                  key={cat} 
                  value={cat} 
                  className="rounded-full px-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {cat}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* Menu List */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 p-4 pb-32">
          <h2 className="font-semibold text-lg">Popular</h2>
          
          <div className="flex flex-col gap-4">
            {MENU_ITEMS.map((item) => (
              <Card key={item.id} className="overflow-hidden rounded-xl border-muted/50 shadow-sm">
                <CardContent className="flex p-0">
                  <div className="h-28 w-1/3 shrink-0">
                    {/* Using standard img to avoid Next.js remote pattern config overhead for now */}
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-3">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium text-sm">NPR {item.price}</span>
                      <Button size="icon" className="size-8 rounded-lg shrink-0">
                        <Plus className="size-4" />
                        <span className="sr-only">Add {item.name} to cart</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Floating Bottom Cart Bar */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="flex items-center justify-between rounded-2xl bg-card p-3 shadow-lg border">
          <div className="flex items-center gap-3">
            <div className="relative flex size-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <ShoppingBag className="size-5" />
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                2
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">2 items</span>
              <span className="text-sm font-bold">NPR 600</span>
            </div>
          </div>
          <Button className="rounded-xl px-6 font-semibold">
            View cart
          </Button>
        </div>
      </div>
    </div>
  )
}
