import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import PageTransition from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Edit,
  Save,
  Plus,
  History,
  CalendarIcon,
  RefreshCw,
  MoreVertical,
  Play,
  Pause,
  Trash2,
  ArrowUpDown,
  Pencil,
  Instagram,
  Youtube,
} from "lucide-react";
import { TiktokIcon } from "@/components/ui/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InfluencerFormFields from "@/components/admin/influencer-form/InfluencerFormFields";
import {
  InfluencerFormValues,
  influencerFormSchema,
} from "@/components/admin/influencer-form/types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormReturn } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  mockInfluencers as importedMockInfluencers,
  Influencer as ImportedInfluencer,
} from "@/data/mockInfluencerData";
import { Badge } from "@/components/ui/badge";

// Mock data for referral codes
interface ReferralCode {
  id: string;
  code: string;
  status: "active" | "expired" | "paused";
  startDate: string;
  expiryDate: string;
  usageCount: number;
  completedBookings: number;
  totalEarnings: number;
}

const mockReferralCodes: ReferralCode[] = [
  {
    id: "1",
    code: "SARAH10",
    status: "expired",
    startDate: "2023-01-01",
    expiryDate: "2023-12-31",
    usageCount: 150,
    completedBookings: 120,
    totalEarnings: 3600,
  },
  {
    id: "2",
    code: "SARAH15",
    status: "active",
    startDate: "2024-01-01",
    expiryDate: "2024-12-31",
    usageCount: 45,
    completedBookings: 30,
    totalEarnings: 900,
  },
];

const generateReferralCode = (name: string) => {
  // Remove spaces and special characters, convert to uppercase
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

  // Generate a random 4-character string
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();

  // Combine name (up to 4 chars) with random string
  const code = `${cleanName.slice(0, 4)}${randomStr}`;

  return code;
};

// Update the InfluencerFormFieldsProps interface
interface InfluencerFormFieldsProps {
  form: UseFormReturn<InfluencerFormValues>;
  isViewMode: boolean;
  onSubmit: (data: InfluencerFormValues) => void;
}

interface Influencer {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  instagram: string;
  tiktok: string;
  status: "active" | "paused" | "deleted";
  commissionTier: string;
  ambassadorCommission: number;
  customerDiscount: number;
  referrals: number;
  codeUsage: number;
  completedTreatments: number;
  earnings: number;
}

interface SortConfig {
  field: keyof ReferralCode | null;
  direction: "asc" | "desc";
}

