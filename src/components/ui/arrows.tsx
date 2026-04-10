
type arrowsProps = {
    symbol: string;
    hourOnClick: () => void;
    minuteOnClick: () => void;
    secondOnClick: () => void;
}

const Arrows = ({ symbol, hourOnClick, minuteOnClick, secondOnClick }: arrowsProps) => {
    return (
        <div className='flex flex-row justify-center items-center gap-43'>
            <span onClick={hourOnClick} className='text-4xl font-clock text-orange-400 cursor-pointer select-none '>{symbol}</span>
            <span onClick={minuteOnClick} className='text-orange-400 text-4xl font-clock cursor-pointer select-none '>{symbol}</span>
            <span onClick={secondOnClick} className='text-orange-400 text-4xl font-clock cursor-pointer select-none '>{symbol}</span>
        </div>
    )
}

export default Arrows
