"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/search";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Database, Zap, BarChart, BookOpen, Code, X } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={() => setOpen(false)}
          >
            <Database className="h-5 w-5 text-primary" />
            <span className="font-bold">Aspects</span>
          </Link>
        </div>
        <div className="mt-8 px-7">
          <Search className="w-full" />
        </div>
        <div className="mt-4">
          <nav className="grid grid-flow-row auto-rows-max text-sm">
            <Link
              href="/"
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                {
                  "bg-muted": pathname === "/",
                }
              )}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/docs"
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                {
                  "bg-muted": pathname === "/docs",
                }
              )}
              onClick={() => setOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="/api-reference"
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                {
                  "bg-muted": pathname === "/api-reference",
                }
              )}
              onClick={() => setOpen(false)}
            >
              API Reference
            </Link>
            <Link
              href="/benchmarks"
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                {
                  "bg-muted": pathname === "/benchmarks",
                }
              )}
              onClick={() => setOpen(false)}
            >
              Benchmarks
            </Link>
          </nav>
        </div>
        <div className="mt-4 px-7">
          <Button className="w-full" onClick={() => setOpen(false)}>
            Get Started
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}