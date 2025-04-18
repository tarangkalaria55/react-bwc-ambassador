import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Navigation Menu */}
        <div className="border-b border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto">
            <nav className="flex justify-center md:space-x-8 text-sm font-medium">
              <a
                href="#"
                className="py-4 px-3 whitespace-nowrap border-b-2 border-black uppercase"
              >
                Home
              </a>
              <a
                href="#how-it-works"
                className="py-4 px-3 whitespace-nowrap hover:border-b-2 hover:border-black transition-all uppercase"
              >
                How it works
              </a>
              <a
                href="#your-benefits"
                className="py-4 px-3 whitespace-nowrap hover:border-b-2 hover:border-black transition-all uppercase"
              >
                Your benefits
              </a>
              <a
                href="#faq"
                className="py-4 px-3 whitespace-nowrap hover:border-b-2 hover:border-black transition-all uppercase"
              >
                FAQ
              </a>
            </nav>
          </div>
        </div>

        {/* Ambassador Header Section */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-medium mb-6 uppercase">
              Brazilian Waxing Company Ambassadors
            </h1>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Join our exclusive community of beauty enthusiasts and
              influencers.
            </p>
          </div>
        </section>

        {/* Ambassador Image Gallery with Carousel */}
        <section className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <Carousel className="w-full">
              <CarouselContent>
                {/* Image 1 */}
                <CarouselItem className="md:basis-1/3">
                  <div className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-1">
                    <AspectRatio ratio={3 / 4} className="bg-gray-100">
                      <img
                        src="/lovable-uploads/0928e17d-7c5d-450e-bd15-d64a991f0d10.png"
                        alt="Ambassador artistic portrait with veil"
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                </CarouselItem>

                {/* Image 2 */}
                <CarouselItem className="md:basis-1/3">
                  <div className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-1">
                    <AspectRatio ratio={3 / 4} className="bg-gray-100">
                      <img
                        src="/lovable-uploads/0e487184-ce1b-4e29-80bf-96fd828f3eae.png"
                        alt="Ambassador with blue fashion accessory"
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                </CarouselItem>

                {/* Image 3 */}
                <CarouselItem className="md:basis-1/3">
                  <div className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 p-1">
                    <AspectRatio ratio={3 / 4} className="bg-gray-100">
                      <img
                        src="/lovable-uploads/28cb2237-b54d-4699-9efe-b334b2000e62.png"
                        alt="Ambassador portrait with butterfly"
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2 lg:-left-12" />
              <CarouselNext className="right-2 lg:-right-12" />
            </Carousel>
          </div>
        </section>

        {/* Ambassador Call to Action */}
        <section className="py-8 bg-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-xl md:text-2xl uppercase font-medium mb-3">
              Would you like to be our ambassador?
            </h2>
            <p className="text-sm uppercase mb-8 tracking-wide">
              We are looking to collaborate with inspiring creators that share
              our love for beauty and lifestyle!
            </p>

            <div className="flex justify-center flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Link to="/ambassador">
                <Button
                  variant="outline"
                  className="border-black hover:bg-black hover:text-white rounded-none px-8 uppercase text-sm"
                >
                  Join us
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-black hover:bg-black hover:text-white rounded-none px-8 uppercase text-sm"
                onClick={() => {
                  const loginDialog = document.getElementById("login-button");
                  if (loginDialog) {
                    loginDialog.click();
                  }
                }}
              >
                <LogIn className="h-4 w-4 mr-2" />
                LOG IN
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl uppercase font-medium mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-medium">
                  1
                </div>
                <h3 className="text-lg font-medium mb-2">Apply</h3>
                <p className="text-sm">
                  Complete our ambassador application form to join our program.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-medium">
                  2
                </div>
                <h3 className="text-lg font-medium mb-2">Share</h3>
                <p className="text-sm">
                  Promote our products and services with your unique referral
                  link.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-medium">
                  3
                </div>
                <h3 className="text-lg font-medium mb-2">Earn</h3>
                <p className="text-sm">
                  Receive exclusive rewards, commissions, and benefits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Benefits Section */}
        <section id="your-benefits" className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl uppercase font-medium mb-8 text-center">
              Your Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-3">Exclusive Rewards</h3>
                <p className="text-sm">
                  Earn commissions on every successful referral that results in
                  a service booking.
                </p>
              </div>
              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-3">Free Products</h3>
                <p className="text-sm">
                  Receive complimentary Brazilian Waxing Company products to try
                  and review.
                </p>
              </div>
              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-3">Special Events</h3>
                <p className="text-sm">
                  Get invited to exclusive brand events and product launches.
                </p>
              </div>
              <div className="border border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-3">Community Access</h3>
                <p className="text-sm">
                  Join our community of beauty influencers and like-minded
                  individuals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl uppercase font-medium mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Who can become an ambassador?
                </h3>
                <p className="text-sm">
                  Anyone passionate about beauty and lifestyle who has an
                  engaged audience on social media can apply.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  How much can I earn?
                </h3>
                <p className="text-sm">
                  Earnings vary based on your referrals and engagement, with
                  commissions ranging from 10-20% per successful booking.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  How long does the application process take?
                </h3>
                <p className="text-sm">
                  We review applications weekly and typically respond within
                  7-10 business days.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Do I need to have a large following?
                </h3>
                <p className="text-sm">
                  While follower count is considered, we value authentic
                  engagement and genuine passion for our brand more.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
