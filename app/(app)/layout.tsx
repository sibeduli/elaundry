import AuthenticatedLayout from "@/components/layouts/authenticated-layout";
import { Toaster } from "@/components/ui/sonner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
      <Toaster position="top-right" richColors />
    </>
  );
}
