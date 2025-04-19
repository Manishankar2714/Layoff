"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RecentLayoffsProps {
  isLoading: boolean;
}

export default function RecentLayoffs({ isLoading }: RecentLayoffsProps) {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  // Demo data for recent layoffs
  const layoffs = [
    {
      id: 1,
      company: "TechCorp Inc.",
      date: "July 12, 2023",
      employees: "1,200",
      percentage: "18%",
      industry: "Technology",
      source: "https://example.com/news/1",
      logo: "https://images.pexels.com/photos/2652340/pexels-photo-2652340.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
    },
    {
      id: 2,
      company: "Global Finance",
      date: "July 8, 2023",
      employees: "850",
      percentage: "12%",
      industry: "Finance",
      source: "https://example.com/news/2",
      logo: "https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
    },
    {
      id: 3,
      company: "Retail Goods Inc.",
      date: "July 5, 2023",
      employees: "620",
      percentage: "8%",
      industry: "Retail",
      source: "https://example.com/news/3",
      logo: "https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
    },
    {
      id: 4,
      company: "HealthPlus Systems",
      date: "June 30, 2023",
      employees: "1,500",
      percentage: "15%",
      industry: "Healthcare",
      source: "https://example.com/news/4",
      logo: "https://images.pexels.com/photos/7773757/pexels-photo-7773757.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
    },
    {
      id: 5,
      company: "Media Networks",
      date: "June 28, 2023",
      employees: "450",
      percentage: "22%",
      industry: "Media",
      source: "https://example.com/news/5",
      logo: "https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
    },
  ];

  const industries = ["Technology", "Finance", "Retail", "Healthcare", "Media"];

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  // Filter layoffs by selected industries
  const filteredLayoffs = selectedIndustries.length
    ? layoffs.filter((layoff) => selectedIndustries.includes(layoff.industry))
    : layoffs;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Recent Layoffs</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {industries.map((industry) => (
              <DropdownMenuCheckboxItem
                key={industry}
                checked={selectedIndustries.includes(industry)}
                onCheckedChange={() => toggleIndustry(industry)}
              >
                {industry}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[150px]" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLayoffs.map((layoff) => (
            <Card key={layoff.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <img
                        src={layoff.logo}
                        alt={`${layoff.company} logo`}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{layoff.company}</h3>
                      <p className="text-sm text-muted-foreground">
                        {layoff.date} • {layoff.employees} employees ({layoff.percentage})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{layoff.industry}</Badge>
                    <Link href={layoff.source} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View source</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}