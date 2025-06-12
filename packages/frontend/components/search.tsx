"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  title: string;
  href: string;
  category: string;
}

// Mock search results - in a real implementation this would come from an API or static generation
const searchResults: SearchResult[] = [
  { title: "Getting Started", href: "/docs/getting-started", category: "Documentation" },
  { title: "Installation", href: "/docs/installation", category: "Documentation" },
  { title: "Vector Search", href: "/docs/features/vector-search", category: "Features" },
  { title: "Performance Metrics", href: "/benchmarks", category: "Benchmarks" },
  { title: "Client API", href: "/api-reference/client", category: "API" },
  { title: "Query API", href: "/api-reference/query", category: "API" },
  { title: "Storage Models", href: "/docs/concepts/storage-models", category: "Concepts" },
  { title: "Embedding Models", href: "/docs/concepts/embedding-models", category: "Concepts" },
];

export function Search({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Documentation">
            {searchResults
              .filter((result) => result.category === "Documentation")
              .map((result) => (
                <CommandItem
                  key={result.href}
                  value={result.title}
                  onSelect={() => {
                    window.location.href = result.href;
                    setOpen(false);
                  }}
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  {result.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="API Reference">
            {searchResults
              .filter((result) => result.category === "API")
              .map((result) => (
                <CommandItem
                  key={result.href}
                  value={result.title}
                  onSelect={() => {
                    window.location.href = result.href;
                    setOpen(false);
                  }}
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  {result.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Features">
            {searchResults
              .filter((result) => result.category === "Features")
              .map((result) => (
                <CommandItem
                  key={result.href}
                  value={result.title}
                  onSelect={() => {
                    window.location.href = result.href;
                    setOpen(false);
                  }}
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  {result.title}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}