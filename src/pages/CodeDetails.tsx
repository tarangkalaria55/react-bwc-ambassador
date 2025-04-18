import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import PageTransition from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodeUsage {
  id: string;
  date: string;
  bookingId: string;
  status: "completed" | "pending" | "cancelled";
  amount: string;
}

// Mock data generator for code usages
const generateMockUsages = (count: number): CodeUsage[] => {
  const statuses: ("completed" | "pending" | "cancelled")[] = [
    "completed",
    "pending",
    "cancelled",
  ];
  const usages: CodeUsage[] = [];

  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days

    usages.push({
      id: `usage-${i}`,
      date: date.toLocaleDateString(),
      bookingId: Math.floor(100000 + Math.random() * 900000).toString(),
      status,
      amount:
        status === "completed"
          ? "£" + (Math.floor(Math.random() * 200) + 50)
          : "£0",
    });
  }

  return usages.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

const ITEMS_PER_PAGE = 10;

interface SortConfig {
  field: "date" | "bookingId" | "status" | "amount" | null;
  direction: "asc" | "desc";
}

const CodeDetails = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [usages] = useState<CodeUsage[]>(() => generateMockUsages(50));
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: null,
    direction: "asc",
  });

  const handleSort = (field: SortConfig["field"]) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedUsages = [...usages].sort((a, b) => {
    if (!sortConfig.field) return 0;

    const aValue = a[sortConfig.field];
    const bValue = b[sortConfig.field];

    if (sortConfig.field === "date") {
      return sortConfig.direction === "asc"
        ? new Date(aValue).getTime() - new Date(bValue).getTime()
        : new Date(bValue).getTime() - new Date(aValue).getTime();
    }

    if (sortConfig.field === "amount") {
      const aNum =
        typeof aValue === "string" ? parseFloat(aValue.replace("£", "")) : 0;
      const bNum =
        typeof bValue === "string" ? parseFloat(bValue.replace("£", "")) : 0;
      return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const filteredUsages = sortedUsages.filter((usage) => {
    const matchesSearch =
      searchTerm === "" ||
      usage.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usage.date.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || usage.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsages.length / ITEMS_PER_PAGE);
  const paginatedUsages = filteredUsages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const stats = {
    completed: usages.filter((u) => u.status === "completed").length,
    pending: usages.filter((u) => u.status === "pending").length,
    cancelled: usages.filter((u) => u.status === "cancelled").length,
    totalEarnings: usages
      .filter((u) => u.status === "completed")
      .reduce((sum, u) => sum + parseFloat(u.amount.replace("£", "")), 0),
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} className="mr-2" /> Back
            </Button>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-display font-bold text-bwc-charcoal">
              Code Details: {code}
            </h1>
            <p className="text-sm text-bwc-charcoal-light">
              View detailed usage statistics and booking information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats.completed}</div>
                <div className="text-sm text-muted-foreground">
                  Completed Bookings
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">
                  Pending Bookings
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats.cancelled}</div>
                <div className="text-sm text-muted-foreground">
                  Cancelled Bookings
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">£{stats.totalEarnings}</div>
                <div className="text-sm text-muted-foreground">
                  Total Earnings
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search by booking ID or date..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => setStatusFilter(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="py-2 text-xs cursor-pointer"
                        onClick={() => handleSort("date")}
                      >
                        Date <ArrowUpDown className="inline h-3 w-3 ml-1" />
                      </TableHead>
                      <TableHead
                        className="py-2 text-xs cursor-pointer"
                        onClick={() => handleSort("bookingId")}
                      >
                        Booking ID{" "}
                        <ArrowUpDown className="inline h-3 w-3 ml-1" />
                      </TableHead>
                      <TableHead
                        className="py-2 text-xs cursor-pointer"
                        onClick={() => handleSort("status")}
                      >
                        Status <ArrowUpDown className="inline h-3 w-3 ml-1" />
                      </TableHead>
                      <TableHead
                        className="py-2 text-xs cursor-pointer"
                        onClick={() => handleSort("amount")}
                      >
                        Amount <ArrowUpDown className="inline h-3 w-3 ml-1" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsages.map((usage) => (
                      <TableRow key={usage.id}>
                        <TableCell>{usage.date}</TableCell>
                        <TableCell>{usage.bookingId}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                              usage.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : usage.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {usage.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {usage.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      filteredUsages.length
                    )}{" "}
                    of {filteredUsages.length} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="text-sm text-muted-foreground px-2">
                      Page {currentPage} of {totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default CodeDetails;
