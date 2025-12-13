"use client";

import { useI18n } from "@/lib/i18n";

export default function CustomersPage() {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {t("dataPelanggan")}
      </h2>
      <p className="text-muted-foreground">Customer data will be displayed here.</p>
    </div>
  );
}
