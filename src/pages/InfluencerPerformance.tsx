import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import InfluencerCodeDetailsDialog, {
  CodeUsage,
} from "@/components/admin/InfluencerCodeDetailsDialog";
import { useIsMobile } from "@/hooks/use-mobile";

type InfluencerMetric = {
  id: string;
  name: string;
  codeUsage: number;
  completedTreatments: number;
  conversionRate: number;
};

const generateInfluencerMetricsData = (): InfluencerMetric[] => {
  const baseData = [
    {
      id: "1",
      name: "Emma R.",
      codeUsage: 36,
      completedTreatments: 29,
      conversionRate: 81,
    },
    {
      id: "2",
      name: "James W.",
      codeUsage: 32,
      completedTreatments: 25,
      conversionRate: 78,
    },
    {
      id: "3",
      name: "Sophie A.",
      codeUsage: 28,
      completedTreatments: 20,
      conversionRate: 71,
    },
    {
      id: "4",
      name: "Michael B.",
      codeUsage: 24,
      completedTreatments: 14,
      conversionRate: 58,
    },
    {
      id: "5",
      name: "Olivia D.",
      codeUsage: 18,
      completedTreatments: 12,
      conversionRate: 67,
    },
    {
      id: "6",
      name: "David J.",
      codeUsage: 16,
      completedTreatments: 9,
      conversionRate: 56,
    },
    {
      id: "7",
      name: "Laura K.",
      codeUsage: 14,
      completedTreatments: 8,
      conversionRate: 57,
    },
    {
      id: "8",
      name: "Thomas L.",
      codeUsage: 12,
      completedTreatments: 7,
      conversionRate: 58,
    },
    {
      id: "9",
      name: "Natalie M.",
      codeUsage: 10,
      completedTreatments: 5,
      conversionRate: 50,
    },
    {
      id: "10",
      name: "Robert N.",
      codeUsage: 8,
      completedTreatments: 3,
      conversionRate: 38,
    },
    {
      id: "11",
      name: "Victoria O.",
      codeUsage: 6,
      completedTreatments: 2,
      conversionRate: 33,
    },
    {
      id: "12",
      name: "William P.",
      codeUsage: 4,
      completedTreatments: 1,
      conversionRate: 25,
    },
  ];

  return baseData;
};

const mockCodeUsageData: Record<string, CodeUsage[]> = {
  "1": [
    {
      id: "101",
      date: "2023-07-15",
      bookingId: "135790",
      status: "completed",
      amount: "£30",
    },
    {
      id: "102",
      date: "2023-07-18",
      bookingId: "135791",
      status: "completed",
      amount: "£30",
    },
    {
      id: "103",
      date: "2023-07-22",
      bookingId: "135792",
      status: "completed",
      amount: "£30",
    },
    {
      id: "104",
      date: "2023-07-25",
      bookingId: "135793",
      status: "pending",
      amount: "£30",
    },
    {
      id: "105",
      date: "2023-07-28",
      bookingId: "135794",
      status: "cancelled",
      amount: "£0",
    },
  ],
  "2": [
    {
      id: "201",
      date: "2023-07-10",
      bookingId: "246810",
      status: "completed",
      amount: "£30",
    },
    {
      id: "202",
      date: "2023-07-14",
      bookingId: "246811",
      status: "completed",
      amount: "£30",
    },
    {
      id: "203",
      date: "2023-07-20",
      bookingId: "246812",
      status: "pending",
      amount: "£30",
    },
    {
      id: "204",
      date: "2023-07-27",
      bookingId: "246813",
      status: "cancelled",
      amount: "£0",
    },
  ],
  "3": [
    {
      id: "301",
      date: "2023-07-08",
      bookingId: "357901",
      status: "completed",
      amount: "£30",
    },
    {
      id: "302",
      date: "2023-07-12",
      bookingId: "357902",
      status: "completed",
      amount: "£30",
    },
    {
      id: "303",
      date: "2023-07-19",
      bookingId: "357903",
      status: "cancelled",
      amount: "£0",
    },
  ],
  "4": [
    {
      id: "401",
      date: "2023-07-05",
      bookingId: "468012",
      status: "completed",
      amount: "£30",
    },
    {
      id: "402",
      date: "2023-07-21",
      bookingId: "468013",
      status: "pending",
      amount: "£30",
    },
  ],
  "5": [
    {
      id: "501",
      date: "2023-07-02",
      bookingId: "579123",
      status: "completed",
      amount: "£30",
    },
    {
      id: "502",
      date: "2023-07-16",
      bookingId: "579124",
      status: "completed",
      amount: "£30",
    },
  ],
  "6": [
    {
      id: "601",
      date: "2023-07-01",
      bookingId: "680234",
      status: "completed",
      amount: "£30",
    },
    {
      id: "602",
      date: "2023-07-23",
      bookingId: "680235",
      status: "pending",
      amount: "£30",
    },
  ],
  "7": [
    {
      id: "701",
      date: "2023-07-11",
      bookingId: "791345",
      status: "completed",
      amount: "£30",
    },
  ],
  "8": [
    {
      id: "801",
      date: "2023-07-09",
      bookingId: "813456",
      status: "completed",
      amount: "£30",
    },
  ],
  "9": [
    {
      id: "901",
      date: "2023-07-13",
      bookingId: "924567",
      status: "cancelled",
      amount: "£0",
    },
  ],
  "10": [
    {
      id: "1001",
      date: "2023-07-24",
      bookingId: "135678",
      status: "pending",
      amount: "£30",
    },
  ],
  "11": [
    {
      id: "1101",
      date: "2023-07-17",
      bookingId: "246789",
      status: "completed",
      amount: "£30",
    },
  ],
  "12": [
    {
      id: "1201",
      date: "2023-07-03",
      bookingId: "357890",
      status: "cancelled",
      amount: "£0",
    },
  ],
};

