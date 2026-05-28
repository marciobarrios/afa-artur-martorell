import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("focus-ring inline-flex items-center rounded-md", className)}
      aria-label="AFA Artur Martorell"
    >
      <Image
        src="/logos/afa-logo.svg"
        alt=""
        width={1716}
        height={112}
        className="h-auto w-44 sm:w-64"
        priority
      />
    </Link>
  );
}
