import type { ReactNode } from "react"
import { Button } from "./Button"

interface FormProps {
  buttonText: string,
  onSubmitFn: () => void,
  children: ReactNode
}

export function Form({ buttonText, onSubmitFn, children }: FormProps) {

  return (
    <form
      onSubmit={onSubmitFn}
      className="flex flex-col items-center space-y-4">
      {children}
      <Button type="submit" >
        {buttonText}
      </Button>
    </form>
  )
}