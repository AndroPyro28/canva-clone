import type { Metadata } from "next";
import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";
import { Banner } from "./components/banner";

export const metadata: Metadata = {
  title: "Home - Canva",
  description: "Explore with canva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex min-h-screen bg-white`}>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[72px]">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto pt-20">
          <Banner />
        </main>
      </div>
    </div>
  );
}
