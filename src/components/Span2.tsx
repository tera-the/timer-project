import { twMerge } from 'tailwind-merge'

type Span2Props = {
    children?: React.ReactNode
    className?: string
    onClick?: () => void
}

const Span2: React.FC<Span2Props> = ({ children, className = "", onClick }) => {
    return (
        <span
            onClick={onClick}
            className={twMerge(
                "inline-block text-[120px] leading-none font-clock text-orange-400 select-none",
                className
            )}
        >
            {children}
        </span>
    )
}

export default Span2;