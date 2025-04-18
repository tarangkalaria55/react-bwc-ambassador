import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import PageTransition from "@/components/ui/PageTransition";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import {
  Users,
  Gift,
  PoundSterling,
  TrendingUp,
  Receipt,
  FileText,
  UserPlus,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import StatCard from "@/components/dashboard/StatCard";
import PerformanceCard from "@/components/dashboard/PerformanceCard";
import { mockReferralData, mockRevenueData } from "@/data/mockInfluencerData";
import RecentReferrals from "@/components/dashboard/RecentReferrals";

const Admin = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    to: new Date(),
  });

  // Mock statistics - replace with real data
  const stats = {
    totalInfluencers: 24,
    activeInfluencers: 18,
    pendingApplications: 5,
    totalEarnings: "£12,450.00",
    pendingPayments: "£3,280.00",
    monthlyGrowth: 12.5,
    conversionRate: 68,
    averageEarnings: "£518.75",
  };

  const quickActions = [
    {
      title: "View Applications",
      icon: FileText,
      href: "/applications",
      description: `${stats.pendingApplications} pending applications`,
    },
    {
      title: "Add Influencer",
      icon: UserPlus,
      href: "/add-influencer",
      description: "Create new influencer account",
    },
    {
      title: "Manage Invoices",
      icon: Receipt,
      href: "/admin-invoices",
      description: "Review and process payments",
    },
    {
      title: "All Influencers",
      icon: Users,
      href: "/all-influencers",
      description: "View and manage influencers",
    },
  ];

  const dateRangeText = date?.from ? (
    date.to ? (
      <>
        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
      </>
    ) : (
      format(date.from, "LLL dd, y")
    )
  ) : (
    <span>Pick a date range</span>
  );

  // Sample referrals
  const recentReferrals = [
    {
      id: "1",
      date: "Jul 25, 2023",
      bookingId: "890828",
      status: "completed" as "completed" | "pending" | "cancelled",
      amount: "£45.00",
    },
    {
      id: "2",
      date: "Jul 23, 2023",
      bookingId: "890712",
      status: "completed" as "completed" | "pending" | "cancelled",
      amount: "£45.00",
    },
    {
      id: "3",
      date: "Jul 20, 2023",
      bookingId: "890634",
      status: "pending" as "completed" | "pending" | "cancelled",
      amount: "£45.00",
    },
  ];

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-8">
          <div className="flex flex-col gap-8">
            {/* Header with Date Range */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-bwc-charcoal mb-2">
                  Admin Overview
                </h1>
                <p className="text-bwc-charcoal-light">
                  Monitor your influencer program performance
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateRangeText}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Influencers"
                value={stats.totalInfluencers.toString()}
                icon={<Users size={24} />}
                tooltip="Total number of registered influencers"
              />
              <StatCard
                title="Total Earnings"
                value={stats.totalEarnings}
                icon={<PoundSterling size={24} />}
                tooltip="Total earnings generated through referrals"
              />
              <StatCard
                title="Pending Payments"
                value={stats.pendingPayments}
                icon={<Receipt size={24} />}
                tooltip="Total payments awaiting processing"
              />
              <StatCard
                title="Conversion Rate"
                value={`${stats.conversionRate}%`}
                icon={<TrendingUp size={24} />}
                tooltip="Average conversion rate across all influencers"
              />
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceCard
                title="Monthly Referrals"
                data={mockReferralData}
              />
              <PerformanceCard
                title="Monthly Revenue"
                data={mockRevenueData}
                color="#4CAF50"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action) => (
                <div
                  key={action.title}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:border-bwc-gold transition-colors cursor-pointer"
                  onClick={() => navigate(action.href)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-bwc-charcoal">
                      {action.title}
                    </h3>
                    <action.icon className="h-5 w-5 text-bwc-gold" />
                  </div>
                  <p className="text-sm text-bwc-charcoal-light">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Referrals */}
            <div>
              <RecentReferrals referrals={recentReferrals} />
            </div>
          </div>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default Admin;
