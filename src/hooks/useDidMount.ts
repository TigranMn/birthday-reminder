import { useEffect, useRef } from 'react'

const useDidMountEffect = (cb: () => void, deps: any[]) => {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) cb()
    else didMount.current = true
  }, deps)
}

export default useDidMountEffect
