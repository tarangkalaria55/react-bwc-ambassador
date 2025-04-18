import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import UKPhoneInput from "@/components/ui/UKPhoneInput";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^07\d{9}$/, "Please enter a valid UK mobile number"),
  instagram: z.string().min(1, "Instagram handle is required"),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  bio: z
    .string()
    .min(
      10,
      "Please tell us why you're interested in the BWC Ambassador programme"
    ),
});

type FormData = z.infer<typeof formSchema>;

const JoinUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // In a real app, this would be an API call
      console.log("Form submitted:", data);

      // Store the application data in localStorage for demo purposes
      // In a real app, this would be stored in a database
      const application = {
        ...data,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      const applications = JSON.parse(
        localStorage.getItem("applications") || "[]"
      );
      applications.push(application);
      localStorage.setItem("applications", JSON.stringify(applications));

      toast.success("Application submitted successfully!");

      // Reset form or redirect
      window.location.href = "/application-submitted";
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("phone", e.target.value.replace(/\s/g, ""), {
      shouldValidate: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Join Our Influencer Program
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Partner with BWC and grow your influence
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("name")}
                className="mt-1"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="mt-1"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <UKPhoneInput
                label="Contact Number"
                {...register("phone")}
                value={watch("phone")}
                onChange={handlePhoneChange}
                error={errors.phone?.message}
              />
            </div>

            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                {...register("instagram")}
                className="mt-1"
                placeholder="@yourusername"
              />
              {errors.instagram && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.instagram.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="tiktok">TikTok</Label>
              <Input
                id="tiktok"
                {...register("tiktok")}
                className="mt-1"
                placeholder="@yourusername"
              />
              {errors.tiktok && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.tiktok.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="youtube">YouTube</Label>
              <Input
                id="youtube"
                {...register("youtube")}
                className="mt-1"
                placeholder="@yourusername"
              />
              {errors.youtube && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.youtube.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="bio">
                Why are you interested in applying to the BWC Ambassador
                programme?
              </Label>
              <Textarea
                id="bio"
                {...register("bio")}
                className="mt-1"
                rows={4}
                placeholder="Please include 2-3 sentences about why you'd like to join our programme"
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
};

export default JoinUs;
