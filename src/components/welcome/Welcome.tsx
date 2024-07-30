import { useAPIStore } from "../../context/context"

export function Welcome() {

  const { user } = useAPIStore((store) => store)

  return (
    <section className="border-b border-b-zinc-600">
      <div className="w-full max-w-5xl my-0 mx-auto flex items-center justify-between px-5 py-20 mobile:flex-col mobile:items-start mobile:gap-3">
        <div>
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