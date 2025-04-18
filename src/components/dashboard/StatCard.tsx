import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    comparedTo?: string;
  };
  className?: string;
  tooltip?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
  tooltip,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "p-6 rounded-xl glass-card hover-lift flex items-center relative",
        className
      )}
    >
      <div className="mr-4 p-3 rounded-lg bg-bwc-gold-light/50 text-bwc-gold">
        {icon}
      </div>
      <div className="relative">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-bwc-charcoal-light">
            {title}
          </h3>
          {tooltip && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <button className="ml-1 text-bwc-charcoal-light/70 hover:text-bwc-gold transition-colors">
                  <Info size={14} />
                </button>
              </HoverCardTrigger>
              <HoverCardContent
                align="center"
                side="top"
                sideOffset={5}
                className="p-3 bg-white text-bwc-charcoal border-bwc-gold/20 shadow-md z-[9999]"
                forceMount
              >
                <p className="text-sm">{tooltip}</p>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        <div className="flex items-baseline mt-1">
          <p className="text-2xl font-semibold text-bwc-charcoal">{value}</p>
          {trend && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center ml-2 cursor-help">
                  <span
                    className={`text-xs font-medium flex items-center ${
                      trend.isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {trend.isPositive ? (
                      <TrendingUp size={12} className="mr-0.5" />
                    ) : (
                      <TrendingDown size={12} className="mr-0.5" />
                    )}
                    {trend.isPositive ? "+" : ""}
                    {trend.value}%
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                align="center"
                side="top"
                sideOffset={5}
                className="p-3 bg-white text-bwc-charcoal border-bwc-gold/20 shadow-md z-[9999]"
                forceMount
              >
                <p className="text-sm">
                  {trend.isPositive ? "Increased" : "Decreased"} by{" "}
                  {trend.value}% compared to{" "}
                  {trend.comparedTo || "previous month"}
                </p>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
