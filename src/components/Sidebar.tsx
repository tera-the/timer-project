import { AlarmClock, Clock9, Timer, TimerReset } from 'lucide-react'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
    return (
        <div className='h-screen w-25 flex justify-start flex-col bg-[#393939]'>
            <SidebarItem icon={<AlarmClock size={31} color='white' />} label='Alarm' to={'/alarm'} />
            <SidebarItem icon={<Timer size={31} color='white' />} label='Timer' to={'/timer'} />
            <SidebarItem icon={<TimerReset size={31} color='white' />} label='Stopwatch' to={'/stopwatch'} />
            <SidebarItem icon={<Clock9 size={31} color='white' />} label='Time' to={'/time'} />
        </div>
    )
}

export default Sidebar
