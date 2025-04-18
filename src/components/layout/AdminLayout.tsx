import React from "react";
import AdminSidebar from "./AdminSidebar";
import { cn } from "@/lib/utils";
import {
  Users,
  LayoutDashboard,
  FileText,
  PoundSterling,
  Settings,
  Ticket,
  Mail,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, className }) => {
  const sidebarItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "All Influencers",
      href: "/all-influencers",
      icon: Users,
    },
    {
      title: "Active Codes",
      href: "/active-codes",
      icon: Ticket,
    },
    {
      title: "Applications",
      href: "/applications",
      icon: FileText,
    },
    {
      title: "Earnings",
      href: "/admin-invoices",
      icon: PoundSterling,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      title: "Welcome Email",
      href: "/welcome-email",
      icon: Mail,
    },
  ];

  return (
    <div className="flex h-screen">
      <AdminSidebar items={sidebarItems} />
      <main className={cn("flex-1 overflow-y-auto bg-gray-50", className)}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
