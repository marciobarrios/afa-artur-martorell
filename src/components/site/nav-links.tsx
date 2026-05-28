"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const navItems = [
  { href: "/que-fem", label: "Què fem" },
  { href: "/com-ho-fem", label: "Com ho fem" },
  { href: "/quotes-i-us", label: "Quotes i ús" },
  { href: "/comissions", label: "Comissions" },
  { href: "/menus-menjador", label: "Menús" },
  { href: "/contacte", label: "Contacte" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={cn(
              "focus-ring rounded-md text-sm font-semibold transition-[background-color,color,box-shadow] duration-200",
              mobile ? "px-3 py-2" : "px-3 py-2",
              active
                ? "bg-primary/10 text-primary ring-1 ring-primary/20 dark:bg-primary/15 dark:ring-primary/35"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/15",
            )}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
