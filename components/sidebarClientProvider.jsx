// ...existing code...
"use client"
import { SidebarProvider } from "./ui/sidebar"

export default function SidebarClientProvider({ children }) {
  return <SidebarProvider>{children}</SidebarProvider>
}