"use client"

import { Stethoscope } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/src/components/ui/sidebar"

const MOCK_USER = {
  name: "Dr. John Doe",
  specialty: "General Practitioner",
  avatar: "",
}

interface SidebarLayoutProps {
  navigation: React.ReactNode
  children: React.ReactNode
}

export function SidebarLayout({ navigation, children }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" render={<a href="#" />}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Stethoscope className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">DoctorApp</span>
                  <span className="truncate text-xs text-muted-foreground">Medical Platform</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {navigation}
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={MOCK_USER.avatar} alt={MOCK_USER.name} />
                  <AvatarFallback className="rounded-lg">
                    {MOCK_USER.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{MOCK_USER.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{MOCK_USER.specialty}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
