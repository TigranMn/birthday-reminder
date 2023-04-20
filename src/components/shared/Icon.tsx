import React from 'react'

type IconProps = {
    className?: string
    onClick?: React.MouseEventHandler<SVGSVGElement> | undefined
    icon: string
    wh?: string
}

export default function Icon({ className, onClick, icon, wh = 'h-6 w-6' }: IconProps) {
    return (
        <svg
            className={`lnr cursor-pointer text-default dark:text-darkDefault ${wh} ${icon} ${className}`}
            onClick={onClick ? onClick : undefined}>
            <use xlinkHref={`#${icon}`}></use>
        </svg>
    )
}
