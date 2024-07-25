import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "rounded border font-semibold",

  variants: {
    colorVariants: {
      primary: " border-watermelon bg-watermelon hover:bg-strawberry hover:border-strawberry",
      secondary: " border-zinc-400 bg-zinc-400 hover:bg-zinc-600 hover:border-zinc-600",
      tertiary: " border-zinc-800 bg-zinc-800 hover:bg-zinc-700 hover:border-zinc-700"
    },
    sizeVariants: {
      default: "h-12 w-full",
      small: "h-10 px-4"
    }
  },
  defaultVariants: {
    colorVariants: "primary",
    sizeVariants: "default"
  }
})

interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export function Button({ children, sizeVariants, colorVariants, ...props }: ButtonProps) {

  return (
    <button
      {...props}
      className={buttonVariants({ colorVariants, sizeVariants })}>
      {children}
    </button>
  )
}