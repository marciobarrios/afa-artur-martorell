import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default:
          "border-primary/35 bg-primary/10 text-primary dark:border-primary/70 dark:bg-primary/18",
        secondary:
          "border-secondary/65 bg-secondary/30 text-foreground dark:border-secondary/75 dark:bg-secondary/18 dark:text-secondary",
        neutral:
          "border-foreground/15 bg-muted text-muted-foreground dark:border-muted-foreground/42 dark:bg-muted/80 dark:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
