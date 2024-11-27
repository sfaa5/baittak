import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Companyheader from "@/components/Company/Companyheader"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container px-[60px]">
        <Companyheader/>
        
        {children}
      </main>
    </SidebarProvider>
  )
}
