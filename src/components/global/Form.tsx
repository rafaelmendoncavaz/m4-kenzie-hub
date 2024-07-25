import type { ReactNode } from "react"
import { useForm } from "react-hook-form"
import { Button } from "./Button"

interface FormProps {
  buttonText: string,
  children: ReactNode
}

export function Form({ buttonText, children }: FormProps) {

  const { handleSubmit } = useForm()

  function onSubmit(data) {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center space-y-4">
      {children}
      <Button type="submit" >
        {buttonText}
      </Button>
    </form>
  )
}