import React, { useState } from "react";
import { Users, Gift, PoundSterling, TrendingUp, Calendar } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";
import StatCard from "@/components/dashboard/StatCard";
import ReferralLinkCard from "@/components/dashboard/ReferralLinkCard";
import PerformanceCard from "@/components/dashboard/PerformanceCard";
import RecentReferrals from "@/components/dashboard/RecentReferrals";

const Dashboard = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    to: new Date(),
  });

  // Sample performance data
  const referralData = [
    { name: "Jan", value: 4 },
    { name: "Feb", value: 6 },
    { name: "Mar", value: 8 },
    { name: "Apr", value: 12 },
    { name: "May", value: 10 },
    { name: "Jun", value: 14 },
    { name: "Jul", value: 20 },
  ];

  const earningsData = [
    { name: "Jan", value: 120 },
    { name: "Feb", value: 180 },
    { name: "Mar", value: 240 },
    { name: "Apr", value: 360 },
    { name: "May", value: 300 },
    { name: "Jun", value: 420 },
    { name: "Jul", value: 600 },
  ];

  // Sample referral code - this would normally come from API/database
  const influencerCode = "emma-XY12Z";

  // Sample referrals with properly typed status and bookingId
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
    {
      id: "4",
      date: "Jul 15, 2023",
      bookingId: "890423",
      status: "cancelled" as "completed" | "pending" | "cancelled",
      amount: "£0.00",
    },
    {
      id: "5",
      date: "Jul 10, 2023",
      bookingId: "890219",
      status: "completed" as "completed" | "pending" | "cancelled",
      amount: "£45.00",
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

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-display font-bold text-bwc-charcoal">
                  Influencer Dashboard
                </h1>
                <p className="mt-2 text-bwc-charcoal-light">
                  Monitor your referrals and performance metrics
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
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
                <div className="bg-bwc-cream px-3 py-1 rounded-full">
                  <span className="text-sm text-bwc-charcoal-light">
                    Your Code:
                  </span>
                  <span className="ml-1 text-sm font-medium text-bwc-gold">
                    {influencerCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Referrals"
                value="74"
                icon={<Users size={24} />}
                trend={{
                  value: 12,
                  isPositive: true,
                  comparedTo:
                    date?.from && date?.to
                      ? `${format(date.from, "LLL d")} - ${format(
                          date.to,
                          "LLL d"
                        )}`
                      : "previous month",
                }}
                tooltip="Total number of referral code uses in the selected date range"
              />
              <StatCard
                title="Successful Referrals"
                value="65"
                icon={<Gift size={24} />}
                trend={{
                  value: 8,
                  isPositive: true,
                  comparedTo:
                    date?.from && date?.to
                      ? `${format(date.from, "LLL d")} - ${format(
                          date.to,
                          "LLL d"
                        )}`
                      : "previous month",
                }}
                tooltip="Number of completed bookings using your referral code"
              />
              <StatCard
                title="Conversion Rate"
                value="87.8%"
                icon={<TrendingUp size={24} />}
                trend={{
                  value: 5,
                  isPositive: true,
                  comparedTo:
                    date?.from && date?.to
                      ? `${format(date.from, "LLL d")} - ${format(
                          date.to,
                          "LLL d"
                        )}`
                      : "previous month",
                }}
                tooltip="Percentage of referrals that resulted in completed bookings"
              />
              <StatCard
                title="Total Earnings"
                value="£1,780"
                icon={<PoundSterling size={24} />}
                trend={{
                  value: 14,
                  isPositive: true,
                  comparedTo:
                    date?.from && date?.to
                      ? `${format(date.from, "LLL d")} - ${format(
                          date.to,
                          "LLL d"
                        )}`
                      : "previous month",
                }}
                tooltip="Total commission earned from completed bookings"
              />
            </div>

            {/* Referral Link */}
            <div className="mb-8">
              <ReferralLinkCard />
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <PerformanceCard title="Monthly Referrals" data={referralData} />
              <PerformanceCard
                title="Monthly Earnings"
                data={earningsData}
                color="#4CAF50"
              />
            </div>

            {/* Recent Referrals */}
            <div>
              <RecentReferrals referrals={recentReferrals} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Dashboard;
