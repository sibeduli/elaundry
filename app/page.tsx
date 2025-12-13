import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">eLaundry</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Boilerplate for eLaundry</p>
          <Button>Get Started</Button>
        </div>
      </main>
    </div>
  );
}
