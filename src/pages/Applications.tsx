import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import PageTransition from "@/components/ui/PageTransition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  mockApplications,
  AmbassadorApplication,
} from "@/data/mockApplicationsData";
import {
  CheckCircle,
  XCircle,
  Instagram,
  Phone,
  Mail,
  Youtube,
} from "lucide-react";
import { TiktokIcon } from "@/components/ui/icons";

export default function Applications() {
  const [applications, setApplications] =
    useState<AmbassadorApplication[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRejected, setShowRejected] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<AmbassadorApplication | null>(null);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = showRejected ? true : app.status !== "rejected";
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (application: AmbassadorApplication) => {
    setApplications(
      applications.map((app) =>
        app.id === application.id
          ? { ...app, status: "approved" as const }
          : app
      )
    );
    toast.success(`Application approved`, {
      description: `${application.name}'s application has been approved.`,
    });
  };

  const handleReject = (application: AmbassadorApplication) => {
    setApplications(
      applications.map((app) =>
        app.id === application.id
          ? { ...app, status: "rejected" as const }
          : app
      )
    );
    toast.success(`Application rejected`, {
      description: `${application.name}'s application has been rejected.`,
    });
  };

  const getStatusBadge = (status: AmbassadorApplication["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-8">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-bwc-charcoal">
                Ambassador Applications
              </h1>
              <p className="mt-2 text-bwc-charcoal-light">
                Review and manage ambassador applications
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Button
                variant="outline"
                onClick={() => setShowRejected(!showRejected)}
              >
                {showRejected ? "Hide Rejected" : "Show Rejected"}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Social Media</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="font-medium text-left hover:text-bwc-gold transition-colors"
                      >
                        {application.name}
                      </button>
                    </TableCell>
                    <TableCell>{application.email}</TableCell>
                    <TableCell>{application.phone}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {application.instagram && (
                          <a
                            href={`https://instagram.com/${application.instagram.replace(
                              "@",
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:text-pink-700"
                          >
                            <Instagram size={20} />
                          </a>
                        )}
                        {application.tiktok && (
                          <a
                            href={`https://tiktok.com/${application.tiktok}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black hover:text-gray-700"
                          >
                            <TiktokIcon className="w-5 h-5" />
                          </a>
                        )}
                        {application.youtube && (
                          <a
                            href={`https://youtube.com/${application.youtube}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Youtube size={20} />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>
                      {format(new Date(application.submittedAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {application.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleApprove(application)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle size={18} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleReject(application)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle size={18} />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredApplications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No applications found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <Dialog
            open={!!selectedApplication}
            onOpenChange={() => setSelectedApplication(null)}
          >
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>
                  Review the complete application information
                </DialogDescription>
              </DialogHeader>

              {selectedApplication && (
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">
                      Contact Information
                    </h3>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {selectedApplication.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail size={16} />
                        <a
                          href={`mailto:${selectedApplication.email}`}
                          className="hover:text-bwc-gold"
                        >
                          {selectedApplication.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone size={16} />
                        <span>{selectedApplication.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Social Media</h3>
                    <div className="grid gap-2">
                      {selectedApplication.instagram && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Instagram size={16} />
                          <a
                            href={`https://instagram.com/${selectedApplication.instagram.replace(
                              "@",
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-bwc-gold"
                          >
                            {selectedApplication.instagram}
                          </a>
                        </div>
                      )}
                      {selectedApplication.tiktok && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <TiktokIcon className="w-4 h-4" />
                          <a
                            href={`https://tiktok.com/${selectedApplication.tiktok}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-bwc-gold"
                          >
                            {selectedApplication.tiktok}
                          </a>
                        </div>
                      )}
                      {selectedApplication.youtube && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Youtube size={16} />
                          <a
                            href={`https://youtube.com/${selectedApplication.youtube}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-bwc-gold"
                          >
                            {selectedApplication.youtube}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Bio</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {selectedApplication.bio}
                    </p>
                  </div>

                  {/* Application Status */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">
                      Application Status
                    </h3>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(selectedApplication.status)}
                      <span className="text-muted-foreground">
                        Submitted on{" "}
                        {format(
                          new Date(selectedApplication.submittedAt),
                          "MMMM d, yyyy 'at' h:mm a"
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  {selectedApplication.status === "pending" && (
                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleReject(selectedApplication);
                          setSelectedApplication(null);
                        }}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => {
                          handleApprove(selectedApplication);
                          setSelectedApplication(null);
                        }}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </PageTransition>
  );
}
