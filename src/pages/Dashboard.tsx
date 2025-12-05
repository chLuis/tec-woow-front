import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { AlertCircle, Package, TrendingUp } from "lucide-react"
import type { productSchema } from "@/components/products/product-table"
import { fetchDashboardProducts } from "@/helpers/fetching"

export default function DashboardPage() {
  const [products, setProducts] = useState<productSchema[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductsasd = async () => {
      try {
        const {data} = await fetchDashboardProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductsasd()
  }, [])

  const totalProducts = products.length
  const lowStockProducts = products.filter((p) => p.current_stock - p.min_stock < 0).length
  const lowStockPercentage = totalProducts > 0 ? ((lowStockProducts / totalProducts) * 100).toFixed(1) : 0

  const priceRanges = [
    { range: "$0 - $5000", min: 0, max: 5000, count: 0 },
    { range: "$5000 - $10000", min: 5000, max: 10000, count: 0 },
    { range: "$10000 - $20000", min: 10000, max: 20000, count: 0 },
    { range: "$20000 - $50000", min: 20000, max: 50000, count: 0 },
    { range: "$50000+", min: 50000, max: Number.POSITIVE_INFINITY, count: 0 },
  ]

  products.forEach((p) => {
    const price = +p.price || 0
    priceRanges.forEach((range) => {
      if (price >= range.min && price < range.max) {
        range.count++
      }
    })
  })

  const chartData = priceRanges.map((r) => ({
    name: r.range,
    cantidad: r.count,
  }))

  return (
    <div className="min-h-screen bg-background p-8 w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard de Productos</h1>
        <p className="text-foreground/50">Resumen de inventario y análisis de precios</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-background border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total de Productos</CardTitle>
            <Package className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{loading ? "..." : totalProducts}</div>
            <p className="text-xs text-foreground/50 mt-2">Productos en inventario</p>
          </CardContent>
        </Card>

        <Card className="bg-background border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Productos con bajo stock</CardTitle>
            <AlertCircle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{loading ? "..." : lowStockProducts}</div>
            <p className="text-xs text-foreground/50 mt-2">{lowStockPercentage}% del inventario</p>
          </CardContent>
        </Card>

        <Card className="bg-background border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Precio Promedio</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              $
              {loading
                ? "..."
                : (products.reduce((sum, p) => sum + (+p.price || 0), 0) / (totalProducts || 1)).toFixed(0)}
            </div>
            <p className="text-xs text-foreground/50 mt-2">Promedio de inventario</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-1">
        <Card className="bg-background border-slate-700">
          <CardHeader>
            <CardTitle className="text-foreground">Ranking de Precios</CardTitle>
            <CardDescription className="text-foreground/50">Distribución de productos por rango de precio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full min-w-20">
              {!loading && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#e2e8f0" }}
                    />
                    <Legend wrapperStyle={{ color: "#e2e8f0" }} />
                    <Bar dataKey="cantidad" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
              {loading && (
                <div className="flex items-center justify-center h-full text-foreground/50">Cargando gráfico...</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background border-slate-700">
          <CardHeader>
            <CardTitle className="text-foreground">Alerta de stock</CardTitle>
            <CardDescription className="text-foreground/50">Productos con stock bajo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-700">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/80">Nombre</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/80">Precio</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/80">Cantidad</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground/80">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    products.map((product) => {
                      const isLow = product.current_stock - product.min_stock < 0
                      return (
                        isLow ? <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-700/10 transition">
                          <td className="py-3 px-4 text-foreground/75">{product.name}</td>
                          <td className="py-3 px-4 text-foreground/75">${(product.price)}</td>
                          <td className="py-3 px-4 text-foreground/75">{product.current_stock}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                isLow ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                              }`}
                            >
                              {isLow ? "Bajo" : "ok"}
                            </span>
                          </td>
                        </tr> : null
                      )
                    })}
                  {loading && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-foreground/50">
                        Cargando productos...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
