"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Locale = "id" | "en";

type Translations = {
  [key: string]: {
    id: string;
    en: string;
  };
};

const translations: Translations = {
  // Dashboard
  dashboard: { id: "Dashboard", en: "Dashboard" },
  welcomeBack: { id: "Selamat datang kembali", en: "Welcome back" },

  // Stats
  totalOrder: { id: "Total Order", en: "Total Orders" },
  totalBerat: { id: "Total Berat", en: "Total Weight" },
  totalLaba: { id: "Total Laba", en: "Total Profit" },
  kreditBelumLunas: { id: "Kredit Belum Lunas", en: "Unpaid Credit" },

  // Menu
  mainMenu: { id: "Main Menu", en: "Main Menu" },
  buatOrder: { id: "Buat Order", en: "Create Order" },
  daftarOrder: { id: "Daftar Order", en: "Order List" },
  rekapData: { id: "Rekap Data", en: "Data Summary" },
  dataPelanggan: { id: "Data Pelanggan", en: "Customer Data" },

  // Tools
  alatBantu: { id: "Alat Bantu", en: "Tools" },
  users: { id: "Users", en: "Users" },
  layanan: { id: "Layanan", en: "Services" },
  rekamJejak: { id: "Rekam Jejak", en: "Activity Log" },

  // Charts
  orderPerDay: { id: "Jumlah order per hari", en: "Orders per day" },
  profitPerDay: { id: "Pendapatan per hari (Rp)", en: "Daily profit (Rp)" },
  weightItemComparison: {
    id: "Perbandingan berat dan jumlah item",
    en: "Weight and item comparison",
  },
  totalBeratItem: { id: "Total Berat / Item", en: "Total Weight / Item" },
  weight: { id: "Berat", en: "Weight" },
  item: { id: "Item", en: "Item" },

  // Date filter
  daily: { id: "Harian", en: "Daily" },
  today: { id: "Hari Ini", en: "Today" },
  thisWeek: { id: "Minggu Ini", en: "This Week" },
  thisMonth: { id: "Bulan Ini", en: "This Month" },
  customRange: { id: "Custom Range", en: "Custom Range" },

  // User menu
  profile: { id: "Profile", en: "Profile" },
  settings: { id: "Settings", en: "Settings" },
  logout: { id: "Logout", en: "Logout" },

  // Language
  language: { id: "Bahasa", en: "Language" },
  indonesian: { id: "Indonesia", en: "Indonesian" },
  english: { id: "English", en: "English" },
};

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("id");

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[locale];
  };

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
