import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InfluencerFormValues,
  COMMISSION_TIERS,
  CommissionTier,
  DialogMode,
} from "./types";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface InfluencerFormFieldsProps {
  form: UseFormReturn<InfluencerFormValues>;
  isViewMode?: boolean;
  mode?: DialogMode;
  onSubmit?: (data: InfluencerFormValues) => void;
}

const InfluencerFormFields: React.FC<InfluencerFormFieldsProps> = ({
  form,
  isViewMode = false,
  mode = "add",
  onSubmit,
}) => {
  const watchedCommissionTier = form.watch("commissionTier");
  const watchedCustomCommissionRate = form.watch("customCommissionRate");
  const watchedCustomDiscountRate = form.watch("customDiscountRate");

  const getCommissionRate = () => {
    const tier = watchedCommissionTier;
    if (tier === "CUSTOM") {
      return watchedCustomCommissionRate ?? 0;
    }
    if (!tier || !(tier in COMMISSION_TIERS)) {
      return 0;
    }
    return COMMISSION_TIERS[tier as keyof typeof COMMISSION_TIERS]
      .ambassadorRate;
  };

  const getDiscountRate = () => {
    const tier = watchedCommissionTier;
    if (tier === "CUSTOM") {
      return watchedCustomDiscountRate ?? 0;
    }
    if (!tier || !(tier in COMMISSION_TIERS)) {
      return 0;
    }
    return COMMISSION_TIERS[tier as keyof typeof COMMISSION_TIERS].customerRate;
  };

  return (
    <div className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {/* Basic Information Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isViewMode}
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
                    disabled={isViewMode}
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
                    disabled={isViewMode}
                    placeholder="Enter phone number"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isViewMode}
                    placeholder="Enter influencer bio"
                    className="resize-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Social Media Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Social Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram Handle</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isViewMode}
                    placeholder="@username"
                  />
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
                  <Input
                    {...field}
                    disabled={isViewMode}
                    placeholder="@username"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="youtube"
            render={({ field }) => (
              <FormItem>
                <FormLabel>YouTube Handle</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isViewMode}
                    placeholder="@username"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Commission Settings Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Commission Settings</h3>
        <form onSubmit={(e) => e.preventDefault()}>
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
                        form.setValue("customCommissionRate", undefined);
                        form.setValue("customDiscountRate", undefined);
                      }
                    } catch (error) {
                      console.error("Error updating commission tier:", error);
                    }
                  }}
                  value={field.value}
                  disabled={isViewMode}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a commission tier" />
                    </SelectTrigger>
                  </FormControl>
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
              </FormItem>
            )}
          />
        </form>

        {watchedCommissionTier === "CUSTOM" && !isViewMode && (
          <div className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="customCommissionRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Commission Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder="Enter custom commission rate"
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
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
                  <FormLabel>Custom Discount Rate (%)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder="Enter custom discount rate"
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        field.onChange(value);
                      }}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="p-4">
            <FormLabel className="mb-2 block">Ambassador Commission</FormLabel>
            <div className="text-2xl font-semibold text-bwc-gold">
              {getCommissionRate().toFixed(1)}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Commission rate for the ambassador
            </p>
          </Card>

          <Card className="p-4">
            <FormLabel className="mb-2 block">Customer Discount</FormLabel>
            <div className="text-2xl font-semibold text-bwc-gold">
              {getDiscountRate().toFixed(1)}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Discount rate for the customer
            </p>
          </Card>
        </div>
      </div>

      <FormField
        control={form.control}
        name="sendWelcomeEmail"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Welcome Email</FormLabel>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isViewMode}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {!isViewMode && onSubmit && (
        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
          {mode === "add" ? "Add Influencer" : "Save Changes"}
        </Button>
      )}
    </div>
  );
};

export default InfluencerFormFields;
