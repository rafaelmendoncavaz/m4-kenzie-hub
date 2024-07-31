/* eslint-disable react-hooks/exhaustive-deps */
import { Plus } from "lucide-react";
import { TechCard } from "./tech-card/TechCard";
import { useAPIStore, useModal } from "../../../context/context";
import { useEffect } from "react";

export function TechList() {

  const { techList, getTechs, onTechListSuccess } = useAPIStore((store) => store)

  useEffect(() => {
    if (onTechListSuccess) {
      getTechs()
    }
  }, [onTechListSuccess])

  const { openAddTechModal } = useModal((store) => store)

  return (
    <section className="border-b border-b-zinc-600">
      <div className="flex flex-col gap-10 w-full max-w-5xl my-0 mx-auto px-5 py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">
            {techList.length === 0 ? "Tecnologias" : `Tecnologias: ${techList.length}`}
          </h1>
          <button
            onClick={openAddTechModal}
            className="rounded bg-zinc-800 hover:bg-zinc-700 p-1"
            type="button">
            <Plus size={24} />
          </button>
        </div>
        <ul className="max-h-64 overflow-hidden scrollbar-hidden overflow-y-auto rounded flex flex-col gap-2 items-center p-5 w-full bg-zinc-800 shadow-shape">
          {
            techList.length > 0
              ? (
                techList.map(tech => (
                  <TechCard key={tech.id} tech={tech} />
                ))
              )
              : (
                <span className="font-semibold text-lg mobile:text-center">Você ainda não cadastrou nenhuma tecnologia...</span>
              )
          }
        </ul>
      </div>
    </section>
  )
}