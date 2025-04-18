
import React from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface TableHeaderProps {
  sortField: string;
  sortDirection: string;
  onSort: (field: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  sortField,
  sortDirection,
  onSort,
}) => {
  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <thead>
      <tr className="text-left text-xs font-medium text-bwc-charcoal-light uppercase tracking-wider border-b border-gray-100">
        <th 
          className="px-4 py-3 cursor-pointer hover:text-bwc-gold"
          onClick={() => onSort('name')}
        >
          <div className="flex items-center">
            <span>Name</span>
            {getSortIcon('name')}
          </div>
        </th>
        <th 
          className="px-4 py-3 cursor-pointer hover:text-bwc-gold"
          onClick={() => onSort('referrals')}
        >
          <div className="flex items-center">
            <span>Referrals</span>
            {getSortIcon('referrals')}
          </div>
        </th>
        <th className="px-4 py-3">
          <div className="flex items-center">
            <span>Code Usage</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-1 text-bwc-charcoal-light/70 hover:text-bwc-gold transition-colors">
                    <Info size={12} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-bwc-charcoal text-white text-xs">
                  Number of times the influencer's code was used
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </th>
        <th className="px-4 py-3">
          <div className="flex items-center">
            <span>Completed</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-1 text-bwc-charcoal-light/70 hover:text-bwc-gold transition-colors">
                    <Info size={12} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-bwc-charcoal text-white text-xs">
                  Number of completed treatments from this influencer's referrals
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </th>
        <th 
          className="px-4 py-3 cursor-pointer hover:text-bwc-gold"
          onClick={() => onSort('earnings')}
        >
          <div className="flex items-center">
            <span>Earnings</span>
            {getSortIcon('earnings')}
          </div>
        </th>
        <th className="px-4 py-3">Status</th>
        <th 
          className="px-4 py-3 cursor-pointer hover:text-bwc-gold"
          onClick={() => onSort('conversionRate')}
        >
          <div className="flex items-center">
            <span>Conversion</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-1 text-bwc-charcoal-light/70 hover:text-bwc-gold transition-colors">
                    <Info size={12} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-bwc-charcoal text-white text-xs">
                  Percentage of referrals that resulted in completed treatments
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {getSortIcon('conversionRate')}
          </div>
        </th>
        <th className="px-4 py-3 text-right">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
