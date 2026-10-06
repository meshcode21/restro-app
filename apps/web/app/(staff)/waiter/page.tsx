import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { BellRing, Check, MoreVertical } from "lucide-react"

export default function WaiterPage() {
  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="flex h-14 items-center justify-between border-b px-4">
        <h1 className="font-bold text-lg">Waiter - Floor 1</h1>
        <Button variant="ghost" size="icon">
          <MoreVertical className="size-5" />
        </Button>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Active Requests</h2>
          <div className="space-y-3">
            <Card className="border-red-200 bg-red-50/50 shadow-sm">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <BellRing className="size-5" />
                  </div>
                  <div>
                    <p className="font-bold">Table 12</p>
                    <p className="text-sm text-red-600 font-medium">Assistance Requested (2m ago)</p>
                  </div>
                </div>
                <Button size="icon" variant="outline" className="rounded-full size-10 bg-white hover:bg-green-50 hover:text-green-600 hover:border-green-200">
                  <Check className="size-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Table Status</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-green-200 bg-green-50/30 shadow-sm">
              <CardContent className="p-4 flex flex-col justify-between h-24">
                <div className="flex justify-between items-start">
                  <span className="font-bold">Table 1</span>
                  <Badge variant="outline" className="bg-white border-green-200 text-green-700">Eating</Badge>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Order #1042</span>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50/30 shadow-sm">
              <CardContent className="p-4 flex flex-col justify-between h-24">
                <div className="flex justify-between items-start">
                  <span className="font-bold">Table 2</span>
                  <Badge variant="outline" className="bg-white border-blue-200 text-blue-700">Food Ready</Badge>
                </div>
                <Button size="sm" className="h-6 text-[10px] w-fit">Serve Now</Button>
              </CardContent>
            </Card>
            <Card className="opacity-60 border-dashed shadow-sm">
              <CardContent className="p-4 flex flex-col justify-between h-24 items-center justify-center text-muted-foreground">
                <span className="font-medium">Table 3</span>
                <span className="text-xs">Empty</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
