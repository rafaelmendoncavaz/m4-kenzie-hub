import { SquarePen, Trash2 } from "lucide-react";
import { useAPIStore, useModal } from "../../../../context/context";
import type { Techs } from "../../../../schema/schema";

interface TechCardProps {
  tech: Techs
}

export function TechCard({ tech }: TechCardProps) {

  const { openEditTechModal } = useModal((store) => store)
  const { deleteTech, setTechToEdit } = useAPIStore((store) => store)

  async function deleteCurrentTech(techId: string) {
    await deleteTech(techId)
  }

  function editCurrentTech() {
    setTechToEdit(tech)
    openEditTechModal()
  }

  return (
    <li
      tabIndex={0}
      className="w-full h-12 flex items-center justify-between gap-2 px-5 py-8 mobile:py-10 bg-zinc-900 rounded border border-transparent shadow-shape hover:bg-zinc-700 focus:bg-zinc-700 mobile:flex-col mobile:items-start mobile:justify-center">
      <div>
        <h1 className="text-base font-bold">
          {tech.title}
        </h1>
      </div>
      <div className="flex items-center gap-4 mobile:w-full mobile:justify-between">
        <span className="text-xs text-zinc-400 font-normal">
          {tech.status}
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={editCurrentTech}
            type="button">
            <SquarePen size={18} />
          </button>
          <button
            onClick={() => deleteCurrentTech(tech.id)}
            type="button">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </li>
  )
}