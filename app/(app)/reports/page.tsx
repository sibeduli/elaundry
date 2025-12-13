"use client";

import { useI18n } from "@/lib/i18n";

export default function ReportsPage() {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t("rekapData")}</h2>
      <p className="text-muted-foreground">Reports will be displayed here.</p>
    </div>
  );
}
