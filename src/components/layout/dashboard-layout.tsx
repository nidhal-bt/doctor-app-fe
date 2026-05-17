"use client"

import { Building2 } from "lucide-react"
import { SidebarLayout } from "@/src/components/layout/components/sidebar-layout"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/src/components/ui/sidebar"

const MOCK_WORKSPACE = {
  name: "City Medical Center",
  type: "Hospital",
}

interface DashboardLayoutProps {
  navigation?: React.ReactNode
  children: React.ReactNode
}

export default function DashboardLayout({ navigation, children }: DashboardLayoutProps) {
  const topSection = (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary/10">
                  <Building2 className="size-4 text-sidebar-primary" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{MOCK_WORKSPACE.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{MOCK_WORKSPACE.type}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      {navigation}
    </>
  )

  return (
    <SidebarLayout navigation={topSection}>
      <header className="flex h-14 items-center border-b px-4">
        <SidebarTrigger />
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
    </SidebarLayout>
  )
}
