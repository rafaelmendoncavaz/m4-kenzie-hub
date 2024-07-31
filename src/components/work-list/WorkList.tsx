/* eslint-disable react-hooks/exhaustive-deps */
import { CircleChevronLeft, CircleChevronRight, Plus } from "lucide-react";
import { WorkCard } from "./work-card/WorkCard";
import { useAPIStore, useModal } from "../../context/context";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, EffectFade } from "swiper/modules"
import style from "./style.module.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

export function WorkList() {

  const { workList, getWorks, onWorkListSuccess } = useAPIStore((store) => store)
  const nextButtonRef = useRef(null)
  const prevButtonRef = useRef(null)

  useEffect(() => {
    if (onWorkListSuccess) {
      getWorks()
    }
  }, [onWorkListSuccess])

  const { openAddWorkModal } = useModal((store) => store)

  return (
    <section>
      <div className="flex flex-col gap-10 w-full max-w-5xl my-0 mx-auto px-5 py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">
            {workList.length === 0 ? "Trabalhos" : `Trabalhos: ${workList.length}`}
          </h1>
          <button
            onClick={openAddWorkModal}
            className="rounded bg-zinc-800 hover:bg-zinc-700 p-1"
            type="button">
            <Plus size={24} />
          </button>
        </div>
        <ul className="rounded flex flex-col gap-2 items-center p-5 w-full bg-zinc-800 shadow-shape">
          {
            workList.length > 0
              ? (
                <Swiper
                  slidesPerView={1}
                  loop={true}
                  navigation={{
                    nextEl: nextButtonRef.current,
                    prevEl: prevButtonRef.current
                  }}

                  effect="fade"
                  modules={[Navigation, EffectFade]}
                  style={{
                    width: "100%",
                    zIndex: "0"
                  }}>
                  {
                    workList.map(work => (
                      <SwiperSlide key={work.id}>
                        <WorkCard work={work} />
                      </SwiperSlide>
                    ))
                  }
                  <button ref={nextButtonRef} className={`${style.swiperButtonNext} ${style.customSwiperButton} text-watermelon`}>
                    <CircleChevronRight size={18} />
                  </button>
                  <button ref={prevButtonRef} className={`${style.swiperButtonPrev} ${style.customSwiperButton} text-watermelon`}>
                    <CircleChevronLeft size={18} />
                  </button>
                </Swiper>
              )
              : (
                <span className="font-semibold text-lg mobile:text-center">Você ainda não cadastrou nenhum trabalho...</span>
              )
          }
        </ul>
      </div>
    </section>
  )
}