import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import PageTransition from "@/components/ui/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";

interface ActiveCode {
  code: string;
  influencerName: string;
  influencerId: string;
  expiryDate: string;
  usageCount: number;
  revenue: number;
  status: "active" | "paused";
}

type SortField =
  | "code"
  | "influencerName"
  | "expiryDate"
  | "usageCount"
  | "revenue";
type SortOrder = "asc" | "desc";

const ITEMS_PER_PAGE = 10;

// Mock data - replace with real data from your API
const mockActiveCodes: ActiveCode[] = [
  {
    code: "EMMA10",
    influencerName: "Emma Rodriguez",
    influencerId: "1",
    expiryDate: new Date(
      new Date().setMonth(new Date().getMonth() + 5)
    ).toISOString(),
    usageCount: 45,
    revenue: 2250,
    status: "active",
  },
  {
    code: "JAMES15",
    influencerName: "James Wilson",
    influencerId: "2",
    expiryDate: new Date(
      new Date().setMonth(new Date().getMonth() + 3)
    ).toISOString(),
    usageCount: 32,
    revenue: 1600,
    status: "paused",
  },
  {
    code: "SOPHIE20",
    influencerName: "Sophie Anderson",
    influencerId: "3",
    expiryDate: new Date(
      new Date().setMonth(new Date().getMonth() + 4)
    ).toISOString(),
    usageCount: 28,
    revenue: 1400,
    status: "active",
  },
];

const ActiveCodes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "paused">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("code");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Filter codes by search term and status
  const filteredCodes = mockActiveCodes.filter((code) => {
    const matchesSearch =
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.influencerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || code.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort filtered codes
  const sortedCodes = [...filteredCodes].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortOrder === "asc"
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue);
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedCodes.length / ITEMS_PER_PAGE);
  const paginatedCodes = sortedCodes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const totalRevenue = filteredCodes.reduce(
    (sum, code) => sum + code.revenue,
    0
  );
  const totalUsage = filteredCodes.reduce(
    (sum, code) => sum + code.usageCount,
    0
  );
  const activeCount = filteredCodes.filter(
    (code) => code.status === "active"
  ).length;
  const pausedCount = filteredCodes.filter(
    (code) => code.status === "paused"
  ).length;

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-display font-bold text-bwc-charcoal">
              Active Referral Codes
            </h1>
            <p className="text-sm text-bwc-charcoal-light">
              View all active and paused referral codes across all influencers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{activeCount}</div>
                <div className="text-sm text-muted-foreground">
                  Active Codes
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{pausedCount}</div>
                <div className="text-sm text-muted-foreground">
                  Paused Codes
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{totalUsage}</div>
                <div className="text-sm text-muted-foreground">Total Uses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">£{totalRevenue}</div>
                <div className="text-sm text-muted-foreground">
                  Total Revenue
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search by code or influencer name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select
                    value={statusFilter}
                    onValueChange={(value: "all" | "active" | "paused") => {
                      setStatusFilter(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("code")}
                          className="p-0 h-auto font-medium hover:bg-transparent"
                        >
                          Code
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("influencerName")}
                          className="p-0 h-auto font-medium hover:bg-transparent"
                        >
                          Influencer
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("expiryDate")}
                          className="p-0 h-auto font-medium hover:bg-transparent"
                        >
                          Expiry Date
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("usageCount")}
                          className="p-0 h-auto font-medium hover:bg-transparent"
                        >
                          Usage
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("revenue")}
                          className="p-0 h-auto font-medium hover:bg-transparent"
                        >
                          Revenue
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCodes.map((code) => (
                      <TableRow key={code.code}>
                        <TableCell>
                          <Button
                            variant="link"
                            className="p-0 h-auto font-medium"
                            onClick={() =>
                              navigate(
                                `/code-details/${encodeURIComponent(code.code)}`
                              )
                            }
                          >
                            {code.code}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="link"
                            className="p-0 h-auto"
                            onClick={() =>
                              navigate(`/influencer/${code.influencerId}`)
                            }
                          >
                            {code.influencerName}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                              code.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {code.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(new Date(code.expiryDate), "PP")}
                        </TableCell>
                        <TableCell className="text-right">
                          {code.usageCount}
                        </TableCell>
                        <TableCell className="text-right">
                          £{code.revenue}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                    {Math.min(currentPage * ITEMS_PER_PAGE, sortedCodes.length)}{" "}
                    of {sortedCodes.length} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
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
                      onClick={() => setCurrentPage(currentPage + 1)}
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

export default ActiveCodes;
