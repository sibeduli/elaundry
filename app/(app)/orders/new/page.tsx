"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  Minus,
  Shirt,
  Wind,
  Sparkles,
  Zap,
  Clock,
  Calendar,
  StickyNote,
  Trash2,
  ShoppingBag,
  Search,
  UserPlus,
  User,
  Phone,
  QrCode,
  Check,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

// Mock customer database
const mockCustomers = [
  {
    id: "C001",
    name: "Budi Santoso",
    phone: "081234567890",
    email: "budi@email.com",
    address: "Jl. Merdeka No. 10, Jakarta",
  },
  {
    id: "C002",
    name: "Siti Rahayu",
    phone: "082345678901",
    email: "siti@email.com",
    address: "Jl. Sudirman No. 25, Bandung",
  },
  {
    id: "C003",
    name: "Ahmad Wijaya",
    phone: "083456789012",
    email: "ahmad@email.com",
    address: "Jl. Gatot Subroto No. 5, Surabaya",
  },
  {
    id: "C004",
    name: "Dewi Lestari",
    phone: "084567890123",
    email: "dewi@email.com",
    address: "Jl. Asia Afrika No. 15, Bandung",
  },
  {
    id: "C005",
    name: "Rudi Hermawan",
    phone: "085678901234",
    email: "rudi@email.com",
    address: "Jl. Diponegoro No. 30, Semarang",
  },
];

type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};

// Item Types (Jenis Barang)
const jenisBarangOptions = [
  { value: "pakaian", labelKey: "clothes", icon: Shirt, unit: "kg" },
  { value: "sprei-selimut", labelKey: "bedding", icon: Wind, unit: "pcs" },
  { value: "gorden", labelKey: "curtain", icon: Wind, unit: "meter" },
  { value: "sepatu", labelKey: "shoes", icon: ShoppingBag, unit: "pasang" },
  { value: "tas", labelKey: "bag", icon: ShoppingBag, unit: "pcs" },
  { value: "boneka", labelKey: "doll", icon: Sparkles, unit: "pcs" },
  { value: "karpet", labelKey: "carpet", icon: Wind, unit: "meter" },
  { value: "jas-blazer", labelKey: "blazer", icon: Shirt, unit: "pcs" },
];

// Service Types (Jenis Layanan)
const layananOptions = [
  { value: "cuci-kering", labelKey: "washDry", icon: Wind, days: 3 },
  { value: "cuci-setrika", labelKey: "washIron", icon: Sparkles, days: 3 },
  { value: "setrika-saja", labelKey: "ironOnly", icon: Sparkles, days: 2 },
  { value: "express", labelKey: "express", icon: Zap, days: 1 },
  { value: "same-day", labelKey: "sameDay", icon: Zap, days: 0 },
  { value: "dry-clean", labelKey: "dryClean", icon: Sparkles, days: 5 },
];

// Price Matrix: [jenisBarang][layanan] = harga per unit
const priceMatrix: Record<string, Record<string, number>> = {
  pakaian: {
    "cuci-kering": 7000,
    "cuci-setrika": 10000,
    "setrika-saja": 5000,
    express: 15000,
    "same-day": 20000,
    "dry-clean": 25000,
  },
  "sprei-selimut": {
    "cuci-kering": 15000,
    "cuci-setrika": 20000,
    "setrika-saja": 10000,
    express: 30000,
    "same-day": 40000,
    "dry-clean": 35000,
  },
  gorden: {
    "cuci-kering": 12000,
    "cuci-setrika": 18000,
    "setrika-saja": 8000,
    express: 25000,
    "same-day": 35000,
    "dry-clean": 30000,
  },
  sepatu: {
    "cuci-kering": 30000,
    "cuci-setrika": 30000,
    "setrika-saja": 0,
    express: 50000,
    "same-day": 65000,
    "dry-clean": 45000,
  },
  tas: {
    "cuci-kering": 35000,
    "cuci-setrika": 35000,
    "setrika-saja": 0,
    express: 55000,
    "same-day": 70000,
    "dry-clean": 50000,
  },
  boneka: {
    "cuci-kering": 25000,
    "cuci-setrika": 25000,
    "setrika-saja": 0,
    express: 40000,
    "same-day": 55000,
    "dry-clean": 35000,
  },
  karpet: {
    "cuci-kering": 20000,
    "cuci-setrika": 25000,
    "setrika-saja": 0,
    express: 35000,
    "same-day": 50000,
    "dry-clean": 40000,
  },
  "jas-blazer": {
    "cuci-kering": 20000,
    "cuci-setrika": 25000,
    "setrika-saja": 15000,
    express: 40000,
    "same-day": 55000,
    "dry-clean": 35000,
  },
};

