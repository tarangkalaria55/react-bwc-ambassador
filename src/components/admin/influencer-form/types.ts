import * as z from "zod";

export const COMMISSION_TIERS = {
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

export type CommissionTier = keyof typeof COMMISSION_TIERS | "CUSTOM";

export const influencerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  commissionTier: z.enum([
    "TIN",
    "BRONZE",
    "SILVER",
    "GOLD",
    "PLATINUM",
    "DIAMOND",
    "CUSTOM",
  ]),
  customCommissionRate: z.number().optional(),
  customDiscountRate: z.number().optional(),
  sendWelcomeEmail: z.boolean().default(true),
});

export type InfluencerFormValues = z.infer<typeof influencerFormSchema>;

export type DialogMode = "add" | "edit" | "view";
