import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const Profile = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    setIsLoading(false);
  }, []);

  const handleSaveChanges = () => {
    toast.success("Profile updated successfully", {
      description: "Your profile information has been saved.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-display font-bold text-bwc-charcoal">
                  My Profile
                </h1>
                <p className="mt-2 text-bwc-charcoal-light">
                  {userRole === "admin"
                    ? "Manage your account settings"
                    : "Manage your account and influencer details"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card - Different for Admin vs Ambassador */}
              <div className="lg:col-span-1">
                <Card className="glass-card overflow-hidden">
                  {userRole === "admin" ? (
                    // Admin Profile Card
                    <CardContent className="pt-6 pb-6">
                      <div className="flex justify-center mb-4">
                        <Avatar className="h-24 w-24 border-2 border-bwc-gold/20">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-bwc-gold-light text-bwc-gold text-2xl">
                            AD
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <h2 className="text-xl font-semibold text-bwc-charcoal text-center">
                        Admin User
                      </h2>
                      <p className="text-bwc-charcoal-light mt-1 text-center">
                        Administrator
                      </p>
                    </CardContent>
                  ) : (
                    // Ambassador Profile Card
                    <>
                      <div className="bg-gradient-to-r from-bwc-gold/20 to-bwc-gold-light/30 h-32 flex justify-center">
                        <Avatar className="h-32 w-32 border-4 border-white relative top-16">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-bwc-gold-light text-bwc-gold text-2xl">
                            JD
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <CardContent className="pt-20 pb-6 text-center">
                        <h2 className="text-xl font-semibold text-bwc-charcoal">
                          Jane Doe
                        </h2>
                        <p className="text-bwc-charcoal-light mt-1">
                          Beauty & Lifestyle Influencer
                        </p>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-xl font-semibold text-bwc-charcoal">
                                28
                              </p>
                              <p className="text-xs text-bwc-charcoal-light">
                                Referrals
                              </p>
                            </div>
                            <div>
                              <p className="text-xl font-semibold text-bwc-charcoal">
                                £840
                              </p>
                              <p className="text-xs text-bwc-charcoal-light">
                                Earned
                              </p>
                            </div>
                            <div>
                              <p className="text-xl font-semibold text-bwc-charcoal">
                                30%
                              </p>
                              <p className="text-xs text-bwc-charcoal-light">
                                Commission
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button className="gold-gradient text-white w-full">
                            Upload New Picture
                          </Button>
                        </div>
                      </CardContent>
                    </>
                  )}
                </Card>

                <Card className="glass-card mt-6">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-bwc-charcoal mb-4">
                      Account Security
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label
                          className="text-sm font-medium text-bwc-charcoal-light"
                          htmlFor="current-password"
                        >
                          Current Password
                        </label>
                        <Input
                          id="current-password"
                          type="password"
                          className="mt-1 bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
                        />
                      </div>
                      <div>
                        <label
                          className="text-sm font-medium text-bwc-charcoal-light"
                          htmlFor="new-password"
                        >
                          New Password
                        </label>
                        <Input
                          id="new-password"
                          type="password"
                          className="mt-1 bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
                        />
                      </div>
                      <div>
                        <label
                          className="text-sm font-medium text-bwc-charcoal-light"
                          htmlFor="confirm-password"
                        >
                          Confirm New Password
                        </label>
                        <Input
                          id="confirm-password"
                          type="password"
                          className="mt-1 bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
                        />
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-bwc-gold/20 hover:bg-bwc-gold-light/20 text-bwc-charcoal"
                      >
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Information */}
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-bwc-charcoal mb-4">
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className="text-sm font-medium text-bwc-charcoal-light"
                          htmlFor="first-name"
                        >
                          First Name
                        </label>
                        <Input
                          id="first-name"
                          defaultValue={userRole === "admin" ? "Admin" : "Jane"}
                          className="mt-1 bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
                        />
                      </div>
                      <div>
                        <label
                          className="text-sm font-medium text-bwc-charcoal-light"
                          htmlFor="last-name"
                        >
                          Last Name
                        </label>
                        <Input
                          id="last-name"
                          defaultValue={userRole === "admin" ? "User" : "Doe"}
                          className="mt-1 bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
                        />
                      </div>
                      <div>
                        <label
                          className="text-sm font-medium text-bwc-charcoal-light"
                          htmlFor="email"
                        >
                          Email Address
                        </label>
                        <Input
                          id="email"
                          defaultValue={
                            userRole === "admin"
                              ? "admin@example.com"
                              : "jane.doe@example.com"
                          }
                          className="mt-1 bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
                        />
                      </div>
                      <div>
                        <label
                          className="text-sm font-medium text-bwc-charcoal-light"
                          htmlFor="phone"
                        >
                          Phone Number (UK)
                        </label>
                        <Input
                          id="phone"
                          isPhoneInput
                          defaultValue="+44 7700 900123"
                          placeholder="+44 XXXX XXXXXX"
                          className="mt-1 bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Only show Influencer Profile section for ambassadors */}
                {userRole !== "admin" && (
                  <Card className="glass-card mt-6">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold text-bwc-charcoal mb-4">
                        Influencer Profile
                      </h3>

                      <div className="space-y-6">
                        <div>
                          <label
                            className="text-sm font-medium text-bwc-charcoal-light"
                            htmlFor="display-name"
                          >
                            Display Name / Brand
                          </label>
                          <Input
                            id="display-name"
                            defaultValue="Jane's Beauty Corner"
                            className="mt-1 bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
                          />
                        </div>
                        <div>
                          <label
                            className="text-sm font-medium text-bwc-charcoal-light"
                            htmlFor="bio"
                          >
                            Bio
                          </label>
                          <Textarea
                            id="bio"
                            defaultValue="Beauty and lifestyle influencer with 5+ years of experience in the industry. Specializing in makeup tutorials and skincare reviews."
                            className="mt-1 bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
                            rows={4}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              className="text-sm font-medium text-bwc-charcoal-light"
                              htmlFor="instagram"
                            >
                              Instagram
                            </label>
                            <div className="flex mt-1">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-bwc-gold/20 bg-bwc-cream/60 text-bwc-charcoal-light">
                                @
                              </span>
                              <Input
                                id="instagram"
                                defaultValue="jane_beauty"
                                className="rounded-l-none bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              className="text-sm font-medium text-bwc-charcoal-light"
                              htmlFor="website"
                            >
                              Website
                            </label>
                            <Input
                              id="website"
                              defaultValue="https://janebeauty.com"
                              className="mt-1 bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            className="text-sm font-medium text-bwc-charcoal-light"
                            htmlFor="payment-method"
                          >
                            Preferred Payment Method
                          </label>
                          <select
                            id="payment-method"
                            className="mt-1 w-full bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30 rounded-md"
                            defaultValue="paypal"
                          >
                            <option value="paypal">PayPal</option>
                            <option value="bank">Bank Transfer</option>
                            <option value="venmo">Venmo</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="mt-8 flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    className="border-bwc-gold/20 hover:bg-bwc-gold-light/20"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="gold-gradient text-white"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Profile;
