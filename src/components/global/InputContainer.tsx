import type { ReactNode } from "react"

interface InputContainerProps {
  label: string,
  htmlFor: string,
  children: ReactNode,
}

export function InputContainer({ label, htmlFor, children }: InputContainerProps) {

  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-sm"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
    </div>
  )
}