// Quick Add Presets
const quickPresets = [
  { label: "Pakaian 5kg Cuci Setrika", jenis: "pakaian", layanan: "cuci-setrika", qty: 5 },
  { label: "Sprei 2pcs Express", jenis: "sprei-selimut", layanan: "express", qty: 2 },
  { label: "Sepatu 1 pasang", jenis: "sepatu", layanan: "cuci-kering", qty: 1 },
];

const statusBayarOptions = [
  { value: "lunas", labelKey: "paid", color: "bg-green-100 text-green-800" },
  { value: "down-payment", labelKey: "downPayment", color: "bg-yellow-100 text-yellow-800" },
  { value: "belum-bayar", labelKey: "unpaid", color: "bg-red-100 text-red-800" },
];

const statusKirimOptions = [
  { value: "ambil-sendiri", labelKey: "selfPickup" },
  { value: "antar", labelKey: "delivery" },
];

const metodeBayarOptions = [
  { value: "cash", labelKey: "cash" },
  { value: "transfer", labelKey: "bankTransfer" },
  { value: "qris", labelKey: "qris" },
];

type CartItem = {
  id: string;
  jenisBarang: string;
  jenisBarangLabel: string;
  layanan: string;
  layananLabel: string;
  quantity: number;
  unit: string;
  hargaSatuan: number;
  diskon: number;
  subtotal: number;
  catatan: string;
};

