import Link from "next/link";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/86 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegació principal">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "hidden sm:inline-flex",
            )}
            href="/contacte"
          >
            Participa
          </Link>
          <details className="relative lg:hidden">
            <summary className="focus-ring inline-flex size-10 cursor-pointer list-none items-center justify-center rounded-md hover:bg-muted [&::-webkit-details-marker]:hidden">
              <Menu aria-hidden="true" className="size-5" />
              <span className="sr-only">Obre el menú</span>
            </summary>
            <div className="absolute right-0 mt-3 grid w-64 gap-1 rounded-lg border bg-popover p-2 text-popover-foreground shadow-xl">
              <NavLinks mobile />
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
