import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Download } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";
import PageTransition from "@/components/ui/PageTransition";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data - replace with real data from your API
const mockInvoiceDetails = {
  id: "INV-2024-001",
  influencer: {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    referralCode: "SARAH10",
  },
  month: "March 2024",
  totalAmount: 2500.0,
  status: "paid",
  paidDate: "2024-03-15",
  bookings: [
    {
      id: "BK-89123",
      date: "2024-03-01",
      amount: 450.0,
      commission: 45.0,
    },
    {
      id: "BK-89124",
      date: "2024-03-03",
      amount: 350.0,
      commission: 35.0,
    },
    {
      id: "BK-89125",
      date: "2024-03-05",
      amount: 600.0,
      commission: 60.0,
    },
  ],
};

const InfluencerInvoiceDetails = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  // In a real app, fetch the invoice details using the invoiceId
  const invoice = mockInvoiceDetails;

  const totalCommission = invoice.bookings.reduce(
    (sum, booking) => sum + booking.commission,
    0
  );

  const totalBookingValue = invoice.bookings.reduce(
    (sum, booking) => sum + booking.amount,
    0
  );

  return (
    <PageTransition>
      <AdminLayout>
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin-invoices")}
                className="text-bwc-charcoal hover:text-bwc-gold"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Invoices
              </Button>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl font-bold text-bwc-charcoal mb-2">
                  Invoice
                </h1>
                <p className="text-2xl font-semibold text-bwc-charcoal mb-1">
                  {invoice.id}
                </p>
                <p className="text-xl text-bwc-charcoal-light">
                  {invoice.influencer.name} - {invoice.month}
                </p>
              </div>

              <Button className="bg-bwc-gold hover:bg-bwc-gold/90 text-white w-full md:w-auto md:self-end">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Commission</CardTitle>
                <CardDescription>For {invoice.month}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  £{totalCommission.toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Value</CardTitle>
                <CardDescription>Total value</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  £{totalBookingValue.toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bookings</CardTitle>
                <CardDescription>Number of bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{invoice.bookings.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Commission</CardTitle>
                <CardDescription>Per booking</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  £{(totalCommission / invoice.bookings.length).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-medium text-bwc-charcoal">
                Booking Breakdown
              </h2>
              <p className="text-sm text-bwc-charcoal-light mt-1">
                List of all bookings and commissions
              </p>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead className="text-right">Booking Value</TableHead>
                  <TableHead className="text-right">Commission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      {format(new Date(booking.date), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell className="text-right">
                      £{booking.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      £{booking.commission.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-gray-50 font-medium">
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right">
                    £{totalBookingValue.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    £{totalCommission.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default InfluencerInvoiceDetails;
