import { useRef, useEffect } from 'react'

export const useAutofocus = () => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return inputRef
}
