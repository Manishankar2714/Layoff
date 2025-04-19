"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RefreshCw, Settings, Database, PlusCircle } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function AdminPage() {
  const [isScraperRunning, setIsScraperRunning] = useState(false);
  const [lastRun, setLastRun] = useState<string | null>("Never");
  const [stats, setStats] = useState({
    totalLayoffs: 387243,
    companies: 1194,
    industries: 28,
    lastUpdated: "2023-07-12T15:30:00Z"
  });

  const runScraper = async () => {
    setIsScraperRunning(true);
    
    // In a real implementation, this would call the API to run the scraper
    // For demo purposes, we'll just simulate it
    setTimeout(() => {
      setIsScraperRunning(false);
      setLastRun(new Date().toISOString());
      // Update stats with "new" data
      setStats(prev => ({
        ...prev,
        totalLayoffs: prev.totalLayoffs + Math.floor(Math.random() * 1000),
        companies: prev.companies + Math.floor(Math.random() * 10),
        lastUpdated: new Date().toISOString()
      }));
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage data sources, scraping settings, and database operations
            </p>
          </div>
        </div>

        <Tabs defaultValue="scraper" className="mt-8">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="scraper" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Scraper
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Database
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scraper" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Run Scraper</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Scrape the latest layoff data from configured sources
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last run:</span>
                      <span className="text-sm font-medium">{lastRun}</span>
                    </div>
                    <Button 
                      onClick={runScraper} 
                      disabled={isScraperRunning}
                      className="w-full"
                    >
                      {isScraperRunning ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Run Scraper Now
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Data Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Manage the websites and sources to scrape for layoff data
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active sources:</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure Sources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Scraping Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Control when the automatic scraper runs to collect new layoff data
                </p>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <label htmlFor="frequency" className="text-sm font-medium">
                        Frequency
                      </label>
                      <select
                        id="frequency"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="hourly">Every Hour</option>
                        <option value="daily" selected>Every Day</option>
                        <option value="weekly">Every Week</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="time" className="text-sm font-medium">
                        Time (UTC)
                      </label>
                      <select
                        id="time"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {[...Array(24)].map((_, i) => (
                          <option key={i} value={i} selected={i === 3}>
                            {i.toString().padStart(2, '0')}:00
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="mode" className="text-sm font-medium">
                        Mode
                      </label>
                      <select
                        id="mode"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="incremental" selected>Incremental (New Data Only)</option>
                        <option value="full">Full Refresh</option>
                      </select>
                    </div>
                  </div>
                  <Button className="mt-4">
                    Save Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="database" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Database Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Layoffs:</span>
                      <span className="text-sm font-medium">{stats.totalLayoffs.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Companies:</span>
                      <span className="text-sm font-medium">{stats.companies.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Industries:</span>
                      <span className="text-sm font-medium">{stats.industries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Updated:</span>
                      <span className="text-sm font-medium">
                        {new Date(stats.lastUpdated).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Manual Entry</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Manually add or edit layoff data in the database
                  </p>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add New Layoff
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Existing Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Database Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Manage database operations and maintenance tasks
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button variant="outline">
                    Export Data
                  </Button>
                  <Button variant="outline">
                    Import Data
                  </Button>
                  <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                    Clear Test Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scraper Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Configure how the web scraper operates and processes data
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Concurrency Limit:</span>
                    <select
                      id="concurrency"
                      className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3" selected>3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Request Timeout (ms):</span>
                    <input
                      type="number"
                      id="timeout"
                      defaultValue="30000"
                      className="w-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Agent:</span>
                    <select
                      id="userAgent"
                      className="w-64 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="chrome" selected>Chrome Desktop</option>
                      <option value="firefox">Firefox</option>
                      <option value="safari">Safari</option>
                      <option value="mobile">Mobile Device</option>
                    </select>
                  </div>
                  <Button className="mt-4">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Configure the API endpoints and access controls
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Rate Limit:</span>
                    <input
                      type="number"
                      id="rateLimit"
                      defaultValue="100"
                      className="w-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enable Public API:</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="enableAPI" 
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Key Required:</span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="requireAPIKey" 
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </div>
                  </div>
                  <Button className="mt-4">
                    Save API Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}