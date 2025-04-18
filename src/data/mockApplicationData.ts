export type ApplicationStatus = "pending" | "approved" | "rejected";

export type AmbassadorApplication = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  primarySocialUrl: string;
  contentCategory: string;
  contentUrls: string[];
  interestReason: string;
  status: ApplicationStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  notes?: string;
};

export const mockApplications: AmbassadorApplication[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@example.com",
    primarySocialUrl: "https://instagram.com/sarahjbeauty",
    contentCategory: "Beauty & Lifestyle",
    contentUrls: [
      "https://instagram.com/sarahjbeauty/post1",
      "https://instagram.com/sarahjbeauty/post2",
    ],
    interestReason:
      "I love creating beauty content and would be excited to collaborate with BWC!",
    status: "pending",
    submittedAt: new Date("2024-03-15"),
  },
  {
    id: "2",
    firstName: "Mike",
    lastName: "Chen",
    email: "mike.c@example.com",
    primarySocialUrl: "https://tiktok.com/@mikechen",
    contentCategory: "Lifestyle & Wellness",
    contentUrls: [
      "https://tiktok.com/@mikechen/video1",
      "https://tiktok.com/@mikechen/video2",
    ],
    interestReason:
      "I create lifestyle content and would love to partner with BWC to promote beauty and wellness.",
    status: "approved",
    submittedAt: new Date("2024-03-14"),
    reviewedAt: new Date("2024-03-15"),
    reviewedBy: "admin@example.com",
    notes: "Strong content quality and good engagement rates.",
  },
  {
    id: "3",
    firstName: "Emma",
    lastName: "Wilson",
    email: "emma.w@example.com",
    primarySocialUrl: "https://instagram.com/emmabeauty",
    contentCategory: "Beauty & Fashion",
    contentUrls: [
      "https://instagram.com/emmabeauty/post1",
      "https://instagram.com/emmabeauty/post2",
    ],
    interestReason:
      "I specialize in beauty and fashion content and would be thrilled to work with BWC!",
    status: "rejected",
    submittedAt: new Date("2024-03-13"),
    reviewedAt: new Date("2024-03-14"),
    reviewedBy: "admin@example.com",
    notes: "Does not meet minimum follower requirements.",
  },
];
