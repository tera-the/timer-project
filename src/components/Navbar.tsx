import { Settings } from 'lucide-react'
import { useState } from 'react'
import Dropdown from './ui/Dropdown'
import DropdownURL from './ui/DropdownURL'

const Navbar = () => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className='max-w-screen flex justify-between px-9 bg-[#393939]'>
            <h1 className='text-2xl text-white font-bold '>LOGO</h1>

            <div className='flex items-center gap-4'>

                <Dropdown name='TikTok' />

                <Dropdown name={'Services'} onClick={() => setIsOpened(!isOpened)} isOpened={isOpened}>
                    <DropdownURL to={'/alarm'} onClick={() => setIsOpened(false)}>Alarm</DropdownURL>
                    <DropdownURL to={'/timer'} onClick={() => setIsOpened(false)}>Timer</DropdownURL>
                    <DropdownURL to={'/stopwatch'} onClick={() => setIsOpened(false)}>Stopwatch</DropdownURL>
                    <DropdownURL to={'/time'} onClick={() => setIsOpened(false)}>Time</DropdownURL>
                </Dropdown>

                <Settings className='cursor-pointer text-white hover:opacity-70 ml-3' />
            </div>
        </div>
    )
}

export default Navbar
