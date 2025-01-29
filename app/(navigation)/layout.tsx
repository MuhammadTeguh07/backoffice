import { AppSidebar } from "@/components/layout/AppSidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

export default function RootLayoutNavigation({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
