import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-primary/90 hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)]",
        secondary: "border-transparent bg-secondary text-secondary-foreground shadow-[0_2px_4px_rgba(0,0,0,0.04)] hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-destructive/90",
        success: "border-transparent bg-success text-success-foreground shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-success/90",
        warning: "border-transparent bg-warning text-warning-foreground shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-warning/90",
        info: "border-transparent bg-info text-info-foreground shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:bg-info/90",
        outline: "text-foreground border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800",
        ghost: "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
