import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AmbassadorInterestForm from "@/components/AmbassadorInterestForm";
import PageTransition from "@/components/ui/PageTransition";

const AmbassadorForm = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <AmbassadorInterestForm />
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default AmbassadorForm;
