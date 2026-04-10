import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import './index.css'

const Layout = () => {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />

            <div className='flex flex-1 overflow-hidden'>
                <Sidebar />

                <div className='flex-1 overflow-y-auto bg-black outlet'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout
