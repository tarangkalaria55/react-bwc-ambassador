import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import UKPhoneInput from "@/components/ui/UKPhoneInput";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";

const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    phone: z
      .string()
      .regex(/^07\d{9}$/, "Please enter a valid UK mobile number"),
    instagram: z.string().optional(),
    tiktok: z.string().optional(),
    youtube: z.string().optional(),
    bio: z
      .string()
      .min(
        10,
        "Please tell us why you're interested in the BWC Ambassador programme"
      ),
    notEmployee: z.boolean().refine((val) => val === true, {
      message: "You must confirm you are not an employee",
    }),
    is18Plus: z.boolean().refine((val) => val === true, {
      message: "You must confirm you are 18+ years old",
    }),
    consentMarketing: z.boolean().optional(),
  })
  .refine((data) => data.instagram || data.tiktok || data.youtube, {
    message: "Please provide at least one social media handle",
    path: ["instagram"], // This will show the error under the Instagram field
  });

type FormValues = z.infer<typeof formSchema>;

type AmbassadorInterestFormProps = {
  onSuccess?: () => void;
};

const AmbassadorInterestForm: React.FC<AmbassadorInterestFormProps> = ({
  onSuccess,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      instagram: "",
      tiktok: "",
      youtube: "",
      bio: "",
      notEmployee: false,
      is18Plus: false,
      consentMarketing: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Application Submitted",
      description:
        "Thank you for submitting your interest in becoming a BWC Ambassador!",
    });
    setIsSubmitted(true);
    if (onSuccess) {
      setTimeout(onSuccess, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold text-center text-bwc-charcoal mb-6">
          Thank You for Submitting Your Interest!
        </h2>
        <p className="text-center text-bwc-charcoal-light mb-6">
          Brazilian Waxing Company will review your application and contact you
          soon.
        </p>
        <div className="text-center">
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-[#AD9961] text-white hover:bg-[#AD9961]/90"
          >
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg mt-2">
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-bwc-charcoal hover:text-bwc-gold flex items-center -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <h2 className="text-2xl font-bold text-center text-bwc-charcoal mb-2">
        BWC Ambassador Interest Form
      </h2>
      <p className="text-center text-bwc-charcoal-light mb-6">
        Are you interested in becoming an ambassador for Brazilian Waxing
        Company? As a BWC Ambassador, you can share BWC products with your
        community and earn commissions on net sales generated through your
        links.
      </p>

      <div className="mb-6 p-4 bg-bwc-cream rounded-lg">
        <p className="text-bwc-charcoal-light">
          Complete this form to confirm your interest. Brazilian Waxing Company
          will review your information for consideration. If Brazilian Waxing
          Company approves you as an ambassador, we will let you know.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormDescription className="text-bwc-charcoal-light mb-4">
              Please provide your email address so we can contact you regarding
              your application.
            </FormDescription>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number*</FormLabel>
                  <FormControl>
                    <UKPhoneInput
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/\s/g, ""));
                      }}
                      error={form.formState.errors.phone?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormDescription className="text-bwc-charcoal-light mb-4">
              Please provide at least one social media handle where we can view
              your content.
            </FormDescription>

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="@yourusername" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tiktok"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TikTok</FormLabel>
                  <FormControl>
                    <Input placeholder="@yourusername" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube</FormLabel>
                  <FormControl>
                    <Input placeholder="@yourusername" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Why are you interested in applying to the BWC Ambassador
                  programme?*
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please include 2-3 sentences about why you'd like to join our programme"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="notEmployee"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I am not a Brazilian Waxing Company employee*
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is18Plus"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I am 18+ years old*</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-bwc-charcoal-light mb-4">
              By filling this form out, you are consenting for Brazilian Waxing
              Company to send you information about Brazilian Waxing Company.
            </p>

            <p className="text-sm text-bwc-charcoal-light mb-4">
              Brazilian Waxing Company is committed to protecting and respecting
              your privacy, and we'll only use your personal information to
              administer your account and to provide the products and services
              you requested from us. From time to time, we would like to contact
              you about our products and services, as well as other content that
              may be of interest to you. If you consent to us contacting you for
              this purpose, please tick below:
            </p>

            <FormField
              control={form.control}
              name="consentMarketing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to receive other communications from Brazilian
                      Waxing Company.
                    </FormLabel>
                    <FormDescription>
                      You may unsubscribe from these communications at any time.
                      For more information on how to unsubscribe, our privacy
                      practices, and how we are committed to protecting and
                      respecting your privacy, please review our Privacy
                      Statement.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <p className="text-sm text-bwc-charcoal-light mt-4">
              By clicking submit below, you consent to allow Brazilian Waxing
              Company to store and process the personal information submitted
              above to provide you the content requested.
            </p>
          </div>

          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              className="rounded-none border-black bg-black text-white hover:bg-black/90 px-10 py-6"
              size="lg"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AmbassadorInterestForm;
