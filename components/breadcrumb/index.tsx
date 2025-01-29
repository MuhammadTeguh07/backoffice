import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@/components/ui/separator";
import React from "react";

interface Props {
    data: {
        url: string
        title: string
    }[]
}

export function BreadcrumbComponent({ data }: Props) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="ml-1" />
                <Separator orientation="vertical" className="h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {
                            data.map((item, index) => (
                                <React.Fragment key={index}>
                                    <BreadcrumbItem className="hidden md:block">
                                        {
                                            item.url ? (
                                                <BreadcrumbLink href={item.url}>
                                                    {item.title}
                                                </BreadcrumbLink>
                                            ) : (
                                                <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                            )
                                        }
                                    </BreadcrumbItem>
                                    {
                                        index !== data.length - 1 && (
                                            <BreadcrumbSeparator className="hidden md:block" />
                                        )
                                    }
                                </React.Fragment>
                            ))
                        }

                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}