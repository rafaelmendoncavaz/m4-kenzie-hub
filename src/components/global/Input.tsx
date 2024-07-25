import { ComponentProps } from "react"

export function Input({ ...props }: ComponentProps<"input">) {

  return (
    <input
      {...props}
      className="border border-zinc-700 bg-zinc-700 rounded px-4 h-12 w-80 focus:border-zinc-200 outline-none shadow-shape"
    />
  )
}