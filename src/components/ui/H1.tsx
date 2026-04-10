import { twMerge } from 'tailwind-merge'

type H1Props = {
    children?: React.ReactNode
    className?: string
    onClick?: () => void
}

const H1: React.FC<H1Props> = ({ children, className = "", onClick }) => {
    return (
        <h1
            onClick={onClick}
            className={twMerge(
                "text-9xl text-orange-400 font-clock",
                className
            )}
        >
            {children}
        </h1>
    )
}

export default H1;