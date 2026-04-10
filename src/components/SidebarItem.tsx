import React from 'react'
import { NavLink } from 'react-router-dom'

type SidebarProps = {
    to: string;
    icon: React.ReactNode;
    label: string;
}

const SidebarItem = ({ to, icon, label }: SidebarProps) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `w-full ${isActive ? 'bg-[#535353]' : 'hover:bg-[#535353]'
                }`
            }
        >
            <div className="w-full flex flex-col justify-center items-center py-5 gap-3">
                {icon}
                <span className="text-white text-sm">{label}</span>
            </div>
        </NavLink>
    )
}

export default SidebarItem
