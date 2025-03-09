import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Company/app-sidebar";
import Companyheader from "@/components/Company/Companyheader";
import NextAuthProvider from "@/app/providers/NextAuthProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
    <SidebarProvider>
      <AppSidebar />
      <main className="md:container flex flex-col w-full px-4">
        <Companyheader />
        <div className="">{children}</div>
      </main>
    </SidebarProvider></NextAuthProvider>
  );
}
