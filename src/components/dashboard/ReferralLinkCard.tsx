
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

const ReferralLinkCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "emma-XY12Z"; // This would come from user data in a real app

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Referral code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-xl glass-card">
      <h3 className="text-lg font-semibold text-bwc-charcoal mb-2">Your Referral Code</h3>
      <p className="text-sm text-bwc-charcoal-light mb-4">
        Share this unique code to earn rewards when people use it during checkout.
      </p>
      
      <div className="flex items-center space-x-2 mb-4">
        <Input
          value={referralCode}
          readOnly
          className="bg-bwc-cream border-bwc-gold/20 focus-visible:ring-bwc-gold/30"
        />
        <Button
          onClick={copyToClipboard}
          variant="outline"
          size="icon"
          className={`${
            copied 
              ? "bg-green-50 text-green-600 border-green-200" 
              : "bg-bwc-cream text-bwc-charcoal border-bwc-gold/20 hover:bg-bwc-gold-light/50"
          }`}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </Button>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-bwc-charcoal">Share on</h4>
        <div className="flex space-x-2">
          <Button className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white">
            Facebook
          </Button>
          <Button className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white">
            Twitter
          </Button>
          <Button className="bg-[#E60023] hover:bg-[#E60023]/90 text-white">
            Pinterest
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralLinkCard;