export default function NewOrderPage() {
  const { t } = useI18n();

  // Customer search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  // Customer form state (for new or editing)
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [saveCustomer, setSaveCustomer] = useState(true);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Item form state
  const [selectedJenis, setSelectedJenis] = useState("");
  const [selectedLayanan, setSelectedLayanan] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [diskon, setDiskon] = useState<number>(0);
  const [catatan, setCatatan] = useState("");
  const [showCatatan, setShowCatatan] = useState(false);

  // Payment state
  const [statusBayar, setStatusBayar] = useState("");
  const [nominalDP, setNominalDP] = useState<number>(0);
  const [statusKirim, setStatusKirim] = useState("");
  const [metodeBayar, setMetodeBayar] = useState("");

  // Get price from matrix
  const getHargaSatuan = (jenis: string, layanan: string) => {
    return priceMatrix[jenis]?.[layanan] || 0;
  };

  // Get unit for jenis barang
  const getUnit = (jenis: string) => {
    return jenisBarangOptions.find((j) => j.value === jenis)?.unit || "pcs";
  };

  // Get estimated days
  const getEstimatedDays = (layanan: string) => {
    return layananOptions.find((l) => l.value === layanan)?.days || 3;
  };

  // Calculate subtotal for current selection
  const currentHarga = getHargaSatuan(selectedJenis, selectedLayanan);
  const currentSubtotal = Math.max(0, quantity * currentHarga - diskon);

  // Filter available layanan based on jenis (some combos have 0 price = not available)
  const availableLayanan = useMemo(() => {
    if (!selectedJenis) return layananOptions;
    return layananOptions.filter((l) => getHargaSatuan(selectedJenis, l.value) > 0);
  }, [selectedJenis]);

  // Calculate estimated completion date
  const estimatedDate = useMemo(() => {
    if (cartItems.length === 0) return null;
    const maxDays = Math.max(...cartItems.map((item) => getEstimatedDays(item.layanan)));
    const date = new Date();
    date.setDate(date.getDate() + maxDays);
    return date;
  }, [cartItems]);

  // Add item to cart (merge if same type, service, price, discount, and no special notes)
  const addToCart = () => {
    if (!selectedJenis || !selectedLayanan || quantity <= 0) return;

    const jenisOption = jenisBarangOptions.find((j) => j.value === selectedJenis);
    const layananOption = layananOptions.find((l) => l.value === selectedLayanan);

    // Check for existing item with same properties (only merge if no special notes)
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.jenisBarang === selectedJenis &&
        item.layanan === selectedLayanan &&
        item.hargaSatuan === currentHarga &&
        item.diskon === diskon &&
        !item.catatan &&
        !catatan
    );

    const itemLabel = jenisOption ? t(jenisOption.labelKey) : "";
    const serviceLabel = layananOption ? t(layananOption.labelKey) : "";

    if (existingIndex !== -1) {
      // Merge: add quantity to existing item
      const updatedItems = [...cartItems];
      const existing = updatedItems[existingIndex];
      const newQty = existing.quantity + quantity;
      updatedItems[existingIndex] = {
        ...existing,
        quantity: newQty,
        subtotal: newQty * existing.hargaSatuan - existing.diskon,
      };
      setCartItems(updatedItems);
      toast.success(t("itemUpdated"), {
        description: `${itemLabel} - ${serviceLabel} (${newQty} ${getUnit(selectedJenis)})`,
      });
    } else {
      // Create new item
      const newItem: CartItem = {
        id: Date.now().toString(),
        jenisBarang: selectedJenis,
        jenisBarangLabel: itemLabel,
        layanan: selectedLayanan,
        layananLabel: serviceLabel,
        quantity,
        unit: getUnit(selectedJenis),
        hargaSatuan: currentHarga,
        diskon,
        subtotal: currentSubtotal,
        catatan,
      };
      setCartItems([...cartItems, newItem]);
      toast.success(t("itemAdded"), {
        description: `${itemLabel} - ${serviceLabel} (${quantity} ${getUnit(selectedJenis)})`,
      });
    }

    resetForm();
  };

  // Quick add preset (also merges if matching item exists)
  const addPreset = (preset: (typeof quickPresets)[0]) => {
    const jenisOption = jenisBarangOptions.find((j) => j.value === preset.jenis);
    const layananOption = layananOptions.find((l) => l.value === preset.layanan);
    const harga = getHargaSatuan(preset.jenis, preset.layanan);

    const itemLabel = jenisOption ? t(jenisOption.labelKey) : "";
    const serviceLabel = layananOption ? t(layananOption.labelKey) : "";

    // Check for existing item with same properties
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.jenisBarang === preset.jenis &&
        item.layanan === preset.layanan &&
        item.hargaSatuan === harga &&
        item.diskon === 0 &&
        !item.catatan
    );

    if (existingIndex !== -1) {
      // Merge: add quantity to existing item
      const updatedItems = [...cartItems];
      const existing = updatedItems[existingIndex];
      const newQty = existing.quantity + preset.qty;
      updatedItems[existingIndex] = {
        ...existing,
        quantity: newQty,
        subtotal: newQty * existing.hargaSatuan,
      };
      setCartItems(updatedItems);
      toast.success(t("itemUpdated"), {
        description: `${itemLabel} - ${serviceLabel} (${newQty} ${getUnit(preset.jenis)})`,
      });
    } else {
      // Create new item
      const newItem: CartItem = {
        id: Date.now().toString(),
        jenisBarang: preset.jenis,
        jenisBarangLabel: itemLabel,
        layanan: preset.layanan,
        layananLabel: serviceLabel,
        quantity: preset.qty,
        unit: getUnit(preset.jenis),
        hargaSatuan: harga,
        diskon: 0,
        subtotal: preset.qty * harga,
        catatan: "",
      };
      setCartItems([...cartItems, newItem]);
      toast.success(t("itemAdded"), {
        description: `${itemLabel} - ${serviceLabel} (${preset.qty} ${getUnit(preset.jenis)})`,
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setSelectedJenis("");
    setSelectedLayanan("");
    setQuantity(1);
    setDiskon(0);
    setCatatan("");
    setShowCatatan(false);
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    setCartItems(cartItems.filter((i) => i.id !== id));
    if (item) {
      toast.error(t("itemRemoved"), {
        description: `${item.jenisBarangLabel} - ${item.layananLabel}`,
      });
    }
  };

  // Update quantity in cart
  const updateCartQty = (id: string, delta: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          const newSubtotal = Math.max(0, newQty * item.hargaSatuan - item.diskon);
          return { ...item, quantity: newQty, subtotal: newSubtotal };
        }
        return item;
      })
    );
  };

  // Calculate totals
  const totalBiaya = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Search customers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const results = mockCustomers.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.phone.includes(query) ||
          c.id.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  // Select existing customer
  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerName(customer.name);
    setCustomerPhone(customer.phone);
    setCustomerEmail(customer.email);
    setCustomerAddress(customer.address);
    setIsNewCustomer(false);
    setShowResults(false);
    setSearchQuery("");
  };

  // Start new customer registration
  const startNewCustomer = () => {
    setSelectedCustomer(null);
    setIsNewCustomer(true);
    setCustomerName(searchQuery);
    setCustomerPhone("");
    setCustomerEmail("");
    setCustomerAddress("");
    setShowResults(false);
  };

  // Clear customer selection
  const clearCustomer = () => {
    setSelectedCustomer(null);
    setIsNewCustomer(false);
    setSearchQuery("");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setCustomerAddress("");
  };

  // Handle submit
  const handleSubmit = () => {
    const orderData = {
      customer: {
        id: selectedCustomer?.id || null,
        isNew: isNewCustomer,
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
        address: customerAddress,
        save: isNewCustomer && saveCustomer,
      },
      items: cartItems,
      payment: {
        status: statusBayar,
        method: metodeBayar,
        dpAmount: nominalDP,
        deliveryStatus: statusKirim,
      },
      estimatedCompletion: estimatedDate,
      total: totalBiaya,
    };
    console.log("Order submitted:", orderData);
    alert(t("orderCreated"));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("newOrder")}</h2>
        {cartItems.length > 0 && (
          <Badge variant="secondary" className="text-sm">
            {cartItems.length} {t("services")}
          </Badge>
        )}
      </div>

      {/* Customer Search / Selection */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            {t("customer")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Show selected customer or search */}
          {selectedCustomer ? (
            <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{selectedCustomer.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                    <p className="text-xs text-muted-foreground">{selectedCustomer.id}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={clearCustomer}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : isNewCustomer ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{t("newCustomer")}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={clearCustomer}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nama">{t("customerName")} *</Label>
                  <Input
                    id="nama"
                    placeholder="Nama lengkap"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="telpon">{t("phoneNumber")} *</Label>
                  <Input
                    id="telpon"
                    placeholder="08xxxxxxxxxx"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="alamat">{t("address")}</Label>
                <textarea
                  id="alamat"
                  placeholder="Alamat lengkap"
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="save"
                  checked={saveCustomer}
                  onCheckedChange={(checked) => setSaveCustomer(checked as boolean)}
                />
                <Label htmlFor="save" className="text-sm font-normal cursor-pointer">
                  {t("saveAsNewCustomer")}
                </Label>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("searchCustomer")}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                />
              </div>

              {/* Search hints */}
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" /> {t("name")}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {t("phoneNumber")}
                </span>
                <span className="flex items-center gap-1">
                  <QrCode className="h-3 w-3" /> ID / QR
                </span>
              </div>

              {/* Search Results */}
              {showResults && (
                <div className="border rounded-lg divide-y max-h-[200px] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((customer) => (
                      <button
                        key={customer.id}
                        className="w-full p-3 text-left hover:bg-muted/50 transition-colors flex items-center gap-3"
                        onClick={() => selectCustomer(customer)}
                      >
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-medium text-blue-600">
                          {customer.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {customer.phone} · {customer.id}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      {t("notFound")}
                    </div>
                  )}
                </div>
              )}

              {/* New Customer Button */}
              <Button variant="outline" className="w-full" onClick={startNewCustomer}>
                <UserPlus className="h-4 w-4 mr-2" />
                {t("registerNewCustomer")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Add Presets */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            {t("quickAdd")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {quickPresets.map((preset, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => addPreset(preset)}
                className="text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                {preset.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Item Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{t("addItem")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Jenis Barang */}
          <div>
            <Label>{t("itemType")}</Label>
            <Select
              value={selectedJenis}
              onValueChange={(v) => {
                setSelectedJenis(v);
                setSelectedLayanan("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("selectItemType")} />
              </SelectTrigger>
              <SelectContent>
                {jenisBarangOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {t(opt.labelKey)}
                        <span className="text-muted-foreground text-xs">({opt.unit})</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Layanan */}
          <div>
            <Label>{t("serviceType")}</Label>
            <Select
              value={selectedLayanan}
              onValueChange={setSelectedLayanan}
              disabled={!selectedJenis}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={selectedJenis ? t("selectService") : t("selectItemFirst")}
                />
              </SelectTrigger>
              <SelectContent>
                {availableLayanan.map((opt) => {
                  const Icon = opt.icon;
                  const price = getHargaSatuan(selectedJenis, opt.value);
                  return (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {t(opt.labelKey)}
                        <span className="text-muted-foreground text-xs">
                          Rp {price.toLocaleString("id-ID")}/{getUnit(selectedJenis)}
                        </span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>
                {t("quantity")} ({selectedJenis ? getUnit(selectedJenis) : "unit"})
              </Label>
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>{t("unitPrice")}</Label>
              <Input
                type="text"
                value={`Rp ${currentHarga.toLocaleString("id-ID")}`}
                disabled
                className="bg-muted"
              />
            </div>
          </div>

          {/* Diskon and Total */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t("discount")} (Rp)</Label>
              <Input
                type="number"
                min={0}
                value={diskon}
                onChange={(e) => setDiskon(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>{t("subtotal")}</Label>
              <Input
                type="text"
                value={`Rp ${currentSubtotal.toLocaleString("id-ID")}`}
                disabled
                className="bg-muted font-semibold"
              />
            </div>
          </div>

          {/* Catatan Toggle */}
          <div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowCatatan(!showCatatan)}
              className="text-muted-foreground"
            >
              <StickyNote className="h-4 w-4 mr-2" />
              {showCatatan ? t("hideNote") : t("addNote")}
            </Button>
            {showCatatan && (
              <textarea
                placeholder={t("notePlaceholder")}
                className="mt-2 flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
              />
            )}
          </div>

          {/* Add Button */}
          <Button
            className="w-full bg-emerald-500 hover:bg-emerald-600"
            onClick={addToCart}
            disabled={!selectedJenis || !selectedLayanan || quantity <= 0}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("addToOrder")}
          </Button>
        </CardContent>
      </Card>

      {/* Cart Items */}
      {cartItems.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                {t("serviceList")} ({cartItems.length})
              </CardTitle>
              {estimatedDate && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {t("completed")}:{" "}
                  {estimatedDate.toLocaleDateString("id-ID", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-4 bg-muted/50 rounded-lg border"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.jenisBarangLabel}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.layananLabel}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} {item.unit} × Rp {item.hargaSatuan.toLocaleString("id-ID")}
                    {item.diskon > 0 && (
                      <span className="text-red-500">
                        {" "}
                        - Rp {item.diskon.toLocaleString("id-ID")}
                      </span>
                    )}
                  </p>
                  {item.catatan && (
                    <p className="text-xs text-muted-foreground italic flex items-center gap-1">
                      <StickyNote className="h-3 w-3" />
                      {item.catatan}
                    </p>
                  )}
                  <p className="text-sm font-semibold">
                    Rp {item.subtotal.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateCartQty(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateCartQty(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Payment Section */}
      {cartItems.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t("paymentDelivery")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{t("paymentStatus")}</Label>
                <Select value={statusBayar} onValueChange={setStatusBayar}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    {statusBayarOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {t(opt.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{t("paymentMethod")}</Label>
                <Select value={metodeBayar} onValueChange={setMetodeBayar}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectMethod")} />
                  </SelectTrigger>
                  <SelectContent>
                    {metodeBayarOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {t(opt.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {statusBayar === "down-payment" && (
              <div>
                <Label>{t("dpAmount")}</Label>
                <Input
                  type="number"
                  min={0}
                  placeholder="Masukkan nominal DP"
                  value={nominalDP || ""}
                  onChange={(e) => setNominalDP(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {t("remaining")}: Rp {(totalBiaya - nominalDP).toLocaleString("id-ID")}
                </p>
              </div>
            )}

            <div>
              <Label>{t("deliveryStatus")}</Label>
              <Select value={statusKirim} onValueChange={setStatusKirim}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectDelivery")} />
                </SelectTrigger>
                <SelectContent>
                  {statusKirimOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {t(opt.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Summary */}
            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {t("subtotal")} ({cartItems.length} {t("services")})
                </span>
                <span>Rp {totalBiaya.toLocaleString("id-ID")}</span>
              </div>
              {statusBayar === "down-payment" && nominalDP > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Down Payment</span>
                  <span className="text-green-600">- Rp {nominalDP.toLocaleString("id-ID")}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>{t("total")}</span>
                <span className="text-blue-600">Rp {totalBiaya.toLocaleString("id-ID")}</span>
              </div>
              {estimatedDate && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
                  <Clock className="h-4 w-4" />
                  {t("estimatedCompletion")}:{" "}
                  {estimatedDate.toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              )}
            </div>

            {/* Submit */}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
              onClick={handleSubmit}
              disabled={!statusBayar || !statusKirim || !metodeBayar}
            >
              {t("createOrder")}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
