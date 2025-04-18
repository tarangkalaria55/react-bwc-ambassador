import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AmbassadorInterestForm from "@/components/AmbassadorInterestForm";
import PageTransition from "@/components/ui/PageTransition";

const Ambassador = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="max-w-4xl mx-auto px-4">
            <AmbassadorInterestForm />
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Ambassador;
