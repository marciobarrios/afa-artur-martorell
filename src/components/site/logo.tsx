import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("focus-ring inline-flex items-center gap-3 rounded-md", className)}
      aria-label="AFA Artur Martorell"
    >
      <Image
        src="/logos/afa-mark-export.png"
        alt=""
        width={44}
        height={44}
        className="size-11"
        priority
      />
      <span className="hidden leading-none sm:block">
        <span className="block text-sm font-black tracking-wide text-primary">AFA</span>
        <span className="block text-sm font-bold tracking-wide">Artur Martorell</span>
      </span>
    </Link>
  );
}
