"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  // Pages that should not show header/footer
  const authPages = ["/auth/signin", "/auth/signup", "/profile/complete"];
  const workflowPages =
    pathname.startsWith("/workflow/") && pathname !== "/workflow";
  const shouldShowLayout = !authPages.includes(pathname) && !workflowPages;

  if (!shouldShowLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
