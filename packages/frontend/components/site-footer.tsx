import { Database } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Database className="h-5 w-5 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built with <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">Next.js</a> and <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">shadcn/ui</a>.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="text-sm font-medium underline-offset-4 hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm font-medium underline-offset-4 hover:underline">
            Terms
          </Link>
          {/*<Link href="https://github.com/aspects/aspects" className="text-sm font-medium underline-offset-4 hover:underline">
            GitHub
          </Link>*/}
        </div>
      </div>
    </footer>
  );
}
