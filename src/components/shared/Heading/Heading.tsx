import styles from './Heading.module.css'
import React from 'react'

type HeadingProps = {
  tag: React.ElementType
  children: React.ReactNode
  className?: string
}

export default function Heading({ tag, children, className }: HeadingProps) {
  const Tag = tag

  return <Tag className={`${styles[tag as string]} ${className || ''}`}>{children}</Tag>
}
