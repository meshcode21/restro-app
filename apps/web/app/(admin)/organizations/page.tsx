import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"

export default function SuperAdminPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Platform Administration</h1>
        <Button>Onboard Organization</Button>
      </div>
      
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Kora Kitchen</TableCell>
              <TableCell><Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">ACTIVE</Badge></TableCell>
              <TableCell>Oct 6, 2026</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">Manage</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Baje Ko Sekuwa</TableCell>
              <TableCell><Badge variant="outline" className="text-muted-foreground">INACTIVE</Badge></TableCell>
              <TableCell>Oct 1, 2026</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">Manage</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
