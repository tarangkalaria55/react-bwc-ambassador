import React, { useState } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Download,
  CheckCircle,
  XCircle,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
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
import PageTransition from "@/components/ui/PageTransition";
import AdminLayout from "@/components/layout/AdminLayout";
import { useNavigate } from "react-router-dom";

// Mock data - replace with real data from your API
const mockInvoices = [
  {
    id: "INV-2024-001",
    influencerName: "Sarah Johnson",
    month: "March 2024",
    totalAmount: 2500.0,
    invoiceNumber: "INV-2024-001",
    status: "paid",
    paidDate: "2024-03-15",
    email: "sarah.j@example.com",
  },
  {
    id: "INV-2024-002",
    influencerName: "Mike Chen",
    month: "March 2024",
    totalAmount: 1800.5,
    invoiceNumber: "INV-2024-002",
    status: "pending",
    paidDate: null,
    email: "mike.c@example.com",
  },
  {
    id: "INV-2024-003",
    influencerName: "Emma Wilson",
    month: "February 2024",
    totalAmount: 2100.75,
    invoiceNumber: "INV-2024-003",
    status: "paid",
    paidDate: "2024-02-15",
    email: "emma.w@example.com",
  },
  {
    id: "INV-2024-004",
    influencerName: "Alex Thompson",
    month: "February 2024",
    totalAmount: 3200.25,
    invoiceNumber: "INV-2024-004",
    status: "pending",
    paidDate: null,
    email: "alex.t@example.com",
  },
];

const AdminInvoices = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "month", direction: "desc" });
  const navigate = useNavigate();

  // Calculate summary statistics
  const totalInvoiced = mockInvoices.reduce(
    (sum, invoice) => sum + invoice.totalAmount,
    0
  );
  const totalPaid = mockInvoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  const totalPending = totalInvoiced - totalPaid;
  const pendingCount = mockInvoices.filter(
    (invoice) => invoice.status === "pending"
  ).length;

  // Filter and sort invoices
  const filteredInvoices = mockInvoices
    .filter((invoice) => {
      const searchString = searchQuery.toLowerCase();
      return (
        invoice.influencerName.toLowerCase().includes(searchString) ||
        invoice.invoiceNumber.toLowerCase().includes(searchString) ||
        invoice.email.toLowerCase().includes(searchString)
      );
    })
    .sort((a, b) => {
      if (sortConfig.key === "amount") {
        return sortConfig.direction === "asc"
          ? a.totalAmount - b.totalAmount
          : b.totalAmount - a.totalAmount;
      }
      // Default sort by date
      return sortConfig.direction === "asc"
        ? new Date(a.month).getTime() - new Date(b.month).getTime()
        : new Date(b.month).getTime() - new Date(a.month).getTime();
    });

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const markAsPaid = (invoiceId: string) => {
    // In a real application, this would make an API call to update the invoice status
    console.log("Marking invoice as paid:", invoiceId);
  };

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-bwc-charcoal mb-2">
                Influencer Invoices
              </h1>
              <p className="text-bwc-charcoal-light">
                Manage and track all influencer payments
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex gap-4">
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[250px]"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[180px] justify-start text-left font-normal"
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Invoiced</CardTitle>
                <CardDescription>All invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  £{totalInvoiced.toFixed(2)}
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
                <CardTitle className="text-lg">Total Pending</CardTitle>
                <CardDescription>Awaiting payment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-amber-600">
                  £{totalPending.toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Invoices</CardTitle>
                <CardDescription>Number of unpaid invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-amber-600">
                  {pendingCount}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Influencer</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("date")}
                      className="hover:text-bwc-gold"
                    >
                      Month
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("amount")}
                      className="hover:text-bwc-gold"
                    >
                      Amount
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      <div
                        className="cursor-pointer hover:text-bwc-gold"
                        onClick={() =>
                          navigate(`/admin-invoices/${invoice.invoiceNumber}`)
                        }
                      >
                        {invoice.influencerName}
                        <div className="text-sm text-gray-500 hover:text-bwc-gold/80">
                          {invoice.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{invoice.month}</TableCell>
                    <TableCell>£{invoice.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>{invoice.invoiceNumber}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "capitalize",
                          invoice.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        )}
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {invoice.paidDate
                        ? format(new Date(invoice.paidDate), "dd MMM yyyy")
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-bwc-charcoal hover:text-bwc-gold"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Invoice
                      </Button>
                      {invoice.status === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => markAsPaid(invoice.invoiceNumber)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark Paid
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default AdminInvoices;
