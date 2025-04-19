"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Calendar } from "lucide-react";
import Link from "next/link";

interface TrendingCompaniesProps {
  isLoading: boolean;
}

export default function TrendingCompanies({ isLoading }: TrendingCompaniesProps) {
  // Demo data for trending companies
  const companies = [
    {
      id: 1,
      name: "TechCorp Inc.",
      industry: "Technology",
      totalLayoffs: 3750,
      latestLayoff: {
        date: "July 12, 2023",
        count: 1200,
      },
      logo: "https://images.pexels.com/photos/2652340/pexels-photo-2652340.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
    },
    {
      id: 2,
      name: "FinanceHub",
      industry: "Finance",
      totalLayoffs: 2100,
      latestLayoff: {
        date: "June 15, 2023",
        count: 850,
      },
      logo: "https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
    },
    {
      id: 3,
      name: "MegaMedia Corp.",
      industry: "Media",
      totalLayoffs: 1850,
      latestLayoff: {
        date: "June 28, 2023",
        count: 450,
      },
      logo: "https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
    },
    {
      id: 4,
      name: "HealthPlus Systems",
      industry: "Healthcare",
      totalLayoffs: 2800,
      latestLayoff: {
        date: "June 30, 2023",
        count: 1500,
      },
      logo: "https://images.pexels.com/photos/7773757/pexels-photo-7773757.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
    },
    {
      id: 5,
      name: "Retail Giants",
      industry: "Retail",
      totalLayoffs: 1620,
      latestLayoff: {
        date: "July 5, 2023",
        count: 620,
      },
      logo: "https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Companies with Most Layoffs</h2>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-4 w-[60%]" />
                    <Skeleton className="h-3 w-[40%]" />
                    <div className="flex gap-4 pt-1">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {companies.map((company) => (
            <Card 
              key={company.id} 
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg">{company.name}</h3>
                      <Badge variant="outline">{company.industry}</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">
                          Total Layoffs: <strong>{company.totalLayoffs.toLocaleString()}</strong>
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          Latest: <strong>{company.latestLayoff.date}</strong> 
                          <span className="ml-1">({company.latestLayoff.count.toLocaleString()})</span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link 
                        href={`/companies/${company.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View company details
                      </Link>
                    </div>
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