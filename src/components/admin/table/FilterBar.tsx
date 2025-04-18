
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenFilterDialog: () => void;
  hasFiltersApplied: boolean;
  activeFiltersCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenFilterDialog,
  hasFiltersApplied,
  activeFiltersCount,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 items-end sm:items-center justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bwc-charcoal-light" size={18} />
        <input
          type="text"
          placeholder="Search influencers..."
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bwc-gold focus:border-transparent"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          onClick={onOpenFilterDialog}
          variant="outline" 
          className="flex items-center gap-2 relative"
        >
          <SlidersHorizontal size={16} />
          <span>Filters</span>
          {hasFiltersApplied && (
            <Badge className="absolute -top-2 -right-2 bg-bwc-gold text-white h-5 min-w-5 flex items-center justify-center text-xs rounded-full p-0">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
