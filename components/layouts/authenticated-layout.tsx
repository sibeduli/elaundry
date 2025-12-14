"use client";

import { useState, ReactNode } from "react";
import {
  Bell,
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  FileBarChart,
  Users,
  Settings,
  Wallet,
  History,
  ChevronDown,
  Globe,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItemsConfig = [
  { key: "dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { key: "buatOrder", icon: PlusCircle, href: "/orders/new" },
  { key: "daftarOrder", icon: ClipboardList, href: "/orders" },
  { key: "rekapData", icon: FileBarChart, href: "/reports" },
  { key: "dataPelanggan", icon: Users, href: "/customers" },
];

const toolMenuItemsConfig = [
  { key: "users", icon: Users, href: "/users" },
  { key: "layanan", icon: Settings, href: "/services" },
  { key: "rekamJejak", icon: History, href: "/history" },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function AuthenticatedLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen transform bg-white dark:bg-gray-900 border-r transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "md:w-20" : "md:w-72"} w-72 md:translate-x-0 md:sticky md:top-0 md:block md:shrink-0`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <h1
            className={`text-xl font-bold text-blue-600 dark:text-blue-400 transition-opacity duration-300 ${
              sidebarCollapsed ? "md:opacity-0 md:hidden" : ""
            }`}
          >
            eLaundry
          </h1>
          {sidebarCollapsed && (
            <span className="hidden md:block text-xl font-bold text-blue-600">eL</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Balance Card */}
        <div className="p-4">
          <div
            className={`flex items-center rounded-lg bg-blue-50 dark:bg-blue-950 p-3 ${
              sidebarCollapsed ? "md:justify-center" : "gap-3"
            }`}
          >
            <Wallet className="h-5 w-5 text-blue-600 dark:text-white shrink-0" />
            <span
              className={`font-semibold text-blue-600 dark:text-white ${sidebarCollapsed ? "md:hidden" : ""}`}
            >
              Rp.25.000
            </span>
          </div>
        </div>

        {/* Main Menu */}
        <nav className={`px-3 ${sidebarCollapsed ? "md:px-2" : ""}`}>
          <p
            className={`px-3 py-2 text-xs font-semibold text-muted-foreground uppercase ${
              sidebarCollapsed ? "md:hidden" : ""
            }`}
          >
            {t("mainMenu")}
          </p>
          <ul className="space-y-1">
            {menuItemsConfig.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    title={sidebarCollapsed ? t(item.key) : undefined}
                    className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      sidebarCollapsed ? "md:justify-center md:px-2" : "gap-3"
                    } ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className={sidebarCollapsed ? "md:hidden" : ""}>{t(item.key)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p
            className={`px-3 py-2 mt-6 text-xs font-semibold text-muted-foreground uppercase ${
              sidebarCollapsed ? "md:hidden" : ""
            }`}
          >
            {t("alatBantu")}
          </p>
          <ul className="space-y-1">
            {toolMenuItemsConfig.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    title={sidebarCollapsed ? t(item.key) : undefined}
                    className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      sidebarCollapsed ? "md:justify-center md:px-2 gap-0" : "gap-3"
                    } ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className={sidebarCollapsed ? "md:hidden" : ""}>{t(item.key)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b bg-white dark:bg-gray-900">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold md:hidden">{t("dashboard")}</h2>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setLocale("id")}
                    className={locale === "id" ? "bg-blue-50 text-blue-600" : ""}
                  >
                    🇮🇩 {t("indonesian")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLocale("en")}
                    className={locale === "en" ? "bg-blue-50 text-blue-600" : ""}
                  >
                    en {t("english")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-blue-100 text-blue-600">SY</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block font-medium">SAYBA</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
                  <DropdownMenuItem>{t("settings")}</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">{t("logout")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
