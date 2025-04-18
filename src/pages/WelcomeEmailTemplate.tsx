import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import PageTransition from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const defaultTemplate = `Dear {influencerName},

Welcome to the BWC Referral Program! We're excited to have you join our community of beauty influencers.

Your account has been successfully created. Here are your login details:

Email: {email}
Temporary Password: {temporaryPassword}

Please log in to your dashboard using the link below to set up your account and access your unique referral code:
{loginLink}

Important: For security reasons, please change your password when you first log in.

Once logged in, you'll be able to:
- View your unique referral code
- Track your referrals and earnings
- Access marketing materials
- View your commission rates
- Generate performance reports

If you have any questions or need assistance, please don't hesitate to contact our support team.

Best regards,
The BWC Team`;

const WelcomeEmailTemplate = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [subject, setSubject] = useState(
    "Welcome to BWC - Your Account Details"
  );
  const [template, setTemplate] = useState(defaultTemplate);
  const [previewData] = useState({
    influencerName: "Emma Rodriguez",
    email: "emma@example.com",
    temporaryPassword: "BWC123!@#",
    loginLink: "https://bwc-referrals.com/login",
  });

  const getPreviewContent = () => {
    let preview = template;
    Object.entries(previewData).forEach(([key, value]) => {
      preview = preview.replace(new RegExp(`{${key}}`, "g"), value);
    });
    return preview;
  };

  const handleSave = () => {
    // In a real app, make an API call to save the template
    toast.success("Email template saved successfully");
    setIsEditing(false);
  };

  const handleReset = () => {
    if (
      window.confirm("Are you sure you want to reset to the default template?")
    ) {
      setTemplate(defaultTemplate);
      setSubject("Welcome to BWC - Your Account Details");
      toast.success("Template reset to default");
    }
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
                <h1 className="text-2xl font-semibold">
                  Welcome Email Template
                </h1>
                <p className="text-sm text-muted-foreground">
                  Customize the welcome email sent to new influencers
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="text-sm"
              >
                Reset to Default
              </Button>
              {isEditing ? (
                <Button
                  onClick={handleSave}
                  className="flex items-center gap-2 text-sm"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-sm"
                >
                  <Eye className="h-4 w-4" />
                  Edit Template
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="edit" className="space-y-4">
            <TabsList>
              <TabsTrigger value="edit">Template</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="edit">
              <Card>
                <CardHeader>
                  <CardTitle>Email Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      disabled={!isEditing}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template">Email Body</Label>
                    <div className="text-sm text-muted-foreground mb-2">
                      Available variables: {"{influencerName}"}, {"{email}"},{" "}
                      {"{temporaryPassword}"}, {"{loginLink}"}
                    </div>
                    <Textarea
                      id="template"
                      value={template}
                      onChange={(e) => setTemplate(e.target.value)}
                      disabled={!isEditing}
                      rows={15}
                      className="font-mono"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-base">{subject}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="whitespace-pre-wrap font-sans text-sm">
                        {getPreviewContent()}
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </PageTransition>
  );
};

export default WelcomeEmailTemplate;
