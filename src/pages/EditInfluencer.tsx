import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import PageTransition from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMMISSION_TIERS } from "@/components/admin/influencer-form/types";

const EditInfluencer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  // In a real app, fetch the influencer data based on the ID
  const [formData, setFormData] = useState({
    name: "Emma Rodriguez",
    email: "emma@example.com",
    phone: "+44 7700 900123",
    bio: "Specializes in bridal makeup content",
    instagram: "@emmarod",
    tiktok: "@emmatiktok",
    status: "active",
    commissionTier: "CUSTOM",
    ambassadorCommission: "10.0",
    customerDiscount: "10.0",
    welcomeEmail: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Reset custom rates when switching from CUSTOM to a predefined tier
      if (name === "commissionTier" && value !== "CUSTOM") {
        const tier = COMMISSION_TIERS[value as keyof typeof COMMISSION_TIERS];
        newData.ambassadorCommission = tier.ambassadorRate.toString();
        newData.customerDiscount = tier.customerRate.toString();
      }

      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, make an API call to update the influencer
    toast.success("Influencer details updated successfully");
    navigate(`/influencer/${id}`);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    // In a real app, make an API call to delete the influencer
    setTimeout(() => {
      toast.success("Influencer deleted successfully");
      navigate("/all-influencers");
    }, 1000);
  };

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
                  Edit: {formData.name}
                  <Badge
                    variant={
                      formData.status === "active" ? "default" : "destructive"
                    }
                  >
                    {formData.status}
                  </Badge>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Edit influencer details or delete account
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Update the influencer's basic details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>Update social media handles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram Handle</Label>
                      <Input
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tiktok">TikTok Handle</Label>
                      <Input
                        id="tiktok"
                        name="tiktok"
                        value={formData.tiktok}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Commission Settings</CardTitle>
                  <CardDescription>
                    Update commission and discount rates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleSelectChange("status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commissionTier">Commission Tier</Label>
                    <Select
                      value={formData.commissionTier}
                      onValueChange={(value) =>
                        handleSelectChange("commissionTier", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(COMMISSION_TIERS).map(([key, tier]) => (
                          <SelectItem key={key} value={key}>
                            {tier.name} ({tier.range[0].toLocaleString()}-
                            {tier.range[1] === Infinity
                              ? "∞"
                              : tier.range[1].toLocaleString()}
                            ) - {tier.commission}% Total
                          </SelectItem>
                        ))}
                        <SelectItem value="CUSTOM">Custom Rates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ambassadorCommission">
                        Ambassador Commission (%)
                      </Label>
                      <Input
                        id="ambassadorCommission"
                        name="ambassadorCommission"
                        type="number"
                        value={formData.ambassadorCommission}
                        onChange={handleInputChange}
                        disabled={formData.commissionTier !== "CUSTOM"}
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerDiscount">
                        Customer Discount (%)
                      </Label>
                      <Input
                        id="customerDiscount"
                        name="customerDiscount"
                        type="number"
                        value={formData.customerDiscount}
                        onChange={handleInputChange}
                        disabled={formData.commissionTier !== "CUSTOM"}
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default EditInfluencer;
