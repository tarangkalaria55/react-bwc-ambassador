
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import InfluencerCodeDetailsDialog, { CodeUsage } from './InfluencerCodeDetailsDialog';

interface PerformanceChartsProps {
  referralData: Array<{ name: string; value: number }>;
  revenueData: Array<{ name: string; value: number }>;
}

type InfluencerMetric = {
  name: string;
  codeUsage: number;
  completedTreatments: number;
}

const generateInfluencerMetricsData = (): InfluencerMetric[] => {
  return [
    { name: 'Emma R.', codeUsage: 36, completedTreatments: 29 },
    { name: 'James W.', codeUsage: 32, completedTreatments: 25 },
    { name: 'Sophie A.', codeUsage: 28, completedTreatments: 20 },
    { name: 'Michael B.', codeUsage: 24, completedTreatments: 14 },
    { name: 'Olivia D.', codeUsage: 18, completedTreatments: 12 },
    { name: 'David J.', codeUsage: 16, completedTreatments: 9 },
  ];
};

const generateMockCodeUsages = (influencerName: string): CodeUsage[] => {
  const statuses: ('completed' | 'pending' | 'cancelled')[] = ['completed', 'pending', 'cancelled'];
  const usages: CodeUsage[] = [];
  
  const count = Math.floor(Math.random() * 6) + 5;
  
  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = status === 'completed' ? `£${(Math.random() * 200 + 50).toFixed(2)}` : '£0.00';
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    
    // Generate a random booking ID
    const bookingId = Math.floor(100000 + Math.random() * 900000).toString();
    
    usages.push({
      id: `usage-${i}-${influencerName.replace(' ', '-')}`,
      date: formattedDate,
      bookingId,
      status,
      amount
    });
  }
  
  return usages.sort((a, b) => {
    const dateA = new Date(a.date.split(' ').join('-'));
    const dateB = new Date(b.date.split(' ').join('-'));
    return dateB.getTime() - dateA.getTime();
  });
};

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ referralData, revenueData }) => {
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<string>('');
  const [codeUsages, setCodeUsages] = useState<CodeUsage[]>([]);
  
  const totalReferrals = referralData.reduce((sum, item) => sum + item.value, 0);
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
  
  const allInfluencerMetrics = generateInfluencerMetricsData();
  const topInfluencerMetrics = allInfluencerMetrics.slice(0, 5);
  
  const totalCodeUsage = allInfluencerMetrics.reduce((sum, item) => sum + item.codeUsage, 0);
  const totalCompletedTreatments = allInfluencerMetrics.reduce((sum, item) => sum + item.completedTreatments, 0);
  
  const handleInfluencerClick = (influencerName: string) => {
    setSelectedInfluencer(influencerName);
    const usageData = generateMockCodeUsages(influencerName);
    setCodeUsages(usageData);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="p-6 rounded-xl glass-card">
          <h3 className="text-lg font-semibold text-bwc-charcoal mb-2">Total Paid to Influencers</h3>
          <p className="text-3xl font-bold mt-4 text-bwc-charcoal">£{(totalCompletedTreatments * 25).toLocaleString()}</p>
          <p className="text-sm text-bwc-charcoal-light mt-2">Total commissions paid to influencers</p>
        </div>
        
        <div className="p-6 rounded-xl glass-card">
          <h3 className="text-lg font-semibold text-bwc-charcoal mb-2">Total Earned from Bookings</h3>
          <p className="text-3xl font-bold mt-4 text-bwc-charcoal">£{totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-bwc-charcoal-light mt-2">Total revenue from influencer-referred bookings</p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top 5 Influencer Code Performers</CardTitle>
          <Button variant="outline" asChild>
            <Link to="/influencer-performance" className="flex items-center gap-2">
              View All <ExternalLink size={14} />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Influencer</TableHead>
                <TableHead className="text-right">Code Usage</TableHead>
                <TableHead className="text-right">Completed Treatments</TableHead>
                <TableHead className="text-right">Conversion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topInfluencerMetrics.map((influencer) => (
                <TableRow key={influencer.name}>
                  <TableCell className="font-medium">
                    <button 
                      onClick={() => handleInfluencerClick(influencer.name)}
                      className="text-bwc-charcoal hover:text-bwc-gold underline-offset-4 hover:underline"
                    >
                      {influencer.name}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">{influencer.codeUsage}</TableCell>
                  <TableCell className="text-right">{influencer.completedTreatments}</TableCell>
                  <TableCell className="text-right">
                    {Math.round((influencer.completedTreatments / influencer.codeUsage) * 100)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-muted/30 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Total Code Usage</p>
              <p className="text-2xl font-semibold">{totalCodeUsage}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Total Commission</p>
              <p className="text-2xl font-semibold">£{totalCompletedTreatments * 25}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <InfluencerCodeDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        influencerName={selectedInfluencer}
        codeUsages={codeUsages}
      />
    </div>
  );
};

export default PerformanceCharts;
