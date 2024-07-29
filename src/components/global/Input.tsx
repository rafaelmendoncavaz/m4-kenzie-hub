import { ComponentProps, forwardRef } from "react"

export function Input(props: ComponentProps<'input'>, ref: React.Ref<HTMLInputElement>) {

  return (
    <input
      ref={ref}
      {...props}
      className="border border-zinc-700 bg-zinc-700 rounded px-4 h-12 w-80 focus:border-zinc-200 outline-none shadow-shape"
    />
  )
}

Input.displayName = "Input"

export const ForwardedInput = forwardRef(Input)