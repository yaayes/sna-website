import { Link } from '@inertiajs/react';
import { ClipboardList, FileText, FolderTree, Handshake, LayoutGrid, Megaphone, Newspaper, TicketPercent, Users, UserCheck } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import admin from '@/routes/admin';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: admin.dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Moi Aussi',
        href: admin.moiAussi.index(),
        icon: Users,
    },
    {
        title: 'Soutien',
        href: admin.soutien.index(),
        icon: FileText,
    },
    {
        title: 'Partenaire',
        href: admin.partenaire.index(),
        icon: Handshake,
    },
    {
        title: 'Adhésions aidants',
        href: admin.adhesion.index(),
        icon: ClipboardList,
    },
    {
        title: 'Coupons',
        href: admin.coupons.index(),
        icon: TicketPercent,
    },
    {
        title: 'Actions SNA',
        href: admin.actions.index(),
        icon: Megaphone,
    },
    {
        title: 'Categories actions',
        href: admin.actionCategories.index(),
        icon: FolderTree,
    },
    {
        title: 'Représentants',
        href: admin.representants.index(),
        icon: UserCheck,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={admin.dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
