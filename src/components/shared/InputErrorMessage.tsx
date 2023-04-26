import React from 'react'

type InputErrorMessageProps = {
  text: string
  className?: string
}

export default function InputErrorMessage({ text, className }: InputErrorMessageProps) {
  return <span className={`absolute text-xs text-red-400 ${className}`}>{text}</span>
}
