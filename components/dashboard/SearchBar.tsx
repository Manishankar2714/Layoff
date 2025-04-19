"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  // Demo search results
  const searchResults = {
    companies: [
      { id: 1, name: "TechCorp Inc." },
      { id: 2, name: "FinanceHub" },
      { id: 3, name: "MegaMedia Corp." },
    ],
    industries: [
      { id: 1, name: "Technology" },
      { id: 2, name: "Finance" },
      { id: 3, name: "Media" },
    ],
  };

  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div
          onClick={toggleDialog}
          className="flex w-full cursor-pointer items-center rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background"
        >
          <Search className="mr-2 h-4 w-4" />
          <span>Search companies or industries...</span>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search companies or industries..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Companies">
            {searchResults.companies.map((company) => (
              <CommandItem
                key={company.id}
                onSelect={() => {
                  // Handle navigation to company page
                  setOpen(false);
                }}
              >
                {company.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Industries">
            {searchResults.industries.map((industry) => (
              <CommandItem
                key={industry.id}
                onSelect={() => {
                  // Handle navigation to industry page
                  setOpen(false);
                }}
              >
                {industry.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}