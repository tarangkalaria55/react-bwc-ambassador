import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";

const NotFound = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-9xl font-display font-bold text-bwc-gold">
              404
            </h1>
            <h2 className="mt-4 text-3xl font-semibold text-bwc-charcoal">
              Page Not Found
            </h2>
            <p className="mt-4 text-xl text-bwc-charcoal-light max-w-md mx-auto">
              We couldn't find the page you're looking for. Please check the URL
              or return to the homepage.
            </p>
            <div className="mt-10">
              <Button asChild className="gold-gradient text-white">
                <Link to="/">Return to Homepage</Link>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default NotFound;
