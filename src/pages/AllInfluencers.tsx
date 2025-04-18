import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Plus,
  Edit,
  Eye,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { mockInfluencers, Influencer } from "@/data/mockInfluencerData";
import AddInfluencerDialog from "@/components/admin/AddInfluencerDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ITEMS_PER_PAGE = 10;

const AllInfluencers = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Influencer>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [influencers, setInfluencers] = useState<Influencer[]>(mockInfluencers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("add");
  const [selectedInfluencer, setSelectedInfluencer] =
    useState<Influencer | null>(null);

  const filteredInfluencers = influencers.filter(
    (influencer) =>
      influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedInfluencers = [...filteredInfluencers].sort((a, b) => {
    let fieldA: any = a[sortField];
    let fieldB: any = b[sortField];

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      if (fieldA.includes("£") || fieldA.includes("%")) {
        fieldA = fieldA.replace(/[£%]/g, "");
        const numA = Number(fieldA);
        if (!isNaN(numA)) fieldA = numA;
      }

      if (fieldB.includes("£") || fieldB.includes("%")) {
        fieldB = fieldB.replace(/[£%]/g, "");
        const numB = Number(fieldB);
        if (!isNaN(numB)) fieldB = numB;
      }
    }

    if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(filteredInfluencers.length / ITEMS_PER_PAGE);
  const paginatedInfluencers = filteredInfluencers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: keyof Influencer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleViewInfluencer = (influencerId: string) => {
    navigate(`/influencer/${influencerId}`);
  };

  const handleAddInfluencer = () => {
    navigate("/add-influencer");
  };

  const getSortIndicator = (field: keyof Influencer) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  const handleToggleStatus = (influencer: Influencer) => {
    const newStatus: "active" | "inactive" =
      influencer.status === "active" ? "inactive" : "active";

    const updatedInfluencers = influencers.map((inf) =>
      inf.id === influencer.id ? { ...inf, status: newStatus } : inf
    );

    setInfluencers(updatedInfluencers);
  };

  const openAddInfluencerDialog = () => {
    if (isMobile) {
      navigate("/add-influencer");
    } else {
      setDialogMode("add");
      setSelectedInfluencer(null);
      setDialogOpen(true);
    }
  };

  const openEditInfluencerDialog = (influencer: Influencer) => {
    if (isMobile) {
      navigate("/add-influencer", { state: { influencer } });
    } else {
      setDialogMode("edit");
      setSelectedInfluencer(influencer);
      setDialogOpen(true);
    }
  };

  const handleInfluencerSubmit = (data: any) => {
    if (dialogMode === "add") {
      const newInfluencer: Influencer = {
        id: `${influencers.length + 1}`,
        name: data.name,
        email: data.email,
        referrals: 0,
        earnings: "£0",
        status: "active",
        lastActive: "Just now",
        conversionRate: "0%",
        instagram: data.instagram,
        tiktok: data.tiktok,
        phone: data.phone,
        bio: data.bio,
        commissionRate: data.commissionRate,
        referralCode: data.referralCode,
      };

      setInfluencers([...influencers, newInfluencer]);
      toast.success("Influencer added successfully", {
        description: `${data.name} has been added to your program.`,
      });
    } else if (dialogMode === "edit" && selectedInfluencer) {
      const updatedInfluencers = influencers.map((inf) =>
        inf.id === selectedInfluencer.id
          ? {
              ...inf,
              name: data.name,
              email: data.email,
              instagram: data.instagram,
              tiktok: data.tiktok,
              phone: data.phone,
              bio: data.bio,
              commissionRate: data.commissionRate,
              referralCode: data.referralCode,
            }
          : inf
      );

      setInfluencers(updatedInfluencers);
      toast.success("Influencer updated successfully", {
        description: `${data.name}'s information has been updated.`,
      });
    }

    setDialogOpen(false);
  };

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-bwc-charcoal">
                All Influencers
              </h1>
              <p className="mt-2 text-bwc-charcoal-light">
                Manage and view all influencer profiles
              </p>
            </div>

            <Button
              onClick={handleAddInfluencer}
              className="bg-bwc-gold hover:bg-bwc-gold/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Influencer
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Influencer List</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search influencers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-[300px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Referrals</TableHead>
                    <TableHead>Earnings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInfluencers.map((influencer) => (
                    <TableRow key={influencer.id}>
                      <TableCell
                        className="font-medium cursor-pointer hover:text-bwc-gold hover:underline"
                        onClick={() => handleViewInfluencer(influencer.id)}
                      >
                        {influencer.name}
                      </TableCell>
                      <TableCell>{influencer.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            influencer.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {influencer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{influencer.referrals}</TableCell>
                      <TableCell>{influencer.earnings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredInfluencers.length
                  )}{" "}
                  of {filteredInfluencers.length} entries
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
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default AllInfluencers;
