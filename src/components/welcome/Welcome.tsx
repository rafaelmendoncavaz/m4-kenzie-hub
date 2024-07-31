import { SquarePen } from "lucide-react"
import { useAPIStore, useModal } from "../../context/context"

export function Welcome() {

  const { user } = useAPIStore((store) => store)
  const { openEditUserModal } = useModal((store) => store)

  function editUser() {
    openEditUserModal()
  }

  return (
    <section className="border-b border-b-zinc-600">
      <div className="w-full max-w-5xl my-0 mx-auto flex items-center justify-between px-5 py-20 mobile:flex-col mobile:items-start mobile:gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={editUser}
            type="button">
            <SquarePen size={18} />
          </button>
          <h1 className="font-bold text-lg">
            Olá, {user?.name}
          </h1>
        </div>
        <span className="text-xs text-zinc-400">
          {user?.course_module}
        </span>
      </div>
    </section>
  )
}