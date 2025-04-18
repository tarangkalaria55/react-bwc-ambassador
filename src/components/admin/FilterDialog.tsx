
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Form, FormField, FormItem, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { XCircle } from 'lucide-react';

export type FilterOptions = {
  status: 'all' | 'active' | 'inactive';
  sort: 'name' | 'referrals' | 'earnings' | 'conversionRate';
  sortDirection: 'asc' | 'desc';
  minReferrals: number | null;
};

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFilter: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const FilterDialog: React.FC<FilterDialogProps> = ({
  open,
  onOpenChange,
  onFilter,
  currentFilters,
}) => {
  const form = useForm<FilterOptions>({
    defaultValues: currentFilters,
  });

  const handleSubmit = (data: FilterOptions) => {
    onFilter(data);
    onOpenChange(false);
  };

  const handleReset = () => {
    const defaultFilters: FilterOptions = {
      status: 'all',
      sort: 'name',
      sortDirection: 'asc',
      minReferrals: null,
    };
    
    form.reset(defaultFilters);
    onFilter(defaultFilters);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span>Filter Influencers</span>
          </DialogTitle>
          <DialogDescription>
            Apply filters to the influencer table to find specific influencers.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Label>Status</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-4">
              <Label>Sort by</Label>
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="sort"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Sort field" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="name">Name</SelectItem>
                          <SelectItem value="referrals">Referrals</SelectItem>
                          <SelectItem value="earnings">Earnings</SelectItem>
                          <SelectItem value="conversionRate">Conversion Rate</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sortDirection"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Direction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="asc">Ascending</SelectItem>
                          <SelectItem value="desc">Descending</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="minReferrals"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <Label>Minimum Referrals</Label>
                    <input
                      type="number"
                      className="w-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                      value={field.value !== null ? field.value : ''}
                      min={0}
                    />
                  </div>
                  <FormDescription>
                    Show only influencers with at least this many referrals
                  </FormDescription>
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-between mt-6 gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                className="flex gap-1 items-center"
              >
                <XCircle size={16} />
                Reset Filters
              </Button>
              <Button type="submit">Apply Filters</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
