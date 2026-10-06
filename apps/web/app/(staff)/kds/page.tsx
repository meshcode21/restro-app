import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Clock } from "lucide-react"

export default function KDSPage() {
  return (
    <div className="flex h-screen flex-col bg-muted/20">
      <header className="flex h-14 items-center justify-between border-b bg-card px-6 shadow-sm">
        <h1 className="font-bold text-xl tracking-tight">Kora Kitchen - KDS</h1>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm font-medium">12 Pending</Badge>
          <span className="text-sm text-muted-foreground">16:32 PM</span>
        </div>
      </header>
      <main className="flex-1 overflow-x-auto p-6">
        <div className="flex h-full gap-4 min-w-max">
          {[1, 2, 3, 4].map(ticket => (
            <Card key={ticket} className="w-[300px] flex flex-col shrink-0 border-t-4 border-t-orange-500 shadow-md">
              <CardHeader className="p-4 pb-2 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold">Table {ticket + 3}</CardTitle>
                    <span className="text-xs text-muted-foreground">Order #{1000 + ticket}</span>
                  </div>
                  <div className="flex items-center text-orange-600 bg-orange-100 px-2 py-1 rounded-md text-xs font-bold">
                    <Clock className="size-3 mr-1" />
                    {ticket * 3} min
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ul className="divide-y">
                  <li className="p-4 hover:bg-muted/50 cursor-pointer">
                    <div className="flex justify-between font-medium text-lg">
                      <span>2x Chicken Momo</span>
                    </div>
                    <div className="text-sm text-red-500 font-medium mt-1">NO ONION</div>
                  </li>
                  <li className="p-4 hover:bg-muted/50 cursor-pointer">
                    <div className="flex justify-between font-medium text-lg">
                      <span>1x Chowmein</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="p-4 border-t bg-muted/10">
                <Button className="w-full text-base font-bold h-12" variant="default">MARK READY</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
