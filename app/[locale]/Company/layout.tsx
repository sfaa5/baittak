import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Company/app-sidebar"
import Companyheader from "@/components/Company/Companyheader"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (

          <SidebarProvider >
      <AppSidebar />
      <main className="container px-[60px]">
        <Companyheader/>
        <div className="">{children}</div>
        
      </main>
    </SidebarProvider>
 

  )
}
