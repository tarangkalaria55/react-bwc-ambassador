import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Receipt,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  PoundSterling,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface AdminSidebarProps {
  items: SidebarItem[];
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ items }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.dispatchEvent(new Event("localStorageChange"));
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-[#111111] border-r border-gray-800 text-white transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-800">
        {!isCollapsed && (
          <div className="text-lg font-semibold text-white">BWC Admin</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:text-bwc-gold"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 py-4">
          {items.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start px-4 py-2 text-white hover:text-bwc-gold hover:bg-gray-900",
                location.pathname === item.href && "bg-gray-900 text-bwc-gold",
                isCollapsed && "justify-center px-2"
              )}
              onClick={() => navigate(item.href)}
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>{item.title}</span>}
            </Button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800 p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-white hover:text-bwc-gold hover:bg-gray-900",
            isCollapsed && "justify-center px-2"
          )}
          onClick={handleLogout}
        >
          <LogOut className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
