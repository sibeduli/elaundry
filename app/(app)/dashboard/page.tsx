"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Scale,
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { XAxis, YAxis, CartesianGrid, Bar, BarChart } from "recharts";
import { useI18n } from "@/lib/i18n";

const beratItemData = [
  { date: "17 Jul", berat: 0, item: 0 },
  { date: "18 Jul", berat: 2, item: 3 },
  { date: "19 Jul", berat: 5, item: 8 },
  { date: "20 Jul", berat: 3, item: 5 },
  { date: "21 Jul", berat: 7, item: 12 },
  { date: "22 Jul", berat: 4, item: 6 },
  { date: "23 Jul", berat: 6, item: 10 },
  { date: "24 Jul", berat: 8, item: 15 },
];

const orderData = [
  { date: "17 Jul", order: 12 },
  { date: "18 Jul", order: 18 },
  { date: "19 Jul", order: 24 },
  { date: "20 Jul", order: 15 },
  { date: "21 Jul", order: 32 },
  { date: "22 Jul", order: 22 },
  { date: "23 Jul", order: 28 },
  { date: "24 Jul", order: 35 },
];

const labaData = [
  { date: "17 Jul", laba: 120000 },
  { date: "18 Jul", laba: 280000 },
  { date: "19 Jul", laba: 450000 },
  { date: "20 Jul", laba: 320000 },
  { date: "21 Jul", laba: 680000 },
  { date: "22 Jul", laba: 520000 },
  { date: "23 Jul", laba: 750000 },
  { date: "24 Jul", laba: 920000 },
];

const beratItemConfig = {
  berat: {
    label: "Berat (kg)",
    color: "var(--color-chart-1)",
  },
  item: {
    label: "Item",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig;

const orderConfig = {
  order: {
    label: "Order",
    color: "var(--color-chart-3)",
  },
} satisfies ChartConfig;

const labaConfig = {
  laba: {
    label: "Laba (Rp)",
    color: "var(--color-chart-4)",
  },
} satisfies ChartConfig;

const stats = [
  {
    title: "Total Order",
    value: "156",
    change: "+12%",
    trend: "up",
    icon: ShoppingCart,
    color: "bg-blue-500",
    lightColor: "bg-blue-50 dark:bg-blue-950",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Total Berat",
    value: "324 kg",
    change: "+8%",
    trend: "up",
    icon: Scale,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50 dark:bg-emerald-950",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Total Laba",
    value: "Rp 4.2M",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    color: "bg-violet-500",
    lightColor: "bg-violet-50 dark:bg-violet-950",
    textColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Kredit Belum Lunas",
    value: "Rp 850K",
    change: "-5%",
    trend: "down",
    icon: CreditCard,
    color: "bg-amber-500",
    lightColor: "bg-amber-50 dark:bg-amber-950",
    textColor: "text-amber-600 dark:text-amber-400",
  },
];

export default function DashboardPage() {
  const { t } = useI18n();

  return (
    <>
      {/* Page Title & Date Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("dashboard")}</h2>
          <p className="text-muted-foreground">{t("welcomeBack")}, SAYBA!</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <Calendar className="h-4 w-4 mr-2" />
              {t("daily")} - 24 Jul 2023
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{t("today")}</DropdownMenuItem>
            <DropdownMenuItem>{t("thisWeek")}</DropdownMenuItem>
            <DropdownMenuItem>{t("thisMonth")}</DropdownMenuItem>
            <DropdownMenuItem>{t("customRange")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.lightColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <Badge
                  variant={stat.trend === "up" ? "default" : "secondary"}
                  className={
                    stat.trend === "up"
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-300"
                      : "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900 dark:text-red-300"
                  }
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Total Order Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Total Order</CardTitle>
            <p className="text-sm text-muted-foreground">Jumlah order per hari</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={orderConfig} className="h-[250px] w-full">
              <BarChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis tickLine={false} axisLine={false} className="text-xs" />
                <ChartTooltip
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="order" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Total Laba Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Total Laba</CardTitle>
            <p className="text-sm text-muted-foreground">Pendapatan per hari (Rp)</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={labaConfig} className="h-[250px] w-full">
              <BarChart data={labaData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-xs"
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <ChartTooltip
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `Rp ${Number(value).toLocaleString("id-ID")}`}
                    />
                  }
                />
                <Bar dataKey="laba" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Berat/Item Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg font-semibold">Total Berat / Item</CardTitle>
            <p className="text-sm text-muted-foreground">Perbandingan berat dan jumlah item</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">Berat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-400" />
              <span className="text-muted-foreground">Item</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={beratItemConfig} className="h-[300px] w-full">
            <BarChart data={beratItemData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="berat" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="item" stackId="a" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
