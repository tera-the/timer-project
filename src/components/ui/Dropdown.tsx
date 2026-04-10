import { type ReactNode } from 'react';

type DropdownTypes = {
    onClick?: () => void;
    isOpened?: boolean;
    children?: ReactNode;
    name: string;
}

const Dropdown = ({ onClick, isOpened, children, name }: DropdownTypes) => {
    return (
        <div className="relative">
            <button
                onClick={onClick}
                className={`hover:bg-[#0090dd] focus:outline-none text-md text-white cursor-pointer py-7 px-6 ${isOpened ? 'bg-[#0090dd]' : ''}`}
            >
                {name}
            </button>

            {/* Dropdown Menu */}
            {isOpened && (
                <div className="absolute right-0 mt-1 w-48 bg-[#4e4e4e] rounded-[2px] shadow-lg py-2 z-20 flex flex-col text-white">
                    {children}
                </div>
            )}
        </div>
    )
}

export default Dropdown
