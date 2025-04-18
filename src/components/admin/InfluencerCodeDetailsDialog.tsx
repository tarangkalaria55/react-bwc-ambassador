import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  PoundSterling,
  X,
  ExternalLink,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define the types for the code usage data
export interface CodeUsage {
  id: string;
  date: string;
  bookingId: string;
  status: "completed" | "pending" | "cancelled";
  amount: string;
  customer?: string; // Kept as optional for backward compatibility
}

interface InfluencerCodeDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  influencerName: string;
  codeUsages: CodeUsage[];
}

// Helper component for showing status with appropriate icon
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

const ITEMS_PER_PAGE = 5;

const InfluencerCodeDetailsDialog: React.FC<
  InfluencerCodeDetailsDialogProps
> = ({ isOpen, onClose, influencerName, codeUsages }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate summary metrics
  const totalCompleted = codeUsages.filter(
    (usage) => usage.status === "completed"
  ).length;
  const totalPending = codeUsages.filter(
    (usage) => usage.status === "pending"
  ).length;
  const totalCancelled = codeUsages.filter(
    (usage) => usage.status === "cancelled"
  ).length;

  // Calculate total earnings (remove £ symbol and convert to number)
  const totalEarnings = codeUsages
    .filter((usage) => usage.status === "completed")
    .reduce((sum, usage) => sum + parseFloat(usage.amount.replace("£", "")), 0);

  // Pagination logic
  const totalPages = Math.ceil(codeUsages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsages = codeUsages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewAllClick = () => {
    // Navigate to the influencer detail page with the name as a parameter
    navigate(`/influencer-code-details/${encodeURIComponent(influencerName)}`);
    onClose();
  };

  // Generate page links
  const renderPageLinks = () => {
    const links = [];

    // First page
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

    // Show ellipsis if needed
    if (currentPage > 3) {
      links.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Pages around current
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

    // Show ellipsis if needed
    if (currentPage < totalPages - 2 && totalPages > 3) {
      links.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Last page if there are more than 1 pages
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {influencerName}'s Code Usage Details
          </DialogTitle>
          <DialogDescription>
            View all uses of this influencer's referral code and their status
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
          <div className="bg-muted/30 p-4 rounded-md">
            <p className="text-sm text-muted-foreground flex items-center">
              <CheckCircle2 size={14} className="mr-1 text-green-600" />{" "}
              Completed
            </p>
            <p className="text-2xl font-semibold">{totalCompleted}</p>
          </div>
          <div className="bg-muted/30 p-4 rounded-md">
            <p className="text-sm text-muted-foreground flex items-center">
              <Clock size={14} className="mr-1 text-amber-600" /> Pending
            </p>
            <p className="text-2xl font-semibold">{totalPending}</p>
          </div>
          <div className="bg-muted/30 p-4 rounded-md">
            <p className="text-sm text-muted-foreground flex items-center">
              <AlertCircle size={14} className="mr-1 text-red-600" /> Cancelled
            </p>
            <p className="text-2xl font-semibold">{totalCancelled}</p>
          </div>
          <div className="bg-muted/30 p-4 rounded-md">
            <p className="text-sm text-muted-foreground flex items-center">
              <PoundSterling size={14} className="mr-1 text-bwc-gold" /> Total
              Earned
            </p>
            <p className="text-2xl font-semibold">
              £{totalEarnings.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">
            Recent Usage ({codeUsages.length} records)
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAllClick}
            className="flex items-center gap-1 text-xs"
          >
            View All <ExternalLink size={12} />
          </Button>
        </div>

        <div className="overflow-x-auto">
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
                    <TableCell className="font-medium">{usage.date}</TableCell>
                    <TableCell>{usage.bookingId}</TableCell>
                    <TableCell>
                      <StatusBadge status={usage.status} />
                    </TableCell>
                    <TableCell className="text-right">{usage.amount}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No code usage data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => goToPage(currentPage - 1)}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
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

        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfluencerCodeDetailsDialog;
