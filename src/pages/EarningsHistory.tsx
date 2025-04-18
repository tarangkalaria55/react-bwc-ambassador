import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";

// Mock data - replace with real data from your API
const mockEarnings = [
  {
    id: 1,
    month: "March 2024",
    totalEarned: 2500.0,
    invoiceNumber: "INV-2024-001",
    status: "paid",
    paidDate: "2024-03-15",
  },
  {
    id: 2,
    month: "February 2024",
    totalEarned: 1800.5,
    invoiceNumber: "INV-2024-002",
    status: "pending",
    paidDate: null,
  },
  {
    id: 3,
    month: "January 2024",
    totalEarned: 2100.75,
    invoiceNumber: "INV-2024-003",
    status: "paid",
    paidDate: "2024-02-15",
  },
];

const EarningsHistory = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Calculate summary statistics
  const totalEarned = mockEarnings.reduce(
    (sum, earning) => sum + earning.totalEarned,
    0
  );
  const totalPaid = mockEarnings
    .filter((earning) => earning.status === "paid")
    .reduce((sum, earning) => sum + earning.totalEarned, 0);
  const totalPending = totalEarned - totalPaid;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-bwc-charcoal mb-2">
                  Earnings History
                </h1>
                <p className="text-bwc-charcoal-light">
                  Track your earnings and payment status
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[240px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "MMMM yyyy")
                      ) : (
                        <span>Pick a month</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Earned</CardTitle>
                  <CardDescription>All time earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    £{totalEarned.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Paid</CardTitle>
                  <CardDescription>Processed payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">
                    £{totalPaid.toFixed(2)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Outstanding Balance</CardTitle>
                  <CardDescription>Pending payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-amber-600">
                    £{totalPending.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Invoice Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEarnings.map((earning) => (
                    <TableRow key={earning.id}>
                      <TableCell className="font-medium">
                        {earning.month}
                      </TableCell>
                      <TableCell>£{earning.totalEarned.toFixed(2)}</TableCell>
                      <TableCell>{earning.invoiceNumber}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "capitalize",
                            earning.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          )}
                        >
                          {earning.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {earning.paidDate
                          ? format(new Date(earning.paidDate), "dd MMM yyyy")
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-bwc-charcoal hover:text-bwc-gold"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Invoice
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default EarningsHistory;
