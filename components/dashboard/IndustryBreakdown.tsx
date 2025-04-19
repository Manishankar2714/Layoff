"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface IndustryBreakdownProps {
  isLoading: boolean;
}

export default function IndustryBreakdown({ isLoading }: IndustryBreakdownProps) {
  // Demo data for industry breakdown
  const data = [
    { name: "Technology", value: 187943, color: "hsl(var(--chart-1))" },
    { name: "Finance", value: 62381, color: "hsl(var(--chart-2))" },
    { name: "Retail", value: 45729, color: "hsl(var(--chart-3))" },
    { name: "Healthcare", value: 28963, color: "hsl(var(--chart-4))" },
    { name: "Manufacturing", value: 34652, color: "hsl(var(--chart-5))" },
    { name: "Other", value: 27575, color: "hsl(var(--muted))" },
  ];

  // Calculate percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background p-2 border rounded shadow-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.value.toLocaleString()} layoffs ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Industry Breakdown</h2>
      
      <Card>
        <CardContent className="p-4 pt-6">
          {isLoading ? (
            <div className="flex flex-col space-y-4">
              <Skeleton className="h-[300px] w-full rounded-md" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataWithPercentage}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percentage }) => `${name} (${percentage}%)`}
                      labelLine={false}
                    >
                      {dataWithPercentage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex flex-col justify-center space-y-3">
                {dataWithPercentage.map((industry, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: industry.color }}
                      ></div>
                      <span className="text-sm">{industry.name}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{industry.value.toLocaleString()}</span>
                      <span className="text-muted-foreground ml-1">
                        ({industry.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}