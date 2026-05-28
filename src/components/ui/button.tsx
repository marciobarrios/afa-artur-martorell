import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-[background-color,border-color,color,box-shadow] duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/92 hover:shadow-md active:bg-primary/88",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/88 hover:shadow-md active:bg-secondary/78",
        outline:
          "border bg-background/70 text-foreground shadow-xs hover:border-primary/30 hover:bg-primary/10 hover:text-primary active:bg-primary/15 dark:hover:border-primary/45 dark:hover:bg-primary/15",
        ghost:
          "text-foreground hover:bg-primary/10 hover:text-primary active:bg-primary/15 dark:hover:bg-primary/15",
        link: "h-auto px-0 text-primary underline-offset-4 hover:text-primary/85 hover:underline active:text-primary/75",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-5 text-base",
        icon: "size-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
