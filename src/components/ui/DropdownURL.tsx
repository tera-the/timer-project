import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type DropdownURLProps = {
    to: string;
    children: ReactNode;
    onClick: () => void;
}

const DropdownURL = ({ to, children, onClick }: DropdownURLProps) => {
    return (
        <NavLink
            onClick={onClick}
            to={to}
            className='px-4 py-2 hover:bg-[#0090dd] font-light'
        >
            {children}
        </NavLink>
    )
}

export default DropdownURL
