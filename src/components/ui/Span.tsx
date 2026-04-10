import React from 'react'

const Span: React.FC<{
    children?: React.ReactNode
    className?: string
}> = ({ children, className }) => {
    return (
        <span className={`text-3xl text-orange-400 font-light ${className || ""}`}>
            {children}
        </span>
    )
}

export default Span
