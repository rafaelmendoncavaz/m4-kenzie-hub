/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, type MutableRefObject } from "react";

export function useOutClick(callbackfn: () => void) {

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        if (callbackfn) callbackfn()
      }
    }
    window.addEventListener("mousedown", handleOutClick)

    return () => {
      window.removeEventListener("mousedown", handleOutClick)
    }
  }, [])

  return ref;
}

export function useKeyDown(keyId: string, callbackfn: (element: HTMLButtonElement | null) => void): MutableRefObject<HTMLButtonElement | null> {

  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === keyId) {
        if (callbackfn) callbackfn(ref.current)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return ref;
}

