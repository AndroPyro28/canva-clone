import type { Metadata } from "next";
import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";
import { Canvas } from "./components/canvas";
export const metadata: Metadata = {
  title: "Home - Canva",
  description: "Explore with canva",
};

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex flex-col h-screen overflow-hidden`}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <main className="flex-1 overflow-hidden flex bg-[#f0f0f0] items-center justify-center">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
