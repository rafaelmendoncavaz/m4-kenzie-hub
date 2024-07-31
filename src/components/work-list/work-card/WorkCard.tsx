import { SquarePen, Trash2 } from "lucide-react";
import { useAPIStore, useModal } from "../../../context/context";
import type { Works } from "../../../schema/schema";

interface WorkCardProps {
  work: Works
}

export function WorkCard({ work }: WorkCardProps) {

  const { openEditWorkModal } = useModal((store) => store)
  const { deleteWork, setWorkToEdit } = useAPIStore((store) => store)

  async function deleteCurrentWork(workId: Works["id"]) {
    await deleteWork(workId)
  }

  function editCurrentWork() {
    setWorkToEdit(work)
    openEditWorkModal()
  }

  return (
    <li
      tabIndex={0}
      className="w-full flex items-center justify-between gap-2 px-8 py-4 mobile:py-10 bg-zinc-900 rounded border border-transparent shadow-shape hover:bg-zinc-700 focus:bg-zinc-700 mobile:flex-col mobile:items-start mobile:justify-center">
      <div className="w-full flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-bold">
            {work.title}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={editCurrentWork}
              type="button">
              <SquarePen size={18} />
            </button>
            <button
              onClick={() => deleteCurrentWork(work.id)}
              type="button">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        <span className="text-xs text-zinc-400 italic hover:text-watermelon">
          <a href={work.deploy_url} target="_blank">{work.deploy_url}</a>
        </span>
        <p className="text-xs font-normal truncate">
          {work.description}
        </p>
      </div>
    </li>
  )
}