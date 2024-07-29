import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useModal } from "../../context/context";
import { useKeyDown, useOutClick } from "../../hooks/hooks";

interface ModalProps {
  title: string,
  children: ReactNode
}

export function Modal({ title, children }: ModalProps) {

  const { closeModal } = useModal((store) => store)

  const modalRef = useOutClick(() => {
    closeModal()
  })

  const buttonRef = useKeyDown("Escape", (element) => {
    element?.click()
  })

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center" role="dialog">
      <div className="w-96 rounded shadow-shape space-y-5 bg-zinc-800" ref={modalRef}>
        <div className="flex items-center justify-between py-3 px-5 bg-zinc-700 rounded-t">
          <h1 className="text-lg font-bold">
            {title}
          </h1>
          <button
            ref={buttonRef}
            onClick={closeModal}
            type="button"
            className="text-zinc-400">
            <X size={21} />
          </button>
        </div>
        <div className="flex flex-col items-center py-5">
          {children}
        </div>
      </div>
    </div>
  )
}