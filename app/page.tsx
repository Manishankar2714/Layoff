"use client";

import { useEffect, useState } from "react";
import { MoveUpRight, Briefcase, Building as Buildings, Calendar, Search } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LayoffStats from "@/components/dashboard/LayoffStats";
import RecentLayoffs from "@/components/dashboard/RecentLayoffs";
import IndustryBreakdown from "@/components/dashboard/IndustryBreakdown";
import TrendingCompanies from "@/components/dashboard/TrendingCompanies";
import SearchBar from "@/components/dashboard/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Layoff Tracker
            </h1>
            <p className="mt-2 text-muted-foreground">
              Real-time insights on workforce reductions across industries
            </p>
          </div>
          <SearchBar />
        </div>

        <LayoffStats isLoading={isLoading} />

        <div className="grid gap-6 mt-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="recent" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="recent" className="flex items-center gap-2">
                    <MoveUpRight className="w-4 h-4" />
                    Recent
                  </TabsTrigger>
                  <TabsTrigger value="companies" className="flex items-center gap-2">
                    <Buildings className="w-4 h-4" />
                    Companies
                  </TabsTrigger>
                  <TabsTrigger value="industries" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Industries
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="recent" className="mt-6">
                <RecentLayoffs isLoading={isLoading} />
              </TabsContent>
              
              <TabsContent value="companies" className="mt-6">
                <TrendingCompanies isLoading={isLoading} />
              </TabsContent>
              
              <TabsContent value="industries" className="mt-6">
                <IndustryBreakdown isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <div className="p-6 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Set Alert</h3>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Get notified when new layoffs are reported in your industry
              </p>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="industry" className="text-sm font-medium">
                    Industry
                  </label>
                  <select
                    id="industry"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select an industry</option>
                    <option value="tech">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white transition-colors rounded-md bg-primary hover:bg-primary/90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}