const InfluencerPerformance = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] =
    useState<keyof InfluencerMetric>("codeUsage");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const allData = generateInfluencerMetricsData();
  const itemsPerPage = 5;

  const filteredData = allData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: keyof InfluencerMetric) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getSortIndicator = (field: keyof InfluencerMetric) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  const handleInfluencerClick = (influencer: InfluencerMetric) => {
    setSelectedInfluencer({ id: influencer.id, name: influencer.name });
    setDetailsDialogOpen(true);
  };

  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false);
    setSelectedInfluencer(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-display font-bold text-bwc-charcoal">
                  Influencer Performance
                </h1>
                <p className="mt-2 text-bwc-charcoal-light">
                  Detailed metrics on all influencers in your program
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-4 md:mt-0"
                onClick={() => navigate("/admin")}
              >
                Back to Dashboard
              </Button>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <CardTitle>Influencer Code Performance</CardTitle>
                  <div className="flex w-full md:w-auto gap-2">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bwc-charcoal-light h-4 w-4" />
                      <Input
                        placeholder="Search influencers..."
                        className="pl-10 bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="bg-bwc-cream border-bwc-gold/20 hover:bg-bwc-gold-light/50"
                    >
                      <Filter size={16} className="mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Influencer</TableHead>
                      <TableHead
                        className="text-right cursor-pointer hover:text-bwc-gold"
                        onClick={() => handleSort("codeUsage")}
                      >
                        Code Usage{getSortIndicator("codeUsage")}
                      </TableHead>
                      <TableHead
                        className="text-right cursor-pointer hover:text-bwc-gold"
                        onClick={() => handleSort("completedTreatments")}
                      >
                        Completed Treatments
                        {getSortIndicator("completedTreatments")}
                      </TableHead>
                      <TableHead
                        className="text-right cursor-pointer hover:text-bwc-gold"
                        onClick={() => handleSort("conversionRate")}
                      >
                        Conversion Rate{getSortIndicator("conversionRate")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((influencer) => (
                      <TableRow key={influencer.id}>
                        <TableCell
                          className={`font-medium cursor-pointer hover:text-bwc-gold hover:underline`}
                          onClick={() => handleInfluencerClick(influencer)}
                        >
                          {influencer.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {influencer.codeUsage}
                        </TableCell>
                        <TableCell className="text-right">
                          {influencer.completedTreatments}
                        </TableCell>
                        <TableCell className="text-right">
                          {influencer.conversionRate}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredData.length === 0 && (
                  <div className="text-center py-8 text-bwc-charcoal-light">
                    No influencers found matching your search.
                  </div>
                )}

                {filteredData.length > 0 && (
                  <div className="mt-6">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              currentPage > 1 &&
                              handlePageChange(currentPage - 1)
                            }
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={currentPage === page}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              currentPage < totalPages &&
                              handlePageChange(currentPage + 1)
                            }
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Total Influencers
                    </p>
                    <p className="text-2xl font-semibold">
                      {filteredData.length}
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Average Conversion Rate
                    </p>
                    <p className="text-2xl font-semibold">
                      {filteredData.length > 0
                        ? Math.round(
                            filteredData.reduce(
                              (sum, item) => sum + item.conversionRate,
                              0
                            ) / filteredData.length
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {selectedInfluencer && (
          <InfluencerCodeDetailsDialog
            isOpen={detailsDialogOpen}
            onClose={handleCloseDetailsDialog}
            influencerName={selectedInfluencer.name}
            codeUsages={mockCodeUsageData[selectedInfluencer.id] || []}
          />
        )}

        <Footer />
      </div>
    </PageTransition>
  );
};

export default InfluencerPerformance;
