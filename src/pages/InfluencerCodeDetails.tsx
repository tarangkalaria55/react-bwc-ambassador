import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import PageTransition from "@/components/ui/PageTransition";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  PoundSterling,
  Search,
  Download,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { CodeUsage } from "@/components/admin/InfluencerCodeDetailsDialog";

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "completed":
      return (
        <div className="flex items-center text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full text-xs font-medium">
          <CheckCircle2 size={12} className="mr-1" />
          Completed
        </div>
      );
    case "pending":
      return (
        <div className="flex items-center text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-xs font-medium">
          <Clock size={12} className="mr-1" />
          Pending
        </div>
      );
    case "cancelled":
      return (
        <div className="flex items-center text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full text-xs font-medium">
          <AlertCircle size={12} className="mr-1" />
          Cancelled
        </div>
      );
    default:
      return null;
  }
};

const generateMockCodeUsages = (
  influencerName: string,
  count = 200
): CodeUsage[] => {
  const statuses: ("completed" | "pending" | "cancelled")[] = [
    "completed",
    "pending",
    "cancelled",
  ];
  const usages: CodeUsage[] = [];

  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount =
      status === "completed"
        ? `£${(Math.random() * 200 + 50).toFixed(2)}`
        : "£0.00";

    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 365));
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const bookingId = Math.floor(100000 + Math.random() * 900000).toString();

    usages.push({
      id: `usage-${i}-${influencerName.replace(" ", "-")}`,
      date: formattedDate,
      bookingId,
      status,
      amount,
    });
  }

  return usages.sort((a, b) => {
    const dateA = new Date(a.date.split(" ").join("-"));
    const dateB = new Date(b.date.split(" ").join("-"));
    return dateB.getTime() - dateA.getTime();
  });
};

const ITEMS_PER_PAGE = 20;

const InfluencerCodeDetails = () => {
  const { influencerName } = useParams<{ influencerName: string }>();
  const navigate = useNavigate();
  const [codeUsages, setCodeUsages] = useState<CodeUsage[]>([]);
  const [filteredUsages, setFilteredUsages] = useState<CodeUsage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (influencerName) {
      setTimeout(() => {
        const decodedName = decodeURIComponent(influencerName);
        const data = generateMockCodeUsages(decodedName);
        setCodeUsages(data);
        setFilteredUsages(data);
        setIsLoading(false);
      }, 500);
    }
  }, [influencerName]);

  useEffect(() => {
    let result = codeUsages;

    if (statusFilter) {
      result = result.filter((usage) => usage.status === statusFilter);
    }

    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(
        (usage) =>
          usage.date.toLowerCase().includes(lowercasedSearch) ||
          usage.bookingId.toLowerCase().includes(lowercasedSearch) ||
          usage.status.toLowerCase().includes(lowercasedSearch) ||
          usage.amount.toLowerCase().includes(lowercasedSearch)
      );
    }

    setFilteredUsages(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, codeUsages]);

  const totalCompleted = codeUsages.filter(
    (usage) => usage.status === "completed"
  ).length;
  const totalPending = codeUsages.filter(
    (usage) => usage.status === "pending"
  ).length;
  const totalCancelled = codeUsages.filter(
    (usage) => usage.status === "cancelled"
  ).length;

  const totalEarnings = codeUsages
    .filter((usage) => usage.status === "completed")
    .reduce((sum, usage) => sum + parseFloat(usage.amount.replace("£", "")), 0);

  const totalPages = Math.ceil(filteredUsages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsages = filteredUsages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const tableEl = document.getElementById("usage-table");
      if (tableEl) tableEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderPageLinks = () => {
    const links = [];

    links.push(
      <PaginationItem key="first">
        <PaginationLink
          onClick={() => goToPage(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (currentPage > 3) {
      links.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i <= totalPages - 1 && i >= 2) {
        links.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => goToPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    if (currentPage < totalPages - 2 && totalPages > 3) {
      links.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      links.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => goToPage(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return links;
  };

  const handleExport = () => {
    console.log("Exporting data...");
    alert("This would download a CSV of all usage data");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-8">
          <div className="mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="mb-4"
            >
              <ArrowLeft size={16} className="mr-2" /> Back
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-bwc-charcoal">
                {influencerName
                  ? decodeURIComponent(influencerName)
                  : "Influencer"}
                's Code Usage
              </h1>
              <p className="mt-2 text-bwc-charcoal-light">
                Complete history of all code usage and commissions
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="flex items-center gap-1 mt-4 md:mt-0"
            >
              <Download size={14} className="mr-1" /> Export CSV
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={18} className="text-green-600" />
                  <CardTitle className="text-sm font-medium">
                    Completed
                  </CardTitle>
                </div>
                <p className="text-3xl font-bold mt-2">{totalCompleted}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Clock size={18} className="text-amber-600" />
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                </div>
                <p className="text-3xl font-bold mt-2">{totalPending}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <AlertCircle size={18} className="text-red-600" />
                  <CardTitle className="text-sm font-medium">
                    Cancelled
                  </CardTitle>
                </div>
                <p className="text-3xl font-bold mt-2">{totalCancelled}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="bg-muted/30 p-4 rounded-md">
                  <p className="text-sm text-muted-foreground flex items-center">
                    <PoundSterling size={14} className="mr-1 text-bwc-gold" />{" "}
                    Total Earned
                  </p>
                  <p className="text-2xl font-semibold">
                    £{totalEarnings.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Code Usage Records</CardTitle>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search records..."
                      className="pl-8 w-full md:w-[200px] text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={statusFilter === null ? "default" : "outline"}
                      onClick={() => setStatusFilter(null)}
                      className="text-xs"
                    >
                      All
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        statusFilter === "completed" ? "default" : "outline"
                      }
                      onClick={() => setStatusFilter("completed")}
                      className="text-xs"
                    >
                      Completed
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        statusFilter === "pending" ? "default" : "outline"
                      }
                      onClick={() => setStatusFilter("pending")}
                      className="text-xs"
                    >
                      Pending
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        statusFilter === "cancelled" ? "default" : "outline"
                      }
                      onClick={() => setStatusFilter("cancelled")}
                      className="text-xs"
                    >
                      Cancelled
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <div className="py-8 text-center text-muted-foreground">
                  Loading records...
                </div>
              ) : (
                <>
                  <div className="text-sm text-muted-foreground mb-4">
                    Showing {filteredUsages.length > 0 ? startIndex + 1 : 0} -{" "}
                    {Math.min(
                      startIndex + ITEMS_PER_PAGE,
                      filteredUsages.length
                    )}{" "}
                    of {filteredUsages.length} records
                  </div>

                  <ScrollArea
                    className="h-[500px] rounded-md border"
                    id="usage-table"
                  >
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Booking ID</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedUsages.length > 0 ? (
                          paginatedUsages.map((usage) => (
                            <TableRow key={usage.id}>
                              <TableCell className="font-medium">
                                {usage.date}
                              </TableCell>
                              <TableCell>{usage.bookingId}</TableCell>
                              <TableCell>
                                <StatusBadge status={usage.status} />
                              </TableCell>
                              <TableCell className="text-right">
                                {usage.amount}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center py-6 text-muted-foreground"
                            >
                              No matching records found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>

                  {totalPages > 1 && (
                    <Pagination className="mt-6">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => goToPage(currentPage - 1)}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>

                        {renderPageLinks()}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => goToPage(currentPage + 1)}
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default InfluencerCodeDetails;
