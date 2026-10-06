import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { UtensilsCrossed } from "lucide-react"

export default function RestaurantAdminPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Restaurant Management</h1>
          <p className="text-muted-foreground">Kora Kitchen - Jhamsikhel Branch</p>
        </div>
      </div>
      
      <Tabs defaultValue="tables" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="tables" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Table Management</h2>
            <Button>Add Table</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map(table => (
              <Card key={table} className="hover:border-primary/50 cursor-pointer transition-colors shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">Table {table}</CardTitle>
                  <CardDescription>Capacity: 4</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <Button variant="outline" className="w-full mt-2" size="sm">Print QR</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="menu" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Menu Categories</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <UtensilsCrossed className="size-12 mb-4 opacity-20" />
              <p>Menu management module goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
