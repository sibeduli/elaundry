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

  // New Order Page
  newOrder: { id: "Order Baru", en: "New Order" },
  customer: { id: "Pelanggan", en: "Customer" },
  newCustomer: { id: "Pelanggan Baru", en: "New Customer" },
  searchCustomer: {
    id: "Cari nama, no telpon, atau ID pelanggan...",
    en: "Search name, phone, or customer ID...",
  },
  name: { id: "Nama", en: "Name" },
  phoneNumber: { id: "No Telpon", en: "Phone Number" },
  customerName: { id: "Nama Pelanggan", en: "Customer Name" },
  email: { id: "Email", en: "Email" },
  address: { id: "Alamat", en: "Address" },
  saveAsNewCustomer: { id: "Simpan sebagai pelanggan baru", en: "Save as new customer" },
  registerNewCustomer: { id: "Daftarkan pelanggan baru", en: "Register new customer" },
  notFound: { id: "Tidak ditemukan", en: "Not found" },

  // Quick Add
  quickAdd: { id: "Tambah Cepat", en: "Quick Add" },

  // Add Item
  addItem: { id: "Tambah Item", en: "Add Item" },
  itemType: { id: "Jenis Barang", en: "Item Type" },
  serviceType: { id: "Jenis Layanan", en: "Service Type" },
  selectItemType: { id: "Pilih jenis barang", en: "Select item type" },
  selectService: { id: "Pilih layanan", en: "Select service" },
  selectItemFirst: { id: "Pilih jenis barang dulu", en: "Select item type first" },
  quantity: { id: "Jumlah", en: "Quantity" },
  unitPrice: { id: "Harga Satuan", en: "Unit Price" },
  discount: { id: "Diskon", en: "Discount" },
  subtotal: { id: "Subtotal", en: "Subtotal" },
  addNote: { id: "Tambah catatan", en: "Add note" },
  hideNote: { id: "Sembunyikan catatan", en: "Hide note" },
  notePlaceholder: {
    id: "Catatan khusus (misal: ada noda, jangan pakai pemutih)",
    en: "Special notes (e.g., has stains, no bleach)",
  },
  addToOrder: { id: "Tambah ke Order", en: "Add to Order" },

  // Item Types
  clothes: { id: "Pakaian", en: "Clothes" },
  bedding: { id: "Sprei & Selimut", en: "Bedding" },
  curtain: { id: "Gorden", en: "Curtain" },
  shoes: { id: "Sepatu", en: "Shoes" },
  bag: { id: "Tas", en: "Bag" },
  doll: { id: "Boneka", en: "Stuffed Toy" },
  carpet: { id: "Karpet", en: "Carpet" },
  blazer: { id: "Jas & Blazer", en: "Suit & Blazer" },

  // Service Types
  washDry: { id: "Cuci Kering", en: "Wash & Dry" },
  washIron: { id: "Cuci + Setrika", en: "Wash & Iron" },
  ironOnly: { id: "Setrika Saja", en: "Iron Only" },
  express: { id: "Express (1 Hari)", en: "Express (1 Day)" },
  sameDay: { id: "Same Day", en: "Same Day" },
  dryClean: { id: "Dry Clean", en: "Dry Clean" },

  // Cart / Service List
  serviceList: { id: "Daftar Layanan", en: "Service List" },
  services: { id: "layanan", en: "services" },
  estimatedCompletion: { id: "Estimasi selesai", en: "Estimated completion" },
  completed: { id: "Selesai", en: "Completed" },

  // Payment
  paymentDelivery: { id: "Pembayaran & Pengiriman", en: "Payment & Delivery" },
  paymentStatus: { id: "Status Bayar", en: "Payment Status" },
  paymentMethod: { id: "Metode Bayar", en: "Payment Method" },
  selectStatus: { id: "Pilih status", en: "Select status" },
  selectMethod: { id: "Pilih metode", en: "Select method" },
  paid: { id: "Lunas", en: "Paid" },
  downPayment: { id: "Down Payment", en: "Down Payment" },
  unpaid: { id: "Belum Bayar", en: "Unpaid" },
  dpAmount: { id: "Nominal DP", en: "DP Amount" },
  remaining: { id: "Sisa", en: "Remaining" },
  cash: { id: "Cash", en: "Cash" },
  bankTransfer: { id: "Transfer Bank", en: "Bank Transfer" },
  qris: { id: "QRIS", en: "QRIS" },

  // Delivery
  deliveryStatus: { id: "Status Kirim", en: "Delivery Status" },
  selectDelivery: { id: "Pilih pengiriman", en: "Select delivery" },
  selfPickup: { id: "Ambil Sendiri", en: "Self Pickup" },
  delivery: { id: "Antar ke Alamat", en: "Deliver to Address" },

  // Summary
  total: { id: "Total", en: "Total" },
  createOrder: { id: "Buat Order", en: "Create Order" },
  orderCreated: { id: "Order berhasil dibuat!", en: "Order created successfully!" },

  // Toast notifications
  itemAdded: { id: "Ditambahkan ke order", en: "Added to order" },
  itemUpdated: { id: "Jumlah diperbarui", en: "Quantity updated" },
  itemRemoved: { id: "Dihapus dari order", en: "Removed from order" },
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
