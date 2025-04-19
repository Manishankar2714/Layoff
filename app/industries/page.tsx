import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3Icon } from "lucide-react"

export default function IndustriesPage() {
  return (
    <main className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <BarChart3Icon className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold">Industries Overview</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Analysis and trends in the technology sector
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Finance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Financial sector employment trends
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Healthcare</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Healthcare industry workforce data
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}