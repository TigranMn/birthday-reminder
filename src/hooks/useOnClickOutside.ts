import { useEffect, RefObject } from 'react'

type Event = MouseEvent | TouchEvent

export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler?: (event: Event) => void
) => {
  useEffect(() => {
    if (!handler) return

    const listener = (event: Event) => {
      const element = ref?.current
      if (element && !element.contains(event?.target as Node)) handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
