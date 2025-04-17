import { getSession } from "@/actions/getCurrentSession";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login - Canva",
  description: "Explore with canva",
};

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getSession()
    if(session) {
        return redirect('/')
    }
  return (
    <div>
        {children}
    </div>
  );
}
