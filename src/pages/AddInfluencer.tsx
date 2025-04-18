import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import PageTransition from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  InfluencerFormValues,
  influencerFormSchema,
} from "@/components/admin/influencer-form/types";

const COMMISSION_TIERS = {
  TIN: {
    name: "Tin",
    range: [0, 1000],
    commission: 5,
    ambassadorRate: 3,
    customerRate: 2,
  },
  BRONZE: {
    name: "Bronze",
    range: [1000, 5000],
    commission: 7,
    ambassadorRate: 4,
    customerRate: 3,
  },
  SILVER: {
    name: "Silver",
    range: [5000, 10000],
    commission: 10,
    ambassadorRate: 6,
    customerRate: 4,
  },
  GOLD: {
    name: "Gold",
    range: [10000, 25000],
    commission: 12,
    ambassadorRate: 7,
    customerRate: 5,
  },
  PLATINUM: {
    name: "Platinum",
    range: [25000, 50000],
    commission: 15,
    ambassadorRate: 9,
    customerRate: 6,
  },
  DIAMOND: {
    name: "Diamond",
    range: [50000, Infinity],
    commission: 20,
    ambassadorRate: 12,
    customerRate: 8,
  },
} as const;

const AddInfluencerPage = () => {
  const navigate = useNavigate();

  const form = useForm<InfluencerFormValues>({
    resolver: zodResolver(influencerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      instagram: "",
      tiktok: "",
      phone: "",
      bio: "",
      commissionTier: "TIN",
      customCommissionRate: undefined,
      customDiscountRate: undefined,
      sendWelcomeEmail: true,
    },
  });

  const getCommissionRate = () => {
    const tier = form.watch("commissionTier");
    const customRate = form.watch("customCommissionRate");

    if (tier === "CUSTOM" && customRate !== undefined) {
      return customRate;
    }

    return COMMISSION_TIERS[tier as keyof typeof COMMISSION_TIERS]
      .ambassadorRate;
  };

  const getDiscountRate = () => {
    const tier = form.watch("commissionTier");
    const customRate = form.watch("customDiscountRate");

    if (tier === "CUSTOM" && customRate !== undefined) {
      return customRate;
    }

    return COMMISSION_TIERS[tier as keyof typeof COMMISSION_TIERS].customerRate;
  };

  const handleSubmit = (data: InfluencerFormValues) => {
    // Here you would typically make an API call to create the influencer
    console.log("New influencer data:", data);
    toast.success("Influencer added successfully", {
      description: `${data.name} has been added as a new influencer.`,
    });
    navigate("/all-influencers");
  };

  const handleBack = () => {
    if (form.formState.isDirty) {
      if (window.confirm("Are you sure you want to discard your changes?")) {
        navigate("/all-influencers");
      }
    } else {
      navigate("/all-influencers");
    }
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
              <ArrowLeft size={16} className="mr-2" /> Back to All Influencers
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-bwc-charcoal">
                Add New Influencer
              </h1>
              <p className="mt-2 text-bwc-charcoal-light">
                Create a new influencer profile
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter influencer name"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="Enter email address"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter phone number"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Enter influencer bio"
                                className="resize-none"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form className="space-y-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="instagram"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Instagram Handle</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="@username" />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="tiktok"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>TikTok Handle</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="@username" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Commission Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="commissionTier"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Commission Tier</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  try {
                                    field.onChange(value);
                                    if (value === "CUSTOM") {
                                      form.setValue("customCommissionRate", 0);
                                      form.setValue("customDiscountRate", 0);
                                    } else {
                                      form.setValue(
                                        "customCommissionRate",
                                        undefined
                                      );
                                      form.setValue(
                                        "customDiscountRate",
                                        undefined
                                      );
                                    }
                                  } catch (error) {
                                    console.error(
                                      "Error updating commission tier:",
                                      error
                                    );
                                  }
                                }}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a commission tier" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.entries(COMMISSION_TIERS).map(
                                    ([key, tier]) => (
                                      <SelectItem key={key} value={key}>
                                        {tier.name} (
                                        {tier.range[0].toLocaleString()}-
                                        {tier.range[1] === Infinity
                                          ? "∞"
                                          : tier.range[1].toLocaleString()}
                                        ) - {tier.commission}% Total
                                      </SelectItem>
                                    )
                                  )}
                                  <SelectItem value="CUSTOM">
                                    Custom Rates
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />

                        {form.watch("commissionTier") === "CUSTOM" && (
                          <>
                            <FormField
                              control={form.control}
                              name="customCommissionRate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Custom Commission Rate (%)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      min="0"
                                      max="100"
                                      step="0.1"
                                      placeholder="Enter custom commission rate"
                                      onChange={(e) => {
                                        const value =
                                          parseFloat(e.target.value) || 0;
                                        field.onChange(value);
                                      }}
                                      value={field.value || ""}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="customDiscountRate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Custom Discount Rate (%)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      min="0"
                                      max="100"
                                      step="0.1"
                                      placeholder="Enter custom discount rate"
                                      onChange={(e) => {
                                        const value =
                                          parseFloat(e.target.value) || 0;
                                        field.onChange(value);
                                      }}
                                      value={field.value || ""}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          <Card className="p-4">
                            <FormLabel className="mb-2 block">
                              Ambassador Commission
                            </FormLabel>
                            <div className="text-2xl font-semibold text-bwc-gold">
                              {getCommissionRate().toFixed(1)}%
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Commission rate for the ambassador
                            </p>
                          </Card>

                          <Card className="p-4">
                            <FormLabel className="mb-2 block">
                              Customer Discount
                            </FormLabel>
                            <div className="text-2xl font-semibold text-bwc-gold">
                              {getDiscountRate().toFixed(1)}%
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Discount rate for the customer
                            </p>
                          </Card>
                        </div>

                        <FormField
                          control={form.control}
                          name="sendWelcomeEmail"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Welcome Email
                                </FormLabel>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  onClick={form.handleSubmit(handleSubmit)}
                  className="bg-bwc-gold hover:bg-bwc-gold/90 text-white"
                >
                  Add Influencer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default AddInfluencerPage;
