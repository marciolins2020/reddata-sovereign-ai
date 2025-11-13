import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-primary/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:translate-y-[-1px] active:translate-y-0",
        destructive: "bg-destructive text-destructive-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-destructive/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:translate-y-[-1px] active:translate-y-0",
        outline: "border border-gray-300 bg-background hover:bg-gray-50 hover:border-gray-400 dark:border-gray-700 dark:hover:bg-gray-900 dark:hover:border-gray-600",
        secondary: "bg-secondary text-secondary-foreground shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-secondary/80 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
        ghost: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-dark",
        success: "bg-success text-success-foreground shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-success/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:translate-y-[-1px] active:translate-y-0",
        tech: "bg-gradient-tech text-foreground border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-gray-300",
        premium: "bg-gradient-primary text-primary-foreground shadow-[0_4px_16px_hsla(var(--primary),0.2)] hover:shadow-[0_8px_24px_hsla(var(--primary),0.3)] hover:translate-y-[-1px] active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
