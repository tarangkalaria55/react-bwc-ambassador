export interface AmbassadorApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram: string;
  tiktok?: string;
  youtube?: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  bio: string;
}

export const mockApplications: AmbassadorApplication[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+44 7700 900123",
    instagram: "@sarahbeauty",
    tiktok: "@sarahbeautytips",
    youtube: "@sarahbeautychannel",
    status: "pending",
    submittedAt: "2024-03-10T14:30:00Z",
    bio: "I'm passionate about creating high-quality beauty content and would love to partner with BWC. My audience trusts my recommendations and I believe in BWC's products.",
  },
  {
    id: "2",
    name: "Mike Thompson",
    email: "mike.t@example.com",
    phone: "+44 7700 900456",
    instagram: "@mikestyle",
    youtube: "@mikestylegrooming",
    status: "pending",
    submittedAt: "2024-03-09T16:45:00Z",
    bio: "I want to join BWC's ambassador program to help promote quality grooming products to my male audience. I believe in authentic partnerships and creating valuable content.",
  },
  {
    id: "3",
    name: "Emily Chen",
    email: "emily.c@example.com",
    phone: "+44 7700 900789",
    instagram: "@emilybeauty",
    tiktok: "@emilyskincare",
    youtube: "@emilybeautyeducation",
    status: "approved",
    submittedAt: "2024-03-08T09:15:00Z",
    bio: "As a professional makeup artist, I'm excited about the opportunity to partner with BWC. I love educating my audience about quality beauty products and services.",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "+44 7700 900321",
    instagram: "@davidhealth",
    status: "rejected",
    submittedAt: "2024-03-07T11:20:00Z",
    bio: "I'm interested in partnering with BWC to promote wellness and self-care to my fitness community. I believe in the importance of quality personal care products.",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+44 7700 900654",
    instagram: "@lisabeauty",
    tiktok: "@lisabeautysecrets",
    youtube: "@lisabeautytips",
    status: "pending",
    submittedAt: "2024-03-10T10:00:00Z",
    bio: "I'm passionate about natural skincare and would love to partner with BWC. My audience values authentic recommendations and I believe in BWC's approach to beauty.",
  },
];
