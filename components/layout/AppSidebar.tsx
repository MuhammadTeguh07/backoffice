"use client"

import * as React from "react"
import {
    BookOpen,
    Bot,
    Boxes,
    Command,
    Frame,
    LayoutDashboard,
    LifeBuoy,
    Map,
    Package2,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "./NavMain"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./NavUser"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { verifyToken } from "@/fetch/auth";
import { useEffect } from "react";
import Cookies from "js-cookie";

const data = {
    user: {
        name: "Muhammad Teguh",
        email: "teguh123@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const isActiveRoute = (route: string) => pathname === route

    const getVerifyToken = async (token: string) => {
        try {
            const response = await verifyToken(token);

            if (response.data.success) {
                console.log(response.data)
            }
        } catch (error: any) {
            handleLogout()
        }
    }

    const handleLogout = () => {
        Cookies.remove("authToken");
        window.location.href = "/";
    };

    useEffect(() => {
        let token = Cookies.get("authToken") || "";
        if(token) getVerifyToken(token);    
    }, [])


    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Bengkel Wiyung</span>
                                    <span className="truncate text-xs">Exp 12 Februari 2026</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild isActive={isActiveRoute("/dashboard")}>
                                <Link href={'/dashboard'}>
                                    <LayoutDashboard />
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel>Data Master</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild isActive={isActiveRoute("/category")}>
                                <Link href={'/category'}>
                                    <Package2 />
                                    <span>Kategori</span>
                                </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton asChild isActive={isActiveRoute("/product")}>
                                <Link href={'/product'}>
                                    <Boxes />
                                    <span>Produk</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
