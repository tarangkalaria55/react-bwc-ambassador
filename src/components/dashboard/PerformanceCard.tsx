import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";

interface DataPoint {
  name: string;
  value: number;
}

interface PerformanceCardProps {
  title: string;
  data: DataPoint[];
  className?: string;
  color?: string;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  data,
  className,
  color = "#2563EB",
}) => {
  const [timePeriod, setTimePeriod] = useState<"weekly" | "monthly" | "yearly">(
    "monthly"
  );

  // Transform data based on time period
  const transformedData = useMemo(() => {
    if (timePeriod === "weekly") {
      // For demo, create weekly data by dividing monthly data into weeks
      return data.flatMap((month) => {
        const weeksInMonth = 4;
        const weeklyValue = Math.round(month.value / weeksInMonth);
        return Array.from({ length: weeksInMonth }, (_, i) => ({
          name: `${month.name} W${i + 1}`,
          value: weeklyValue + Math.floor(Math.random() * 10) - 5, // Add some variation
        }));
      });
    }

    if (timePeriod === "yearly") {
      // For demo, group monthly data into quarters
      const yearlyData = data.reduce((acc, month, index) => {
        const quarterIndex = Math.floor(index / 3);
        if (!acc[quarterIndex]) {
          acc[quarterIndex] = { name: `Q${quarterIndex + 1}`, value: 0 };
        }
        acc[quarterIndex].value += month.value;
        return acc;
      }, [] as DataPoint[]);
      return yearlyData;
    }

    return data; // Monthly data (default)
  }, [data, timePeriod]);

  return (
    <Card className={cn("p-6 rounded-xl glass-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Select
          value={timePeriod}
          onValueChange={(value: "weekly" | "monthly" | "yearly") =>
            setTimePeriod(value)
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transformedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  title.includes("Earnings") ? `£${value}` : value.toString()
                }
              />
              <Tooltip
                formatter={(value: number) =>
                  title.includes("Earnings") ? `£${value}` : value
                }
              />
              <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
