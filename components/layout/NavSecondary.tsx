"use client"

import {type LucideIcon} from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

interface Props {
    name: string
    url: string
    icon: LucideIcon
    groupLabel?: string
}

export function NavSecondary({ name, url, icon: Icon, groupLabel }: Props) {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            {
                groupLabel &&
                <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
            }
            <SidebarMenu>
                <SidebarMenuItem key={name}>
                    <SidebarMenuButton asChild>
                        <a href={url}>
                            {Icon && <Icon />}
                            <span>{name}</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}
