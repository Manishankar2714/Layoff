"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, Briefcase, BarChart3, AlertCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function DashboardHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 mx-auto max-w-7xl">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="flex items-center gap-2 px-4 py-2 transition-colors rounded-md hover:bg-accent">
                  <BarChart3 className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link href="/industries" className="flex items-center gap-2 px-4 py-2 transition-colors rounded-md hover:bg-accent">
                  <Briefcase className="w-5 h-5" />
                  <span>Industries</span>
                </Link>
                <Link href="/search" className="flex items-center gap-2 px-4 py-2 transition-colors rounded-md hover:bg-accent">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </Link>
                <Link href="/alerts" className="flex items-center gap-2 px-4 py-2 transition-colors rounded-md hover:bg-accent">
                  <AlertCircle className="w-5 h-5" />
                  <span>Alerts</span>
                </Link>
                <Link href="/admin" className="flex items-center gap-2 px-4 py-2 transition-colors rounded-md hover:bg-accent">
                  <Settings className="w-5 h-5" />
                  <span>Admin</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">LayoffTrack</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/industries" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Industries</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/search" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="default" size="sm" className="hidden md:flex">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}