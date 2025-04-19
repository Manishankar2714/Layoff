"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp as Trend, Building2, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface LayoffStatsProps {
  isLoading: boolean;
}

export default function LayoffStats({ isLoading }: LayoffStatsProps) {
  // Demo data
  const stats = [
    {
      id: 1,
      name: "Total Layoffs (2023)",
      value: "387,243",
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      id: 2,
      name: "Companies Affected",
      value: "1,194",
      change: "+8.2%",
      trend: "up",
      icon: Building2,
    },
    {
      id: 3,
      name: "Tech Industry",
      value: "187,943",
      change: "+23.7%",
      trend: "up",
      icon: Trend,
    },
    {
      id: 4,
      name: "Monthly Average",
      value: "32,270",
      change: "-3.4%",
      trend: "down",
      icon: Trend,
    },
  ];

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
    } else {
      setProgress(20);
    }
  }, [isLoading]);

  return (
    <div className="mt-8">
      {isLoading && (
        <div className="mx-auto mb-6 w-full max-w-xl">
          <Progress value={progress} className="h-1" />
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Loading latest layoff data...
          </p>
        </div>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.id} className="overflow-hidden">
            <CardContent className="p-6">
              {isLoading ? (
                <>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                  <Skeleton className="mt-2 h-7 w-20" />
                  <Skeleton className="mt-3 h-4 w-16" />
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {stat.name}
                    </h3>
                    <stat.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-2xl font-bold">{stat.value}</div>
                  <div className="mt-1 flex items-center">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        stat.trend === "up"
                          ? "text-destructive"
                          : "text-green-500"
                      )}
                    >
                      {stat.change} from last year
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}