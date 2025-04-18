export type Influencer = {
  id: string;
  name: string;
  email: string;
  referrals: number;
  earnings: string;
  status: "active" | "inactive";
  lastActive: string;
  conversionRate: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  phone?: string;
  bio?: string;
  commissionRate: number;
  discountPercentage?: number;
  sendWelcomeEmail?: boolean;
  referralCode?: string;
  codeUsage?: number;
  completedTreatments?: number;
  expiryDate?: Date;
};

export const mockInfluencers: Influencer[] = [
  {
    id: "1",
    name: "Emma Rodriguez",
    email: "emma@example.com",
    referrals: 32,
    earnings: "£960",
    status: "active",
    lastActive: "Today",
    conversionRate: "92%",
    instagram: "@emmarod",
    tiktok: "@emmatiktok",
    youtube: "@emmabeauty",
    phone: "+44 7700 900123",
    bio: "Specializes in bridal makeup content",
    commissionRate: 30,
    discountPercentage: 15,
    referralCode: "emma-XY12Z",
    codeUsage: 36,
    completedTreatments: 29,
    expiryDate: new Date("2024-12-31"),
  },
  {
    id: "2",
    name: "James Wilson",
    email: "james@example.com",
    referrals: 28,
    earnings: "£840",
    status: "active",
    lastActive: "Today",
    conversionRate: "89%",
    instagram: "@jamesw",
    youtube: "@jameswilsonbeauty",
    phone: "+44 7700 900456",
    commissionRate: 30,
    discountPercentage: 10,
    referralCode: "james-AB34C",
    codeUsage: 32,
    completedTreatments: 25,
    expiryDate: new Date("2024-12-31"),
  },
  {
    id: "3",
    name: "Sophie Anderson",
    email: "sophie@example.com",
    referrals: 24,
    earnings: "£720",
    status: "active",
    lastActive: "Yesterday",
    conversionRate: "85%",
    instagram: "@sophiea",
    tiktok: "@sophietok",
    youtube: "@sophieandersonbeauty",
    phone: "+44 7700 900789",
    commissionRate: 28,
    discountPercentage: 12,
    referralCode: "sophi-DE56F",
    codeUsage: 28,
    completedTreatments: 20,
    expiryDate: new Date("2024-12-31"),
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "michael@example.com",
    referrals: 18,
    earnings: "£540",
    status: "inactive",
    lastActive: "3 days ago",
    conversionRate: "78%",
    instagram: "@mikeb",
    commissionRate: 25,
    discountPercentage: 10,
    referralCode: "micha-GH78I",
    codeUsage: 24,
    completedTreatments: 14,
    expiryDate: new Date("2024-12-31"),
  },
  {
    id: "5",
    name: "Olivia Davis",
    email: "olivia@example.com",
    referrals: 15,
    earnings: "£450",
    status: "active",
    lastActive: "Today",
    conversionRate: "82%",
    tiktok: "@oliviatik",
    phone: "+44 7700 900321",
    commissionRate: 30,
    discountPercentage: 15,
    referralCode: "olivi-JK90L",
    codeUsage: 18,
    completedTreatments: 12,
    expiryDate: new Date("2024-12-31"),
  },
  {
    id: "6",
    name: "David Johnson",
    email: "david@example.com",
    referrals: 12,
    earnings: "£360",
    status: "active",
    lastActive: "Yesterday",
    conversionRate: "75%",
    instagram: "@davidj",
    tiktok: "@davidtok",
    phone: "+44 7700 900654",
    commissionRate: 30,
    discountPercentage: 8,
    referralCode: "david-MN12O",
    codeUsage: 16,
    completedTreatments: 9,
    expiryDate: new Date("2024-12-31"),
  },
];

export const mockReferralData = [
  { name: "Jan", value: 45 },
  { name: "Feb", value: 62 },
  { name: "Mar", value: 78 },
  { name: "Apr", value: 95 },
  { name: "May", value: 110 },
  { name: "Jun", value: 132 },
  { name: "Jul", value: 148 },
  { name: "Aug", value: 165 },
  { name: "Sep", value: 180 },
  { name: "Oct", value: 195 },
  { name: "Nov", value: 210 },
  { name: "Dec", value: 225 },
];

export const mockRevenueData = [
  { name: "Jan", value: 4500 },
  { name: "Feb", value: 6200 },
  { name: "Mar", value: 7800 },
  { name: "Apr", value: 9500 },
  { name: "May", value: 11000 },
  { name: "Jun", value: 13200 },
  { name: "Jul", value: 14800 },
  { name: "Aug", value: 16500 },
  { name: "Sep", value: 18000 },
  { name: "Oct", value: 19500 },
  { name: "Nov", value: 21000 },
  { name: "Dec", value: 22500 },
];
