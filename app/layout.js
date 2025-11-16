// ...existing code...
import SidebarClientProvider from "@/components/sidebarClientProvider";
import { Toaster } from "react-hot-toast";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css"; // ensure this file exists and contains your global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-row">
        <SidebarClientProvider>
          <AppSidebar />
          <SidebarTrigger className={`cursor-pointer`}/>
          <main className="flex flex-row w-full">
             <div className="flex flex-col gap-4 rounded-2xl bg-gray-100 h-screen w-full right-20 top-0 items-center justify-center">
              
              {children}
              
            </div>
          </main>
        </SidebarClientProvider>
      </body>
    </html>
  )
}