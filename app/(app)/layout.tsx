import AuthenticatedLayout from "@/components/layouts/authenticated-layout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