const InfluencerDetails = () => {
  const navigate = useNavigate();
  const { influencerId } = useParams();

  // Find the influencer data first
  const influencer = importedMockInfluencers.find(
    (inf) => inf.id === influencerId
  );

  // Component state
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [influencerStatus, setInfluencerStatus] = useState<
    "active" | "inactive"
  >(influencer?.status ?? "active");
  const [referralCodes, setReferralCodes] = useState<ReferralCode[]>([
    {
      id: "1",
      code: "MIKE10",
      status: "active",
      startDate: new Date().toISOString(),
      expiryDate: new Date(
        new Date().setMonth(new Date().getMonth() + 3)
      ).toISOString(),
      usageCount: 24,
      completedBookings: 14,
      totalEarnings: 540,
    },
    {
      id: "2",
      code: "MIKE15",
      status: "expired",
      startDate: new Date(
        new Date().setMonth(new Date().getMonth() - 6)
      ).toISOString(),
      expiryDate: new Date(
        new Date().setMonth(new Date().getMonth() - 3)
      ).toISOString(),
      usageCount: 156,
      completedBookings: 132,
      totalEarnings: 3960,
    },
    {
      id: "3",
      code: "MIKE20",
      status: "expired",
      startDate: new Date(
        new Date().setMonth(new Date().getMonth() - 12)
      ).toISOString(),
      expiryDate: new Date(
        new Date().setMonth(new Date().getMonth() - 9)
      ).toISOString(),
      usageCount: 89,
      completedBookings: 76,
      totalEarnings: 2280,
    },
  ]);

  const hasActiveOrPausedCode = referralCodes.some(
    (code) => code.status === "active" || code.status === "paused"
  );

  const form = useForm<InfluencerFormValues>({
    resolver: zodResolver(influencerFormSchema),
    defaultValues: {
      name: influencer?.name || "",
      email: influencer?.email || "",
      instagram: influencer?.instagram || "",
      tiktok: influencer?.tiktok || "",
      phone: influencer?.phone || "",
      bio: influencer?.bio || "",
      commissionTier: "TIN",
      customCommissionRate: undefined,
      customDiscountRate: undefined,
      sendWelcomeEmail: true,
    },
  });

  const handleSubmit = (data: InfluencerFormValues) => {
    console.log("Updated influencer data:", data);
    toast.success("Influencer updated successfully", {
      description: `${data.name}'s information has been updated.`,
    });
    setIsEditing(false);
  };

  const handleBack = () => {
    if (isEditing) {
      if (window.confirm("Are you sure you want to discard your changes?")) {
        setIsEditing(false);
        navigate("/all-influencers");
      }
    } else {
      navigate("/all-influencers");
    }
  };

  const handleGenerateCode = () => {
    if (!influencer) return;
    const generatedCode = generateReferralCode(influencer.name);
    setNewCode(generatedCode);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setExpiryDate(date);
  };

  const handleAddCode = () => {
    if (!newCode || !expiryDate) {
      toast.error("Please fill in all fields");
      return;
    }

    if (hasActiveOrPausedCode) {
      toast.error("This influencer already has an active or paused code", {
        description: "Please end the existing code before adding a new one.",
      });
      return;
    }

    // Add the new code to the mock data
    const newReferralCode: ReferralCode = {
      id: Date.now().toString(),
      code: newCode,
      status: "active",
      startDate: new Date().toISOString(),
      expiryDate: expiryDate.toISOString(),
      usageCount: 0,
      completedBookings: 0,
      totalEarnings: 0,
    };

    setReferralCodes([newReferralCode, ...referralCodes]);
    console.log("Adding new code:", newReferralCode);
    toast.success("Referral code added successfully");
    setNewCode("");
    setExpiryDate(undefined);
  };

  const handleDeactivateCode = (codeId: string, action: "pause" | "end") => {
    // If trying to pause but another code is already paused, show error
    if (
      action === "pause" &&
      referralCodes.some((code) => code.status === "paused")
    ) {
      toast.error("Cannot pause this code", {
        description:
          "Another code is already paused. Please end the paused code first.",
      });
      return;
    }

    setReferralCodes(
      referralCodes.map((code) =>
        code.id === codeId
          ? {
              ...code,
              status: action === "pause" ? "paused" : "expired",
              expiryDate:
                action === "end" ? new Date().toISOString() : code.expiryDate,
            }
          : code
      )
    );
    toast.success(
      `Code ${action === "pause" ? "paused" : "ended"} successfully`
    );
  };

  const handleActivateCode = (codeId: string) => {
    // Check if there's already an active code
    if (referralCodes.some((code) => code.status === "active")) {
      toast.error("Cannot activate this code", {
        description:
          "Another code is already active. Please end the active code first.",
      });
      return;
    }

    setReferralCodes(
      referralCodes.map((code) =>
        code.id === codeId ? { ...code, status: "active" } : code
      )
    );
    toast.success("Code activated successfully");
  };

  const handleViewCodeDetails = (code: ReferralCode) => {
    // Navigate to the code details page
    navigate(`/code-details/${encodeURIComponent(code.code)}`);
  };

  const handleRenewCode = (codeId: string) => {
    // Implement the logic to renew the code
    console.log("Renewing code:", codeId);
    toast.success("Code renewal logic not implemented yet");
  };

  // Status management functions
  const handleStatusChange = (newStatus: "active" | "inactive") => {
    if (!influencer) return;

    const statusMessages = {
      active: "Influencer activated successfully",
      inactive: "Influencer paused successfully",
    };

    setInfluencerStatus(newStatus);
    toast.success(statusMessages[newStatus]);

    if (newStatus === "inactive") {
      // In a real app, you would make an API call here
      // For now, we'll just navigate away
      navigate("/all-influencers");
    }
  };

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: null,
    direction: "asc",
  });

  const handleSort = (field: keyof ReferralCode) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedReferralCodes = [...referralCodes].sort((a, b) => {
    if (!sortConfig.field) return 0;

    let aValue = a[sortConfig.field];
    let bValue = b[sortConfig.field];

    // Handle date fields
    if (sortConfig.field === "startDate" || sortConfig.field === "expiryDate") {
      return sortConfig.direction === "asc"
        ? new Date(aValue).getTime() - new Date(bValue).getTime()
        : new Date(bValue).getTime() - new Date(aValue).getTime();
    }

    // Handle string fields
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // Handle number fields
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  if (!influencer) {
    return (
      <PageTransition>
        <AdminLayout>
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" size="sm" onClick={handleBack}>
                <ArrowLeft size={16} className="mr-2" /> Back
              </Button>
            </div>
            <p>Influencer not found.</p>
          </div>
        </AdminLayout>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                  {influencer.name}
                  <Badge
                    variant={
                      influencer.status === "active" ? "default" : "destructive"
                    }
                  >
                    {influencer.status}
                  </Badge>
                </h1>
                <p className="text-sm text-muted-foreground">
                  View and manage influencer details
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/edit-influencer/${influencer.id}`)}
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            <Card className="p-2">
              <div className="text-xs font-medium">Total Referrals</div>
              <div className="text-lg font-bold">{influencer.referrals}</div>
            </Card>
            <Card className="p-2">
              <div className="text-xs font-medium">Code Usage</div>
              <div className="text-lg font-bold">
                {influencer.codeUsage || 0}
              </div>
            </Card>
            <Card className="p-2">
              <div className="text-xs font-medium">Completed Treatments</div>
              <div className="text-lg font-bold">
                {influencer.completedTreatments || 0}
              </div>
            </Card>
            <Card className="p-2">
              <div className="text-xs font-medium">Total Earnings</div>
              <div className="text-lg font-bold">{influencer.earnings}</div>
            </Card>
          </div>

          <Tabs defaultValue="details" className="space-y-2">
            <TabsList className="mb-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="codes">Referral Codes</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardContent className="p-3">
                  <Form {...form}>
                    <form className="space-y-3">
                      <InfluencerFormFields
                        form={form}
                        isViewMode={!isEditing}
                        onSubmit={handleSubmit}
                      />
                      {influencer.instagram && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Instagram size={16} />
                          <a
                            href={`https://instagram.com/${influencer.instagram.replace(
                              "@",
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-bwc-gold"
                          >
                            {influencer.instagram}
                          </a>
                        </div>
                      )}
                      {influencer.tiktok && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <TiktokIcon className="w-4 h-4" />
                          <a
                            href={`https://tiktok.com/${influencer.tiktok}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-bwc-gold"
                          >
                            {influencer.tiktok}
                          </a>
                        </div>
                      )}
                      {influencer.youtube && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Youtube size={16} />
                          <a
                            href={`https://youtube.com/${influencer.youtube}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-bwc-gold"
                          >
                            {influencer.youtube}
                          </a>
                        </div>
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="codes">
              <div className="space-y-3">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">
                        Add New Referral Code
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="code" className="text-xs mb-1">
                          Referral Code
                        </Label>
                        <div className="flex gap-1">
                          <Input
                            id="code"
                            value={newCode}
                            onChange={(e) => setNewCode(e.target.value)}
                            placeholder="Enter or generate a code"
                            className="flex-1 h-8 text-sm"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={handleGenerateCode}
                            className="h-8 w-8"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs mb-1">Expiry Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full h-8 justify-start text-left font-normal text-sm",
                                !expiryDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {expiryDate ? (
                                format(expiryDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={expiryDate}
                              onSelect={handleDateSelect}
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <Button
                      onClick={handleAddCode}
                      className="w-full mt-2 h-8 text-sm bg-bwc-gold hover:bg-bwc-gold/90 text-white"
                      disabled={hasActiveOrPausedCode}
                    >
                      Add Code
                    </Button>
                    {hasActiveOrPausedCode && (
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        This influencer already has an active or paused code.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-sm mb-2">Code History</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead
                              className="py-2 text-xs cursor-pointer"
                              onClick={() => handleSort("code")}
                            >
                              Code{" "}
                              <ArrowUpDown className="inline h-3 w-3 ml-1" />
                            </TableHead>
                            <TableHead
                              className="py-2 text-xs cursor-pointer"
                              onClick={() => handleSort("status")}
                            >
                              Status{" "}
                              <ArrowUpDown className="inline h-3 w-3 ml-1" />
                            </TableHead>
                            <TableHead
                              className="py-2 text-xs cursor-pointer"
                              onClick={() => handleSort("startDate")}
                            >
                              Start Date{" "}
                              <ArrowUpDown className="inline h-3 w-3 ml-1" />
                            </TableHead>
                            <TableHead
                              className="py-2 text-xs cursor-pointer"
                              onClick={() => handleSort("expiryDate")}
                            >
                              Expiry Date{" "}
                              <ArrowUpDown className="inline h-3 w-3 ml-1" />
                            </TableHead>
                            <TableHead
                              className="py-2 text-xs cursor-pointer"
                              onClick={() => handleSort("usageCount")}
                            >
                              Usage{" "}
                              <ArrowUpDown className="inline h-3 w-3 ml-1" />
                            </TableHead>
                            <TableHead
                              className="py-2 text-xs cursor-pointer"
                              onClick={() => handleSort("completedBookings")}
                            >
                              Completed{" "}
                              <ArrowUpDown className="inline h-3 w-3 ml-1" />
                            </TableHead>
                            <TableHead
                              className="py-2 text-xs cursor-pointer"
                              onClick={() => handleSort("totalEarnings")}
                            >
                              Earnings{" "}
                              <ArrowUpDown className="inline h-3 w-3 ml-1" />
                            </TableHead>
                            <TableHead className="py-2 text-xs">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedReferralCodes.map((code) => (
                            <TableRow key={code.id} className="text-sm">
                              <TableCell className="py-1.5">
                                <Button
                                  variant="link"
                                  className="p-0 h-auto font-medium text-sm"
                                  onClick={() => handleViewCodeDetails(code)}
                                >
                                  {code.code}
                                </Button>
                              </TableCell>
                              <TableCell className="py-1.5">
                                <span
                                  className={cn(
                                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                                    code.status === "active"
                                      ? "bg-green-100 text-green-800"
                                      : code.status === "paused"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                  )}
                                >
                                  {code.status}
                                </span>
                              </TableCell>
                              <TableCell className="py-1.5 text-sm">
                                {format(new Date(code.startDate), "PP")}
                              </TableCell>
                              <TableCell className="py-1.5 text-sm">
                                {format(new Date(code.expiryDate), "PP")}
                              </TableCell>
                              <TableCell className="py-1.5 text-sm">
                                {code.usageCount}
                              </TableCell>
                              <TableCell className="py-1.5 text-sm">
                                {code.completedBookings}
                              </TableCell>
                              <TableCell className="py-1.5 text-sm">
                                £{code.totalEarnings}
                              </TableCell>
                              <TableCell className="py-1.5">
                                <div className="flex items-center gap-1">
                                  {code.status === "active" && (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleDeactivateCode(code.id, "pause")
                                        }
                                        className="text-yellow-600 hover:text-yellow-700 h-6 px-2 text-xs"
                                      >
                                        Pause
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleDeactivateCode(code.id, "end")
                                        }
                                        className="text-red-600 hover:text-red-700 h-6 px-2 text-xs"
                                      >
                                        End
                                      </Button>
                                    </>
                                  )}
                                  {code.status === "paused" &&
                                    new Date(code.expiryDate) > new Date() && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleActivateCode(code.id)
                                        }
                                        className="text-green-600 hover:text-green-700 h-6 px-2 text-xs"
                                      >
                                        Activate
                                      </Button>
                                    )}
                                  {code.status === "expired" &&
                                    new Date(code.expiryDate) > new Date() && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRenewCode(code.id)}
                                        className="text-green-600 hover:text-green-700 h-6 px-2 text-xs"
                                      >
                                        Renew
                                      </Button>
                                    )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Influencer</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this influencer? This action
                  cannot be undone. All associated referral codes will be
                  deactivated.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleStatusChange("inactive")}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default InfluencerDetails;
